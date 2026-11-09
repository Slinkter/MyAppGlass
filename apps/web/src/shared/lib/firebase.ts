import { initializeApp, getApps, getApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

import { env } from "@/shared/config/env";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const isNewApp = getApps().length === 0;
export const app = isNewApp ? initializeApp(firebaseConfig) : getApp();

let _authInstance: Auth | null = null;
let _authPromise: Promise<Auth> | null = null;

/**
 * Obtiene la instancia de Firebase Auth de forma diferida (lazy).
 * Evita importar y evaluar `firebase/auth` (~590 KB raw) en rutas públicas
 * o para visitantes anónimos que nunca iniciaron sesión.
 */
export async function getFirebaseAuth(): Promise<Auth> {
  if (_authInstance) {
    return _authInstance;
  }
  if (!_authPromise) {
    _authPromise = (async () => {
      const { getAuth, connectAuthEmulator } = await import("firebase/auth");
      const auth = getAuth(app);
      if (env.NEXT_PUBLIC_USE_EMULATORS === "true") {
        connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      }
      _authInstance = auth;
      return auth;
    })();
  }
  return _authPromise;
}

/**
 * Proxy retrocompatible para `auth`.
 * @deprecated Preferir `await getFirebaseAuth()` para diferir la carga de Firebase Auth.
 */
export const auth: Auth = new Proxy({} as Auth, {
  get(_target, prop) {
    if (!_authInstance) {
      throw new Error(
        "Firebase Auth no está inicializado. Llama a `await getFirebaseAuth()` antes de acceder sincrónicamente a `auth`."
      );
    }
    return Reflect.get(_authInstance, prop);
  },
});

export const db = getFirestore(app);
export const storage = getStorage(app);

// Solo en desarrollo local con `NEXT_PUBLIC_USE_EMULATORS=true`.
if (isNewApp && env.NEXT_PUBLIC_USE_EMULATORS === "true") {
  connectFirestoreEmulator(db, "127.0.0.1", 8081);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
export default app;
