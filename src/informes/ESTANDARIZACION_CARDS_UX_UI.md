# 🎨 Estandarización UX/UI de Cards

**Fecha:** 26 de Noviembre de 2025  
**Objetivo:** Estandarizar altura y diseño de ServiceCard y ProjectCard

---

## 📊 Estado Actual

### ServiceCard

```javascript
// Contenedor
maxW={{ base: "full", md: "sm" }}  // 384px ✅
maxH={{ base: "452px", md: "512px" }}

// Imagen
h={{ base: "320px", md: "385px" }}

// Contenido
- Título (Heading)
- Botón "Catálogo" (horizontal con título)
```

### ProjectCard

```javascript
// Contenedor
maxW={{ base: "full", md: "sm" }}  // 384px ✅
maxH={{ base: "452px", md: "512px" }}  // ✅ Agregado

// Imagen
h={{ base: "320px", md: "325px" }}

// Contenido
- Título (Heading)
- Dirección (con icono)
- Año (con icono)
- Botón "Ver en Google Maps"
```

---

## 🎯 Recomendaciones de Estandarización

### Opción 1: Altura Fija (Recomendado para UX/UI)

**Beneficios:**

- Grid perfectamente alineado
- Diseño más profesional
- Consistencia visual

**Implementación:**

```javascript
// Ambos cards
<Box
  maxW={{ base: "full", md: "sm" }}
  h={{ base: "auto", md: "500px" }} // Altura fija en desktop
  display="flex"
  flexDirection="column"
>
  {/* Imagen con altura fija */}
  <FadingImage h={{ base: "280px", md: "300px" }} flex="0 0 auto" />

  {/* Contenido con flex para distribuir espacio */}
  <Stack flex="1" spacing={3} p={4}>
    <Heading minH="3rem">...</Heading>
    {/* Contenido adicional */}
    <Button mt="auto">...</Button> {/* Botón siempre al final */}
  </Stack>
</Box>
```

**Alturas Recomendadas:**

- **Mobile:** `auto` (se adapta al contenido)
- **Desktop:** `500px` (altura fija)
- **Imagen:** `300px` (60% del card)
- **Contenido:** `200px` (40% del card, con flex)

---

### Opción 2: Altura Mínima (Más Flexible)

**Beneficios:**

- Se adapta a contenido variable
- Más flexible para futuro

**Implementación:**

```javascript
<Box
  maxW={{ base: "full", md: "sm" }}
  minH={{ base: "auto", md: "480px" }} // Altura mínima
>
  <FadingImage h={{ base: "280px", md: "320px" }} />
  <Stack spacing={3} p={4}>
    ...
  </Stack>
</Box>
```

---

## 🔧 Cambios Específicos Recomendados

### ServiceCard.jsx

```javascript
// Línea 43-60
<Box
  maxW={{ base: "full", md: "sm" }}
  h={{ base: "auto", md: "500px" }}  // Cambio: altura fija
  display="flex"
  flexDirection="column"
  ...
>
  <Box p={4} flex="1" display="flex" flexDirection="column">
    <FadingImage
      h={{ base: "280px", md: "300px" }}  // Cambio: reducir altura
      mb={4}
    />
    <Stack spacing={3} flex="1" justifyContent="space-between">
      <Heading
        size="md"
        textAlign="center"
        minH="2.5rem"  // Reserva espacio para 2 líneas
      >
        {name}
      </Heading>
      <Button w="full" mt="auto">  {/* mt="auto" empuja al final */}
        Catálogo
      </Button>
    </Stack>
  </Box>
</Box>
```

### ProjectCard.jsx

```javascript
// Línea 56-75
<Box
  maxW={{ base: "full", md: "sm" }}
  h={{ base: "auto", md: "500px" }}  // Cambio: altura fija
  display="flex"
  flexDirection="column"
  ...
>
  <Box p={4} flex="1" display="flex" flexDirection="column">
    <FadingImage
      h={{ base: "280px", md: "300px" }}  // Cambio: estandarizar altura
      mb={4}
    />
    <Stack spacing={2} flex="1" justifyContent="space-between">
      <Box>
        <Heading size="md" minH="2.5rem">{residencial}</Heading>
        <Flex alignItems="center" fontSize="sm">
          <Icon as={MapPinIcon} />
          <Text>{address}</Text>
        </Flex>
        <Flex alignItems="center" fontSize="sm">
          <Icon as={CalendarDaysIcon} />
          <Text>{year}</Text>
        </Flex>
      </Box>
      <Button w="full" mt="auto">  {/* mt="auto" empuja al final */}
        Ver en Google Maps
      </Button>
    </Stack>
  </Box>
</Box>
```

---

## 📐 Distribución de Espacio

### Card de 500px (Desktop)

```
┌─────────────────────────┐
│  Padding: 16px          │
├─────────────────────────┤
│                         │
│  Imagen: 300px          │  60%
│                         │
├─────────────────────────┤
│  Título: 40px           │
│  (minH para 2 líneas)   │
├─────────────────────────┤
│  Contenido: variable    │  40%
│  (dirección, año, etc)  │
├─────────────────────────┤
│  Botón: 40px            │
│  (mt="auto")            │
├─────────────────────────┤
│  Padding: 16px          │
└─────────────────────────┘
```

---

## ✅ Checklist de Implementación

- [ ] Actualizar ServiceCard con altura fija
- [ ] Actualizar ProjectCard con altura fija
- [ ] Estandarizar altura de imágenes (300px)
- [ ] Agregar `display="flex"` y `flexDirection="column"`
- [ ] Usar `flex="1"` para contenido
- [ ] Usar `mt="auto"` en botones
- [ ] Agregar `minH` en títulos
- [ ] Probar en mobile y desktop
- [ ] Verificar alineación en grid

---

## 🎨 Principios UX/UI Aplicados

1. **Consistencia:** Todos los cards tienen la misma altura
2. **Alineación:** Grid perfectamente alineado
3. **Jerarquía Visual:** Imagen → Título → Contenido → Acción
4. **Espacio en Blanco:** Uso de padding y spacing consistente
5. **Responsive:** Se adapta bien a mobile y desktop

---

## 📊 Comparación Visual

**Antes:**

```
Card 1: 452px    Card 2: 512px    Card 3: 480px
   ↓                 ↓                 ↓
[Desalineado - Diferentes alturas]
```

**Después:**

```
Card 1: 500px    Card 2: 500px    Card 3: 500px
   ↓                 ↓                 ↓
[Alineado - Altura uniforme] ✅
```

---

## 🚀 Próximos Pasos

1. Aplicar cambios en ServiceCard.jsx
2. Aplicar cambios en ProjectCard.jsx
3. Ejecutar `pnpm run build`
4. Verificar en http://localhost:4173/servicios
5. Verificar en http://localhost:4173/proyectos
6. Comparar alineación visual

---

_Nota: Los cambios propuestos mejoran significativamente la UX/UI manteniendo la funcionalidad existente._
