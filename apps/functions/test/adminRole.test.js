"use strict";

// setAdminRole: asigna o retira el custom claim role=admin.

const { describe, test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { crearFakeDb } = require("./fakeDb");
const { setAdminRole } = require("../src/services/adminRoleService");

function crearAuthFalso(usuarios) {
  return {
    usuarios,
    async getUserByEmail(email) {
      const u = usuarios.find((x) => x.email === email);
      if (!u) throw Object.assign(new Error("no existe"), { code: "auth/user-not-found" });
      return u;
    },
    async setCustomUserClaims(uid, claims) {
      usuarios.find((x) => x.uid === uid).customClaims = claims;
    },
  };
}

let auth;
let db;
beforeEach(() => {
  db = crearFakeDb();
  auth = crearAuthFalso([
    { uid: "u-jefe", email: "jefe@example.com", customClaims: { role: "admin" } },
    { uid: "u-nuevo", email: "nuevo@example.com", customClaims: { otro: 1 } },
  ]);
});

describe("setAdminRole", () => {
  test("asigna el claim conservando los demás y refleja el rol en users/{uid}", async () => {
    const r = await setAdminRole({ auth, db }, { email: " Nuevo@Example.com ", admin: true }, { uid: "u-jefe" });
    assert.deepEqual(r, { uid: "u-nuevo", role: "admin" });
    assert.deepEqual(auth.usuarios[1].customClaims, { otro: 1, role: "admin" });
    assert.equal(db.almacen.get("users/u-nuevo").role, "admin");
  });

  test("retira el claim", async () => {
    await setAdminRole({ auth, db }, { email: "nuevo@example.com", admin: true }, { uid: "u-jefe" });
    const r = await setAdminRole({ auth, db }, { email: "nuevo@example.com", admin: false }, { uid: "u-jefe" });
    assert.equal(r.role, "cliente");
    assert.deepEqual(auth.usuarios[1].customClaims, { otro: 1 });
  });

  test("un admin no puede quitarse el rol a sí mismo", async () => {
    await assert.rejects(setAdminRole({ auth, db }, { email: "jefe@example.com", admin: false }, { uid: "u-jefe" }), { code: "failed-precondition" });
    assert.equal(auth.usuarios[0].customClaims.role, "admin");
  });

  test("correo sin cuenta o mal escrito", async () => {
    await assert.rejects(setAdminRole({ auth, db }, { email: "nadie@example.com", admin: true }, { uid: "u-jefe" }), { code: "not-found" });
    await assert.rejects(setAdminRole({ auth, db }, { email: "no-es-correo", admin: true }, { uid: "u-jefe" }), { code: "invalid-argument" });
  });
});
