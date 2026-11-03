import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
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

await env.cleanup();
console.log(`${results.filter(Boolean).length}/${results.length} OK`);
process.exit(results.every(Boolean) ? 0 : 1);
