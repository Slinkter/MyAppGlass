"use strict";

/**
 * Dobles de Firestore y de firebase-admin para las pruebas de guards y checkStatus (node:test).
 *
 * - crearFakeDb(): imita solo lo que usan los guards y checkStatus:
 *     collection(n).doc(id).get() / .set()
 *     runTransaction(fn) con tx.get(ref) y tx.set(ref, datos, opciones).
 *   Las escrituras de una transacción solo se aplican si fn resuelve (commit), como en Firestore.
 * - instalarFirebaseAdminFalso(): precarga `firebase-admin` en require.cache para que
 *   `admin.firestore()` devuelve el db que se fije con fijarDb(). Llamar restaurar() al terminar.
 */

const Module = require("node:module");

function crearFakeDb({ fallaTransaccion = false, fallaLectura = false } = {}) {
  const almacen = new Map(); // "coleccion/id" -> datos
  const escrituras = []; // { ruta, datos, opciones } aplicadas
  const estado = { fallaTransaccion, fallaLectura, transacciones: 0 };

  const errorFalso = (op) => new Error(`Firestore no disponible (doble de prueba: ${op})`);

  function snapshot(ruta, id) {
    const existe = almacen.has(ruta);
    return {
      id,
      exists: existe,
      data: () => (existe ? { ...almacen.get(ruta) } : undefined),
    };
  }

  function aplicar(ruta, datos, opciones) {
    const previo = opciones && opciones.merge && almacen.has(ruta) ? almacen.get(ruta) : {};
    almacen.set(ruta, { ...previo, ...datos });
  }

  function referencia(coleccion, id) {
    const ruta = `${coleccion}/${id}`;
    return {
      path: ruta,
      id,
      get: async () => {
        if (estado.fallaLectura) throw errorFalso("get");
        return snapshot(ruta, id);
      },
      set: async (datos, opciones) => {
        escrituras.push({ ruta, datos, opciones });
        aplicar(ruta, datos, opciones);
      },
    };
  }

  const db = {
    almacen,
    escrituras,
    estado,
    collection(coleccion) {
      return { doc: (id) => referencia(coleccion, id) };
    },
    async runTransaction(fn) {
      estado.transacciones += 1;
      if (estado.fallaTransaccion) throw errorFalso("runTransaction");
      const pendientes = [];
      const tx = {
        async get(ref) {
          if (estado.fallaLectura) throw errorFalso("tx.get");
          return snapshot(ref.path, ref.id);
        },
        set(ref, datos, opciones) {
          pendientes.push({ ruta: ref.path, datos, opciones });
          return tx;
        },
      };
      const resultado = await fn(tx);
      for (const p of pendientes) {
        escrituras.push(p);
        aplicar(p.ruta, p.datos, p.opciones);
      }
      return resultado;
    },
    /** Precarga un documento. Devuelve el propio db para encadenar. */
    sembrar(coleccion, id, datos) {
      almacen.set(`${coleccion}/${id}`, { ...datos });
      return db;
    },
  };
  return db;
}

function instalarFirebaseAdminFalso() {
  const ruta = require.resolve("firebase-admin");
  const previo = require.cache[ruta];
  const ctl = { db: null };

  const modulo = new Module(ruta);
  modulo.filename = ruta;
  modulo.loaded = true;
  modulo.exports = {
    firestore: () => {
      if (!ctl.db) throw new Error("firebase-admin falso: db no fijado con fijarDb()");
      return ctl.db;
    },
  };
  require.cache[ruta] = modulo;

  return {
    fijarDb(db) {
      ctl.db = db;
    },
    restaurar() {
      if (previo) require.cache[ruta] = previo;
      else delete require.cache[ruta];
    },
  };
}

module.exports = { crearFakeDb, instalarFirebaseAdminFalso };
