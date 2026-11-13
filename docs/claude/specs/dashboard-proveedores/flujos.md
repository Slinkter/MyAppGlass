# Flujos del dashboard de proveedores

Documento para revisión del dueño. Muestra cómo va a funcionar el sistema, sin entrar en código. Los diagramas se dibujan solos en GitHub.

Regla de fondo: el cliente nunca ve a los proveedores. Sus datos viven solo en el panel de administración.

## 1. Vista general

```mermaid
flowchart LR
    BOT["Bot de proveedores<br/>proyecto aparte"] --> API["API local<br/>puerto 8000"]
    API --> SCRIPT["Script de sincronización"]
    SCRIPT --> FS[("Firestore<br/>solo admin")]
    FS --> PANEL["Panel /admin<br/>Pedidos y Sistemas"]
    PANEL -. "fase posterior" .-> PUB["Sistemas publicados"]
    PUB -. "fase posterior" .-> WEB["Páginas públicas"]
```

- El bot de proveedores es un proyecto aparte que junta los catálogos y los deja disponibles en una API que corre en su computadora.
- El script copia esos datos a Firestore, y desde ahí los lee el panel. Así el panel funciona aunque la API esté apagada.
- Solo el administrador puede leer esos datos. El cliente nunca ve proveedores, fotos ni planos de ellos.
- La línea punteada es una fase posterior: los sistemas que usted publique llegarían a las páginas públicas, sin datos de proveedores.

## 2. Sincronización

```mermaid
sequenceDiagram
    actor A as Admin
    participant S as Script
    participant API as API local
    participant F as Firestore
    participant ST as Storage
    A->>S: Corre el script
    S->>API: Consulta /salud
    alt API apagada
        API-->>S: Sin respuesta
        S-->>A: Termina sin cambios
    else API encendida
        API-->>S: Todo en orden
        S->>API: Pide /productos por páginas
        API-->>S: Productos
        S->>F: Escribe proveedores_productos
        S->>ST: Sube las fotos
        S->>F: Marca inactivos los que ya no vienen
        S-->>A: Resumen de lo hecho
    end
```

- Antes de tocar nada, el script pregunta si la API está encendida. Si no lo está, termina y no cambia nada.
- Si está encendida, trae los productos por tandas y los guarda en Firestore.
- Las fotos se suben a Storage, también con acceso solo para el administrador.
- Lo que el proveedor ya no trae se marca como inactivo, no se borra. Al final recibe un resumen.

## 3. Vida de un sistema

```mermaid
stateDiagram-v2
    [*] --> Estudio: Estudio de catálogos
    Estudio --> Borrador: Se carga en el panel
    Borrador --> Publicado: Usted publica
    Borrador --> Eliminado: Usted elimina
    Publicado --> Borrador: Despublicar
    Eliminado --> [*]
    note right of Borrador
        Alias: Serie 20 en un proveedor
        y VR20 en otro son un mismo
        sistema con un nombre propio
    end note
```

- Primero se estudian los catálogos de los proveedores y se identifican los sistemas.
- Todo sistema nuevo entra como borrador: nadie fuera del panel lo ve.
- Usted decide si lo publica o lo elimina. Un sistema publicado puede volver a borrador.
- Cada proveedor llama distinto a lo mismo, por eso el sistema guarda sus alias y tiene un nombre propio de la empresa.

## 4. Pedido de compra

```mermaid
flowchart TD
    A["Entrar a /admin/pedidos"] --> B["Buscar por código, nombre, categoría o proveedor"]
    B --> C["Agregar producto con cantidad"]
    C --> D["Resumen separado por proveedor"]
    D --> E{"¿Hay precio?"}
    E -- Sí --> F["Muestra el monto"]
    E -- No --> G["Sin información de precio"]
    F --> H["Guardar borrador"]
    G --> H
    H --> I["Vista previa A4"]
    I --> J["Enviar a aprobación"]
    J --> K["Admin aprueba"]
    K --> L["Imprimir o descargar"]
```

- Se busca el producto, se agrega con su cantidad y el pedido se ordena solo por proveedor.
- Hoy ningún producto trae precio, así que verá "Sin información de precio" hasta que usted lo defina.
- El borrador se puede guardar y retomar. La vista previa muestra la hoja A4 tal como saldrá.
- Un pedido solo se imprime o descarga cuando el administrador lo aprueba.

## 5. Estados del pedido

```mermaid
stateDiagram-v2
    [*] --> Borrador
    Borrador --> PorAprobar: Enviar a aprobación
    PorAprobar --> Aprobado: Admin aprueba
    PorAprobar --> Borrador: Devuelto
    Aprobado --> [*]
    note right of Aprobado
        Enviado y recibido dependen
        de la respuesta E18 en entrevista.md
    end note
```

- Un pedido nace como borrador y puede corregirse cuantas veces haga falta.
- Al enviarlo pasa a "por aprobar". Quien aprueba lo deja aprobado o lo devuelve a borrador.
- Cada pedido guarda quién lo creó y en qué estado está.
- Los estados "enviado" y "recibido" quedan pendientes de su respuesta E18 en `entrevista.md`.

## 6. Modelo de datos

```mermaid
erDiagram
    proveedores_productos {
        string id "proveedor_cod"
        string proveedor
        string cod
        string nombre
        string categoria
        string foto
        boolean activo
    }
    sistemas {
        string serviceSlug
        string nombre
        string tipoApertura
        string perfiles
        string vidrio
        string descripcion
        string fuente
        string estado
        boolean pricePending
    }
    aliases {
        string proveedor
        string denominacion
    }
    accesorios {
        string proveedor
        string cod
    }
    pedidos_proveedor {
        string numero
        string createdBy
        string estado
        date fecha
    }
    lineas {
        string proveedor
        string cod
        number cantidad
    }
    services {
        string slug
        string nombre
    }
    sistemas ||--o{ aliases : tiene
    sistemas ||--o{ accesorios : usa
    accesorios }o--|| proveedores_productos : apunta
    pedidos_proveedor ||--o{ lineas : contiene
    lineas }o--|| proveedores_productos : pide
    services ||--o{ sistemas : agrupa
```

- `proveedores_productos` es la copia del catálogo de proveedores, un documento por producto.
- `sistemas` pertenece a un servicio, guarda sus alias por proveedor y los accesorios, que apuntan a productos del catálogo.
- `pedidos_proveedor` guarda quién lo creó, su estado y sus líneas; cada línea apunta a un producto.
- Los campos del pedido y del producto pueden ajustarse al construir; el plan fija los de sistemas y pedido.

## 7. Cómo se reparte el trabajo

```mermaid
flowchart TD
    F0["Fase 0<br/>Documentos y rama"] --> C0(["Commit de control"])
    C0 --> F1["Fase 1<br/>Sincronización"]
    C0 --> F2["Fase 2<br/>Estudio y sistemas"]
    F1 --> T13["Tarea 1.3<br/>entities/supplier"]
    T13 --> F3["Fase 3<br/>Pedido de compra"]
    F1 --> C1(["Commit de control"])
    F2 --> C2(["Commit de control"])
    F3 --> C3(["Commit de control"])
    C1 --> F4["Fase 4<br/>Menú y cierre"]
    C2 --> F4
    C3 --> F4
    F4 --> C4(["Commit de control"])
```

- La Fase 0 prepara los documentos y la rama.
- Las fases 1 y 2 corren al mismo tiempo, porque el estudio solo lee documentos.
- La Fase 3 arranca apenas termina la tarea 1.3, sin esperar el resto de la Fase 1.
- La Fase 4 enlaza todo en el menú y cierra.
- Cada fase termina con un commit de control, y solo si build, typecheck y lint están en verde.
