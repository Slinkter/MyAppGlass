import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { readFileSync } from "node:fs";

const env = await initializeTestEnvironment({
  projectId: "demo-gya",
  firestore: { rules: readFileSync("firestore.rules", "utf8"), host: "127.0.0.1", port: 8081 },
});
const year = new Date().getFullYear();
const results = [];
async function t(name, expectOk, fn) {
  let ok;
  try { await (expectOk ? assertSucceeds(fn()) : assertFails(fn())); ok = true; } catch (e) { ok = false; }
  results.push(ok); console.log(`${ok ? "OK  " : "FAIL"} ${name}`);
}
await env.clearFirestore();
const anon = env.unauthenticatedContext().firestore();
const budget = (n, over = {}) => ({ number: n, userId: "anon", fullName: "Juan", phone: "999", params: {}, total: 100, status: "PENDIENTE", createdAt: serverTimestamp(), ...over });

await t("presupuesto anon PENDIENTE create", true, () => setDoc(doc(anon, "presupuestos_solicitados", `GYA-${year}-0001`), budget(`GYA-${year}-0001`)));
await t("presupuesto anon status APROBADO create", false, () => setDoc(doc(anon, "presupuestos_solicitados", `GYA-${year}-0002`), budget(`GYA-${year}-0002`, { status: "APROBADO" })));
await t("presupuesto anon read", false, () => getDoc(doc(anon, "presupuestos_solicitados", `GYA-${year}-0001`)));
await t("presupuesto anon update", false, () => updateDoc(doc(anon, "presupuestos_solicitados", `GYA-${year}-0001`), { total: 1 }));
await t("presupuesto anon delete", false, () => deleteDoc(doc(anon, "presupuestos_solicitados", `GYA-${year}-0001`)));

const cid = `presupuesto-${year}`;
await t("contador create seq 2", false, () => setDoc(doc(anon, "contadores", cid), { seq: 2 }));
await t("contador create seq 1", true, () => setDoc(doc(anon, "contadores", cid), { seq: 1 }));
await t("contador update 1->4", false, () => setDoc(doc(anon, "contadores", cid), { seq: 4 }));
await t("contador update 1->2", true, () => setDoc(doc(anon, "contadores", cid), { seq: 2 }));
await t("contador read anon", false, () => getDoc(doc(anon, "contadores", cid)));

const u = env.authenticatedContext("u1", { email: "a@b.com" }).firestore();
await t("users create own cliente", true, () => setDoc(doc(u, "users", "u1"), { uid: "u1", email: "a@b.com", role: "cliente", createdAt: serverTimestamp() }));
const u2 = env.authenticatedContext("u2", { email: "c@d.com" }).firestore();
await t("users create own admin", false, () => setDoc(doc(u2, "users", "u2"), { uid: "u2", email: "c@d.com", role: "admin" }));
await t("users update own role", false, () => updateDoc(doc(u, "users", "u1"), { role: "admin" }));

const cli = (id, dni) => ({ userId: id, email: "a@b.com", role: "cliente", fullName: "Juan", dniRuc: dni, phone: "999", address: "x", district: "y" });
const c = (id) => env.authenticatedContext(id, { email: "a@b.com" }).firestore();
await t("clientes dni 8", true, () => setDoc(doc(c("c8"), "clientes", "c8"), cli("c8", "12345678")));
await t("clientes ruc 11", true, () => setDoc(doc(c("c11"), "clientes", "c11"), cli("c11", "12345678901")));
await t("clientes dni 9", false, () => setDoc(doc(c("c9"), "clientes", "c9"), cli("c9", "123456789")));

// ---------------------------------------------------------------
// Fase 2.1: Validación de roles y permisos admin vs @gyacompany.com sin rol
// ---------------------------------------------------------------
// 1. Usuario con @gyacompany.com pero sin rol/claim admin -> NO debe poder escribir en productos/services
const gyaUserNoAdmin = env.authenticatedContext("gya1", { email: "empleado@gyacompany.com" }).firestore();
await t("gya domain sin rol admin write productos", false, () => setDoc(doc(gyaUserNoAdmin, "productos", "p1"), { name: "Vidrio" }));
await t("gya domain sin rol admin write services", false, () => setDoc(doc(gyaUserNoAdmin, "services", "s1"), { name: "Ventanas" }));

// 2. Usuario con claim role=admin -> SÍ puede escribir en productos, services y ver pedidos
const adminWithClaim = env.authenticatedContext("adminClaim", { email: "acueva@gyacompany.com", role: "admin" }).firestore();
await t("admin with token claim write productos", true, () => setDoc(doc(adminWithClaim, "productos", "p1"), { name: "Vidrio Templado" }));
await t("admin with token claim write services", true, () => setDoc(doc(adminWithClaim, "services", "s1"), { name: "Ventanas Acusticas" }));
await t("admin with token claim write pedidos", true, () => setDoc(doc(adminWithClaim, "pedidos", "ped1"), { total: 500 }));

// 3. Usuario con documento users/{uid}.role == 'admin' pero SIN claim -> ya NO es admin
// (decisión del dueño 2026-11-16: el acceso sale solo del custom claim).
await env.withSecurityRulesDisabled(async (context) => {
  await setDoc(doc(context.firestore(), "users", "adminDocUser"), {
    uid: "adminDocUser",
    email: "sin-claim@example.com",
    role: "admin"
  });
});
const adminWithDoc = env.authenticatedContext("adminDocUser", { email: "sin-claim@example.com" }).firestore();
await t("users doc role=admin sin claim write productos", false, () => setDoc(doc(adminWithDoc, "productos", "p2"), { name: "Mampara" }));
await t("users doc role=admin sin claim read pedidos", false, () => getDoc(doc(adminWithDoc, "pedidos", "ped1")));

// 3b. productos: validación mínima de unidad, precio y estado
const prod = (over = {}) => ({ sku: "VID-008", name: "Vidrio", category: "vidrio", unit: "m2", unitPrice: 120, isActive: true, ...over });
await t("admin create producto unidad ml", true, () => setDoc(doc(adminWithClaim, "productos", "pv1"), prod({ unit: "ml" })));
await t("admin create producto unidad desconocida", false, () => setDoc(doc(adminWithClaim, "productos", "pv2"), prod({ unit: "litros" })));
await t("admin create producto precio 0", false, () => setDoc(doc(adminWithClaim, "productos", "pv3"), prod({ unitPrice: 0 })));
await t("admin create producto isActive no booleano", false, () => setDoc(doc(adminWithClaim, "productos", "pv4"), prod({ isActive: "si" })));
await t("admin desactiva producto", true, () => updateDoc(doc(adminWithClaim, "productos", "pv1"), { isActive: false }));

// 3c. presupuestos formales (PRES-0001): solo los escriben las functions; lectura solo admin
await env.withSecurityRulesDisabled(async (context) => {
  await setDoc(doc(context.firestore(), "presupuestos", "PRES-0001"), { numero: "PRES-0001", estado: "borrador", total: 118, userId: "cli1" });
  await setDoc(doc(context.firestore(), "contadores", "presupuestos-formales"), { seq: 1 });
});
await t("admin read presupuesto formal", true, () => getDoc(doc(adminWithClaim, "presupuestos", "PRES-0001")));
await t("admin list presupuestos formales", true, () => getDocs(collection(adminWithClaim, "presupuestos")));
await t("admin create presupuesto formal desde cliente", false, () => setDoc(doc(adminWithClaim, "presupuestos", "PRES-0002"), { numero: "PRES-0002", total: 1 }));
await t("admin update total de presupuesto formal", false, () => updateDoc(doc(adminWithClaim, "presupuestos", "PRES-0001"), { total: 1 }));
await t("admin delete presupuesto formal", false, () => deleteDoc(doc(adminWithClaim, "presupuestos", "PRES-0001")));
await t("admin write contador presupuestos-formales", false, () => setDoc(doc(adminWithClaim, "contadores", "presupuestos-formales"), { seq: 2 }));
await t("admin read contador presupuestos-formales", false, () => getDoc(doc(adminWithClaim, "contadores", "presupuestos-formales")));
await t("users doc admin sin claim read presupuesto formal", false, () => getDoc(doc(adminWithDoc, "presupuestos", "PRES-0001")));
await t("anon read presupuesto formal", false, () => getDoc(doc(anon, "presupuestos", "PRES-0001")));

// 4. Cliente regular NO puede leer ni escribir colecciones exclusivas de admin (pedidos, libro_de_reclamaciones)
const clienteUser = env.authenticatedContext("cli1", { email: "cliente@gmail.com" }).firestore();
await t("cliente read pedidos", false, () => getDoc(doc(clienteUser, "pedidos", "ped1")));
await t("cliente write pedidos", false, () => setDoc(doc(clienteUser, "pedidos", "ped2"), { total: 100 }));
await t("cliente write services", false, () => setDoc(doc(clienteUser, "services", "s2"), { name: "Hack" }));

// 5. Datos internos de proveedores y sistemas
for (const col of ["proveedores_productos", "pedidos_proveedor"]) {
  await t(`admin write ${col}`, true, () => setDoc(doc(adminWithClaim, col, "x1"), { nombre: "dato" }));
  await t(`admin read ${col}`, true, () => getDoc(doc(adminWithClaim, col, "x1")));
  await t(`cliente read ${col}`, false, () => getDoc(doc(clienteUser, col, "x1")));
  await t(`cliente write ${col}`, false, () => setDoc(doc(clienteUser, col, "x2"), { nombre: "hack" }));
  await t(`anon read ${col}`, false, () => getDoc(doc(anon, col, "x1")));
  await t(`anon write ${col}`, false, () => setDoc(doc(anon, col, "x2"), { nombre: "hack" }));
}
await t("admin write sistema publicado", true, () => setDoc(doc(adminWithClaim, "sistemas", "sis-pub"), { estado: "publicado", nombre: "Serie 25" }));
await t("admin write sistema borrador", true, () => setDoc(doc(adminWithClaim, "sistemas", "sis-bor"), { estado: "borrador", nombre: "Nuevo" }));
await t("anon read sistema publicado (interno)", false, () => getDoc(doc(anon, "sistemas", "sis-pub")));
await t("admin write sistema publico", true, () => setDoc(doc(adminWithClaim, "sistemas_publicos", "sis-pub"), { serviceSlug: "ventana", nombre: "Serie 25" }));
await t("anon read sistema publico", true, () => getDoc(doc(anon, "sistemas_publicos", "sis-pub")));
await t("anon write sistema publico", false, () => setDoc(doc(anon, "sistemas_publicos", "sis-x"), { nombre: "x" }));
await t("anon read sistema borrador", false, () => getDoc(doc(anon, "sistemas", "sis-bor")));
await t("anon write sistemas", false, () => setDoc(doc(anon, "sistemas", "sis-x"), { estado: "publicado" }));
await t("admin read sistema borrador", true, () => getDoc(doc(adminWithClaim, "sistemas", "sis-bor")));
await t("contador pedidos anon read", false, () => getDoc(doc(anon, "contadores", `pedidos-${year}`)));
await t("contador pedidos anon create", false, () => setDoc(doc(anon, "contadores", `pedidos-${year}`), { seq: 1 }));
await t("contador pedidos admin create", true, () => setDoc(doc(adminWithClaim, "contadores", `pedidos-${year}`), { seq: 1 }));

// 6. blogPosts: lectura pública solo para publicados; borradores y escritura solo admin
await t("admin create blogPost publicado", true, () => setDoc(doc(adminWithClaim, "blogPosts", "post-pub"), { title: "Publicado", published: true }));
await t("admin create blogPost borrador", true, () => setDoc(doc(adminWithClaim, "blogPosts", "post-bor"), { title: "Borrador", published: false }));
await t("admin read blogPost publicado", true, () => getDoc(doc(adminWithClaim, "blogPosts", "post-pub")));
await t("admin read blogPost borrador", true, () => getDoc(doc(adminWithClaim, "blogPosts", "post-bor")));

for (const [label, ctx] of [["anon", anon], ["cliente", clienteUser]]) {
  await t(`${label} getDoc blogPost publicado`, true, () => getDoc(doc(ctx, "blogPosts", "post-pub")));
  await t(`${label} getDocs blogPosts published == true`, true, () => getDocs(query(collection(ctx, "blogPosts"), where("published", "==", true))));
  await t(`${label} getDoc blogPost borrador`, false, () => getDoc(doc(ctx, "blogPosts", "post-bor")));
  await t(`${label} getDocs blogPosts sin filtro`, false, () => getDocs(collection(ctx, "blogPosts")));
  await t(`${label} setDoc blogPosts`, false, () => setDoc(doc(ctx, "blogPosts", "post-hack"), { title: "Hack", published: true }));
  await t(`${label} updateDoc blogPosts`, false, () => updateDoc(doc(ctx, "blogPosts", "post-pub"), { title: "Editado" }));
  await t(`${label} deleteDoc blogPosts`, false, () => deleteDoc(doc(ctx, "blogPosts", "post-pub")));
}

await env.cleanup();
console.log(`${results.filter(Boolean).length}/${results.length} OK`);
process.exit(results.every(Boolean) ? 0 : 1);
