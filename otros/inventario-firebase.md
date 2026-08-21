# Documentación del Módulo de Inventarios con Firebase

Esta guía documenta la arquitectura, el modelo de datos, la capa de servicios Firebase y los flujos de negocio del módulo de inventario de **AppMina**, para facilitar su reutilización o reimplementación en otros proyectos.

---

## 1. Visión General

El sistema es una aplicación web de inventario para control de existencias, registro de empleados, emisión de órdenes de salida con descuento atómico de stock y reportes exportables a Excel.

### Stack Tecnológico
- **Frontend:** React 18 + Create React App 5 (`react-scripts`), JSX plano (sin TypeScript)
- **UI & Formularios:** Material UI v5 (`@mui/material`), Formik + Yup
- **Estado Global:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Backend / BaaS:** Firebase v9 (Modular SDK: Authentication, Cloud Firestore, Cloud Storage)
- **Exportación:** `xlsx` (SheetJS)

---

## 2. Requisitos Previos para Replicar

### 2.1 Configuración de Firebase
1. Crear un proyecto en la [Consola de Firebase](https://console.firebase.google.com/).
2. Habilitar **Authentication** con proveedor **Google**.
3. Habilitar **Cloud Firestore** en modo producción (o pruebas) y definir las colecciones necesarias.
4. Habilitar **Cloud Storage** si se utilizará subida de archivos/imágenes.
5. Registrar una aplicación web para obtener las credenciales (`firebaseConfig`).

### 2.2 Variables de Entorno (`.env`)
En Create React App las variables deben llevar el prefijo `REACT_APP_`. Crea un archivo `.env` en la raíz:

```env
REACT_APP_APIKEY=AIzaSy...
REACT_APP_AUTHDOMAIN=tu-proyecto.firebaseapp.com
REACT_APP_PROJECTID=tu-proyecto
REACT_APP_STORAGEBUCKET=tu-proyecto.appspot.com
REACT_APP_MESSAGINGSENDERID=1234567890
REACT_APP_APPID=1:1234567890:web:...
REACT_APP_MEASUREMENTID=G-...
```

> **Nota:** Cambios en el archivo `.env` requieren reiniciar el servidor de desarrollo (`pnpm start`).

### 2.3 Dependencias Necesarias (`package.json`)
```json
{
  "dependencies": {
    "firebase": "^9.9.0",
    "@reduxjs/toolkit": "^2.8.2",
    "react-redux": "^9.2.0",
    "react-router-dom": "^6.3.0",
    "formik": "^2.2.9",
    "yup": "^0.32.11",
    "@mui/material": "^5.8.7",
    "@mui/icons-material": "^5.8.4",
    "@emotion/react": "^11.9.3",
    "@emotion/styled": "^11.9.3",
    "xlsx": "^0.18.5"
  }
}
```

Si usas `pnpm`, agrega un `pnpm-workspace.yaml` para permitir los scripts de compilación de las dependencias de Firebase:
```yaml
allowBuilds:
  '@firebase/util': true
  core-js: true
  core-js-pure: true
  protobufjs: true
```

---

## 3. Modelo de Datos en Firestore

El sistema utiliza cuatro colecciones principales para el flujo de inventario (y una colección legacy de enlaces):

### 3.1 Colección: `users`
Guarda el perfil del usuario autenticado (administrador).
- **ID del documento:** El `uid` del usuario de Firebase Auth (asignado vía `setDoc(doc(db, "users", uid), data)`).

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `uid` | `string` | UID único de Firebase Auth | `"d8fK9...abc"` |
| `displayName` | `string` | Nombre completo del usuario | `"Luis Joya"` |
| `username` | `string` | Nombre de usuario único para URL o display | `"luisjoya"` |
| `processCompleted` | `boolean` | `true` si ya completó el paso de elegir username | `true` |

### 3.2 Colección: `employers`
Lista de empleados autorizados para recibir productos/pedidos.
- **ID del documento:** Autogenerado por Firestore (`doc(collection(db, "employers")).id`).

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `docId` | `string` | ID del documento guardado dentro de los datos | `"gK8s7A..."` |
| `firstName` | `string` | Nombres del empleado | `"Juan"` |
| `lastName` | `string` | Apellidos del empleado | `"Pérez"` |
| `dni` | `string` o `number` | Documento Nacional de Identidad (selector en órdenes) | `"72819283"` |
| `phone` | `string` | Teléfono de contacto | `"987654321"` |
| `email` | `string` | Correo electrónico | `"juan.perez@empresa.com"` |
| `area` | `string` | Área o departamento del empleado | `"Mantenimiento"` |

### 3.3 Colección: `products`
Catálogo de productos disponibles en el inventario.
- **ID del documento:** Autogenerado por Firestore (`doc(collection(db, "products")).id`).

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `docId` | `string` | ID del documento guardado dentro de los datos | `"m9Xw3L..."` |
| `nameproduct` | `string` | Nombre del producto | `"Guantes de Nitrilo Talla L"` |
| `detail` | `string` | Descripción o detalle del producto | `"Caja x 100 unidades"` |
| `category` | `string` | Categoría del ítem | `"EPP"` |
| `cantidad` | `number` | Stock actual disponible (entero) | `50` |
| `userUid` | `string` | UID del usuario que registró el producto | `"d8fK9...abc"` |
| `createdAt` | `string` | Fecha de creación en formato ISO 8601 | `"2026-08-21T14:30:00.000Z"` |

### 3.4 Colección: `listOrden`
Registro histórico de órdenes/pedidos de salida de stock.
- **ID del documento:** Autogenerado por Firestore (`doc(collection(db, "listOrden")).id`).

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `docId` | `string` | ID del documento de la orden | `"ord_8A9bc..."` |
| `userUID` | `string` | UID del administrador que creó la orden | `"d8fK9...abc"` |
| `empleadoUID` | `string` | `docId` del empleado en la colección `employers` | `"gK8s7A..."` |
| `items` | `Array<object>` | Lista de productos despachados con su cantidad | Ver estructura abajo |
| `createdAt` | `string` | Fecha en formato locale `"sv"` (`YYYY-MM-DD HH:MM:SS`) | `"2026-08-21 09:30:00"` |

**Estructura de cada elemento dentro del array `items`:**
```json
{
  "docId": "m9Xw3L...",
  "nameproduct": "Guantes de Nitrilo Talla L",
  "cantidad": 5
}
```

### 3.5 Colección Legacy: `links` (Opcional)
Heredada de una plantilla tipo linktree. Guarda enlaces públicos por usuario (`uid`, `title`, `url`, `docId`). No interviene en el flujo de inventario.

---

## 4. Capa de Servicios Firebase (`src/firebase/firebase.js`)

Toda interacción con Firebase está centralizada en `src/firebase/firebase.js`. Los componentes de React **nunca** deben importar directamente el SDK de Firebase ni llamar a Firestore/Auth; deben usar estas funciones exportadas.

### 4.1 Inicialización
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 4.2 Métodos de Usuarios y Autenticación
- `userExistes(uid)`: `Promise<boolean>` — Comprueba si existe el documento del usuario en `users`.
- `existsUsername(username)`: `Promise<string|null>` — Comprueba si un `username` ya está en uso. Devuelve el UID o `null`.
- `registerNewUser(user)`: `Promise<void>` — Inserta o sobrescribe un usuario en `users` usando `setDoc(doc(db, "users", user.uid), user)`.
- `updateUser(user)`: `Promise<void>` — Actualiza la información del usuario.
- `getUserInfo(uid)`: `Promise<object|undefined>` — Obtiene los datos del usuario por su UID.
- `getNameAdminFirebase(uid)`: `Promise<string|undefined>` — Devuelve solo el `displayName` del usuario para reportes.
- `logout()`: `Promise<void>` — Ejecuta `auth.signOut()` y recarga la página.

### 4.3 Métodos de Empleados (`employers`)
- `addNewEmployer(employer)`: `Promise<void>` — Genera un ID con `doc(collection(db, "employers"))`, asigna `employer.docId = docRef.id` y guarda con `setDoc`.
- `getEmployers()`: `Promise<Array<object>>` — Carga puntual (una sola vez) de todos los empleados con `getDocs`.
- `listenToEmployers(onDataChange)`: `UnsubscribeFunction` — Listener en tiempo real con `onSnapshot`. Devuelve la función `unsubscribe` para limpieza en `useEffect`.
- `getNameEmployerFirebase(uid)`: `Promise<string|undefined>` — Obtiene el `firstName` del empleado por su `docId`.

### 4.4 Métodos de Productos (`products`)
- `addNewProduct(product)`: `Promise<void>` — Genera ID, asigna `product.docId = docRef.id` y guarda con `setDoc`.
- `getProducts()`: `Promise<Array<object>>` — Carga puntual de todos los productos.
- `listenToProducts(onDataChange)`: `UnsubscribeFunction` — Listener en tiempo real (`onSnapshot`) para sincronizar catálogo y stock.
- `updatePlusStock(docId, cantidad)`: `Promise<void>` — Incremento atómico de stock:
  ```javascript
  export async function updatePlusStock(docId, cantidad) {
      const docRef = doc(db, "products", docId);
      await updateDoc(docRef, { cantidad: increment(cantidad) });
  }
  ```
- `updateStock(docId, cantidadADescontar)`: `Promise<void>` — Decremento atómico de stock:
  ```javascript
  export async function updateStock(docId, cantidadADescontar) {
      const docRef = doc(db, "products", docId);
      await updateDoc(docRef, { cantidad: increment(-cantidadADescontar) });
  }
  ```

### 4.5 Método Transaccional de Órdenes (`saveOrderAndDecreaseStock`)
Este es el método crítico del sistema. Utiliza un `writeBatch` de Firestore para garantizar que **la orden se cree y el stock de todos los productos involucrados se descuente de forma atómica** (si una operación falla, ninguna se aplica):

```javascript
export async function saveOrderAndDecreaseStock(orderData) {
    const batch = writeBatch(db);

    // 1. Crear el nuevo documento de la orden
    const newOrderRef = doc(collection(db, "listOrden"));
    batch.set(newOrderRef, {
        docId: newOrderRef.id,
        userUID: orderData.userUID,
        empleadoUID: orderData.employerDocId,
        items: orderData.items,
        createdAt: new Date().toLocaleString("sv"), // Formato "YYYY-MM-DD HH:MM:SS"
    });

    // 2. Actualizar el stock de forma atómica para cada item de la orden
    orderData.items.forEach((item) => {
        const productRef = doc(db, "products", item.docId);
        batch.update(productRef, { cantidad: increment(-item.cantidad) });
    });

    // 3. Ejecutar todas las operaciones en un solo commit atómico
    await batch.commit();
    return newOrderRef.id;
}
```

### 4.6 Métodos de Reportes
- `getAllDocList()`: `Promise<Array<object>>` — Obtiene las últimas 30 órdenes ordenadas por fecha descendente:
  ```javascript
  const q = query(
      collection(db, "listOrden"),
      orderBy("createdAt", "desc"),
      limit(30)
  );
  ```

---

## 5. Reglas de Negocio Críticas

1. **Mutaciones de stock estrictamente atómicas:**
   - **NUNCA** hacer `read -> modify -> write` (por ejemplo leer `cantidad = 10`, restar 2 en memoria y guardar `cantidad = 8`). Bajo concurrencia esto genera pérdidas de stock.
   - Usar siempre `increment(n)` o `increment(-n)` con `updateDoc` o dentro de un `writeBatch`.

2. **Creación de orden y descuento en un solo lote:**
   - La orden y el decremento de existencias deben viajar en la misma transacción (`writeBatch`).

3. **Validación de stock disponible antes de agregar a la orden:**
   - En el cliente, validar que la cantidad solicitada no supere el stock actual (`cantidad > currentSelectProduct.cantidad`).
   - Rechazar números menores o iguales a cero o `NaN`.

4. **Consistencia de formatos de fecha:**
   - `products.createdAt`: Se guarda como string ISO 8601 (`new Date().toISOString()`).
   - `listOrden.createdAt`: Se guarda como string locale sueco `"sv"` (`new Date().toLocaleString("sv")`) que produce `"YYYY-MM-DD HH:MM:SS"`. Esto permite que `orderBy("createdAt", "desc")` de Firestore funcione alfabéticamente de manera correcta sin requerir un tipo Timestamp.
   - **Importante:** No mezcles tipos `Timestamp` con strings en `createdAt` porque Firestore no los compara de forma homogénea en queries ordenadas.

5. **Duplicación del `docId` dentro del documento:**
   - Al crear documentos autogenerados, el ID retornado por Firestore se asigna como propiedad `docId` en el objeto antes de guardarlo. Esto simplifica el mapeo en el cliente sin requerir `doc.id` posterior.

---

## 6. Flujo de Autenticación y Registro

```
[ Usuario abre la App ]
         │
         ▼
[ onAuthStateChanged ] ─── No autenticado ───► [ Botón Login (Google Popup) ]
         │
    Autenticado
         │
         ▼
[ getUserInfo(user.uid) ]
         │
    ┌────┴─────────────────────────────┐
    ▼                                  ▼
[ processCompleted = true ]    [ processCompleted = false ]
    │                                  │
    ▼                                  ▼
Redirigir a /dashboard         Redirigir a /choose-username
                                       │
                                       ▼
                               [ Asignar username y guardar ]
                                       │
                                       ▼
                               Redirigir a /dashboard
```

### Componente de Protección: `AuthProvider` (`src/components/AuthProvider.jsx`)
Es un componente contenedor que escucha el estado de autenticación y ejecuta callbacks según el caso:
- `onUserLoggedIn(user)`: Se ejecuta cuando el usuario existe y está autenticado.
- `onUserNotLoggedIn()`: Se ejecuta si no hay sesión activa (redirige a login).
- `onUserNotRegister(user)`: Se ejecuta si el usuario no tiene registro completo.

---

## 7. Arquitectura de Estado Global con Redux Toolkit

El store (`src/store/store.js`) consolida cuatro reducers:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import productsReducer from "../redux/productsSlice";
import employersReducer from "../redux/employersSlice";
import orderReducer from "../redux/orderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        employers: employersReducer,
        order: orderReducer,
    },
});
```

### Slices y Responsabilidades:

| Slice | Archivo | Estado Inicial | Propósito |
|---|---|---|---|
| `auth` | `src/redux/authSlice.js` | `{ user: null, status: "loading" }` | Usuario actual y estado (`loading`, `authenticated`, `unauthenticated`) |
| `employers` | `src/redux/employersSlice.js` | `{ items: [], status: "idle", error: null }` | Lista de empleados cargados desde Firebase |
| `products` | `src/redux/productsSlice.js` | `{ items: [], status: "idle", error: null }` | Catálogo de productos disponibles |
| `order` | `src/redux/orderSlice.js` | `{ selectedEmployer: null, items: [] }` | Borrador local de la orden en construcción |

### `orderSlice` (Borrador local de la orden)
Gestiona la lista de productos agregados temporalmente antes de enviar la orden a Firestore:
- `setOrderEmployer(employer)`: Asigna el empleado receptor.
- `addItemToOrder(item)`: Agrega un ítem `{ docId, nameproduct, cantidad }` al array `items`.
- `removeItemFromOrder({ docId })`: Elimina un ítem por su ID.
- `clearOrder()`: Limpia el borrador al salir o guardar la orden.

---

## 8. Rutas y Vistas

Todas las rutas se definen en `src/index.js` usando `react-router-dom` v6:

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `App.js` | Pantalla de bienvenida y login con Google |
| `/dashboard` | `DashboardView.jsx` | Menú principal con tarjetas de acceso rápido |
| `/createproduct` | `NewProduct.jsx` | Formulario para registrar un nuevo producto |
| `/createemploye` | `NewEmployer.jsx` | Formulario para registrar un nuevo empleado |
| `/updateproduct` | `UpdateStock.jsx` | Formulario para incrementar stock a un producto existente |
| `/createorder` | `CreatePedido.jsx` | Pantalla para armar y emitir una orden de salida |
| `/createreport` | `CreateReport.jsx` | Historial de órdenes con exportación a Excel |
| `/choose-username` | `ChooseUsernameView.jsx` | Configuración inicial de nombre de usuario |
| `/signout` | `SingOutView.jsx` | Cierre de sesión |
| `*` | `ErrorView.jsx` | Página 404 |

---

## 9. Flujos de Trabajo Paso a Paso

### 9.1 Registro de un Producto (`/createproduct`)
1. El usuario completa el formulario Formik (`nameproduct`, `detail`, `category`, `cantidad`).
2. Yup valida que los campos requeridos no estén vacíos.
3. Se añaden campos automáticos: `userUid` (del usuario autenticado) y `createdAt` (ISO).
4. Se ejecuta `addNewProduct(values)`.
5. Se redirige a `/dashboard`.

### 9.2 Actualización / Aumento de Stock (`/updateproduct`)
1. Al montar el componente, se llama `getProducts()` para poblar el `<select>` de productos.
2. Al seleccionar un producto, se muestra su `cantidad` (stock actual) en un campo de solo lectura.
3. El usuario ingresa la `cantidad` a sumar (validada con Yup: positiva, max 9999).
4. Al enviar, se invoca `updatePlusStock(docId, cantidad)`.
5. Firestore incrementa el campo `cantidad` atómicamente. Redirige a `/dashboard`.

### 9.3 Creación de una Orden de Salida (`/createorder`)
1. **Suscripción en tiempo real:** En `useEffect`, se inician los listeners `listenToProducts` y `listenToEmployers`. Cualquier cambio en Firestore se refleja de inmediato en los dropdowns.
2. **Selección de Empleado:** El usuario selecciona el empleado por DNI; se guarda en `order.selectedEmployer` en Redux.
3. **Selección de Producto y Cantidad:**
   - Se elige un producto del select.
   - Se muestra su stock actual disponible.
   - El usuario ingresa la cantidad deseada.
   - Al pulsar "Agregar", se valida que `cantidad > 0` y `cantidad <= stockDisponible`.
   - Se despacha `addItemToOrder(newItem)` al store de Redux.
4. **Guardado Atómico:**
   - Al pulsar "Guardar", se valida que haya un empleado y al menos un ítem.
   - Se llama a `saveOrderAndDecreaseStock({ userUID, employerDocId, items })`.
   - Firestore ejecuta el `writeBatch` (crea documento en `listOrden` y descuenta el stock de cada producto).
   - Se muestra alerta de éxito y se navega a `/dashboard`.
5. **Limpieza:** Al desmontar el componente, se ejecutan las funciones de `unsubscribe` de los listeners y se despacha `clearOrder()`.

### 9.4 Generación de Reportes y Exportación (`/createreport`)
1. El usuario pulsa la tarjeta "Generar Lista de Pedidos".
2. Se llama a `getAllDocList()`, obteniendo las últimas 30 órdenes.
3. **Resolución de Nombres:** Para cada orden, se hacen consultas asíncronas para obtener el nombre legible del administrador (`getNameAdminFirebase(item.userUID)`) y del empleado (`getNameEmployerFirebase(item.empleadoUID)`).
4. Se renderiza una tabla Material UI por cada orden.
5. **Exportación a Excel:** Cada tabla tiene un botón con `handleBtnExport(id)`. Utiliza SheetJS:
   ```javascript
   function handleBtnExport(id) {
       const fileName = id;
       const elt = document.getElementById(id);
       let wb = XLSX.utils.book_new();
       wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       XLSX.writeFile(wb, `${fileName}.xlsx`);
   }
   ```

---

## 10. Despliegue en Firebase Hosting

1. Compilar el proyecto para producción:
   ```bash
   pnpm run build
   ```
2. La configuración de `firebase.json` apunta a la carpeta `build` con reescritura de rutas para SPA:
   ```json
   {
     "hosting": {
       "public": "build",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```
3. Desplegar:
   ```bash
   firebase deploy
   ```

---

## 11. Problemas Conocidos y Puntos de Mejora en esta Base de Código

Al portar esta lógica a un nuevo proyecto, ten en cuenta los siguientes bugs y detalles encontrados en este repositorio para corregirlos desde el inicio:

1. **`productsSlice.js` tiene reducers vacíos (Bug Crítico):**
   - En `src/redux/productsSlice.js`, los reducers `setProducts`, `setProductsLoading` y `setProductsError` están como funciones vacías `{}`.
   - En `CreatePedido.jsx`, el listener despacha `dispatch(setProducts(data))` y luego lee `useSelector(state => state.products.items)`. Al estar vacío el reducer, `items` nunca se actualiza en Redux.
   - **Corrección recomendada:**
     ```javascript
     setProducts: (state, action) => {
         state.items = action.payload;
         state.status = "succeeded";
     },
     ```

2. **`ErrorView.jsx` importa módulos de Next.js (Bug):**
   - `src/page/ErrorView.jsx` importa `next/head` y `next/link`. Esta no es una aplicación Next.js, por lo que fallará en runtime si se renderiza la ruta 404.
   - **Corrección:** Usar `Link` de `react-router-dom`.

3. **`handleDelete` incompleto en `CreatePedido.jsx`:**
   - La función `handleDelete` filtra la lista localmente pero no despacha `removeItemFromOrder` a Redux, por lo que el botón eliminar en la tabla de la orden en construcción no tiene efecto.

4. **Botón "Limpiar" sin handler:**
   - En `CreatePedido.jsx`, el botón "Limpiar" tiene un `onClick={() => {}}` vacío. Debe despachar `dispatch(clearOrder())`.

5. **`AuthProvider.jsx` incluye HTML de debug:**
   - Renderiza un `<div>` con borde rojo y un `<h1>hola</h1>` al final del children. Debe eliminarse en producción.

6. **Problema N+1 en Reportes:**
   - En `CreateReport.jsx`, `getAllPedidos()` hace un `map` con `Promise.all` donde por cada orden se llama individualmente a `getNameAdmin` y `getNameEmployer`. Para muchas órdenes esto genera decenas de lecturas individuales a Firestore.
   - **Mejora:** Guardar `adminName` y `employerName` directamente como campos desnormalizados dentro del documento de la orden al crearla en `saveOrderAndDecreaseStock`, o cachear los nombres en memoria.

---

## 12. Checklist para Portar la Lógica a un Nuevo Proyecto

- [ ] 1. Crear proyecto en Firebase y activar Auth (Google), Firestore y Storage.
- [ ] 2. Copiar y configurar el archivo `.env` con las credenciales `REACT_APP_*`.
- [ ] 3. Copiar `src/firebase/firebase.js` y verificar que las colecciones coincidan (`users`, `employers`, `products`, `listOrden`).
- [ ] 4. Configurar el store de Redux Toolkit con los slices `auth`, `products`, `employers`, `order` (asegurando que los reducers no estén vacíos).
- [ ] 5. Implementar el listener de autenticación (`onAuthStateChanged`) y el componente `AuthProvider`.
- [ ] 6. Implementar los formularios de alta (`NewProduct`, `NewEmployer`) con Formik + Yup.
- [ ] 7. Implementar `CreatePedido` conectando los listeners en tiempo real (`listenToProducts`, `listenToEmployers`) y el método `saveOrderAndDecreaseStock`.
- [ ] 8. Implementar `UpdateStock` usando `updatePlusStock` (operador `increment`).
- [ ] 9. Implementar la vista de reportes (`CreateReport`) con exportación via `xlsx`.
- [ ] 10. Configurar las reglas de seguridad de Firestore (Security Rules) para que solo usuarios autenticados puedan leer y escribir.
