# 🏗️ Arquitectura de Software (Architecture)

## 1. Patrones de Diseño

El sistema utiliza una arquitectura **Feature-Based** combinada con el patrón **Container/Presentational**.

### Patrón Container/Presentational
Separamos la lógica (cómo funcionan las cosas) de la vista (cómo se ven).

- **Container (`*Container.jsx`):**
    - Gestiona el estado (Hooks).
    - Realiza llamadas a servicios.
    - Pasa datos a los componentes de presentación vía props.
- **Presentational (`*Layout.jsx`, `*View.jsx`):**
    - Solo recibe datos y los muestra.
    - No tiene efectos secundarios ni llamadas a API.
    - Altamente reutilizable y fácil de testear.

### Estrategia Feature-Based
En lugar de agrupar por tipo técnico (`/components`, `/hooks`), agrupamos por funcionalidad de negocio cuando es posible, aunque mantenemos directorios raíz técnicos para elementos compartidos.

## 2. Diagrama de Alto Nivel

```mermaid
graph TD
    User[Usuario] -->|HTTPS| CDN[Firebase Hosting];
    CDN -->|Sirve| app[React SPA (Vite)];
    
    subgraph Frontend
        app -->|Navegación| router[React Router];
        app -->|UI Kit| chakra[Chakra UI + Framer Motion];
        app -->|Datos| services[Service Layer];
    end
    
    services -->|Lectura| static[Static Data (JS Files)];
    services -->|Escritura (Reclamos)| functions[Firebase Functions];
    
    subgraph Backend Serverless
        functions -->|Valida & Procesa| logic[Node.js Logic];
        logic -->|Persistencia| db[(Firestore)];
        logic -->|Notificación| mail[Resend API];
    end
```

## 3. Flujo de Datos

El flujo es unidireccional y predecible:
1.  **Vista:** Dispara un evento (ej. cargar página).
2.  **Container:** Llama al Servicio correspondiente.
3.  **Service:** Resuelve la promesa (simulada o real).
4.  **Container:** Actualiza el estado local.
5.  **Vista:** Se re-renderiza con los nuevos datos.

## 4. Decisiones Técnicas Clave

-   **Vite:** Elegido por su Hot Module Replacement (HMR) instantáneo, superior a CRA.
-   **Chakra UI:** Provee accesibilidad y consistencia de diseño out-of-the-box.
-   **Firebase:** Solución "todo en uno" para Hosting, Backend y BD, reduciendo costos de infraestructura.
-   **React Helmet Async:** Manejo de metadatos SEO dinámicos sin riesgo de memory leaks.
