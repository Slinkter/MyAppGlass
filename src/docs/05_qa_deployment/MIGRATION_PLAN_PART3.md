# Plan de Migración: MyAppGlass (Vite/React → Next.js)

## Fase 6: Configuración DNS (GoDaddy → Vercel)

### Opciones de Configuración DNS

#### Opción A: Zona DNS托管 en Vercel (Recomendado)

Esta opción delega la gestión DNS a Vercel, proporcionando SSL automático y configuración simplificada.

**Pasos:**
1. En GoDaddy, cambiar los servidores de nombres (Nameservers) a los de Vercel
2. Vercel aprovisiona y renueva certificados SSL automáticamente
3. Todas las configuraciones DNS se gestionan desde el dashboard de Vercel

**Nameservers de Vercel:**
```
a1.vercel-dns.com
a2.vercel-dns.com
```

#### Opción B: DNS gestionado en GoDaddy con registros manuales

Mantener la zona DNS en GoDaddy y agregar los registros manualmente.

**Pasos:**
1. Agregar registros DNS en el panel de GoDaddy
2. Verificar manualmente el certificado SSL en Vercel
3. Configurar redireccionamientos si es necesario

### Tabla de Registros DNS

| Tipo | Nombre | Valor | TTL | Notas |
|------|--------|-------|-----|-------|
| A | @ | `76.76.21.21` | 1 hora | Redirect a Vercel |
| A | www | `76.76.21.21` | 1 hora | Redirect a Vercel |
| CNAME | _vercel | `cname.vercel-dns.com` | 1 hora | Verificación SSL |
| TXT | @ | `vercel-domain-verification=tu-token` | 1 hora | Verificación de dominio |
| CNAME | (tu-dominio) | `cname.vercel.app` | 1 hora | Apuntar a Vercel |

### Comandos de Vercel CLI para Configuración de Dominio

```bash
# Ver dominios configurados en el proyecto
vercel domains ls

# Agregar dominio personalizado
vercel domains add tudominio.com

# Agregar dominio con configuración de producción
vercel domains add tudominio.com --for-production

# Eliminar dominio
vercel domains rm tudominio.com

# Forzar re-verificación de dominio
vercel domains verify tudominio.com

# Configurar dominio como predeterminado para producción
vercel domains set-default tudominio.com

# Ver estado de configuración DNS
vercel dns-show
```

### Pasos de Verificación SSL

```bash
# 1. Verificar que los registros DNS están propagados
nslookup tudominio.com
dig tudominio.com CNAME

# 2. Verificar configuración en Vercel
vercel certs ls

# 3. Esperar propagación (puede tomar hasta 48 horas)
# Mientras tanto, verificar estado en:
# https://vercel.com/dashboard → Settings → Domains

# 4. Verificar SSL manualmente
curl -I https://tudominio.com
# Debería mostrar: HTTP/2 200 y verificar certificados

# 5. Verificar con SSL Checker online
# https://www.ssllabs.com/ssltest/

# 6. Forzar renovación de certificado si es necesario
vercel certs renew <cert-id>
```

### Verificación Completa Post-DNS

```bash
# Verificar todos los aspectos del dominio
vercel inspect https://tudominio.com

# Probar redirecciones HTTP
curl -I http://tudominio.com
curl -I http://www.tudominio.com

# Verificar que www y non-www funcionan
curl -I https://tudominio.com
curl -I https://www.tudominio.com
```

---

## Fase 7: Deployment y Testing

### Workflow Completo de Deployment

#### Pre-Deployment Checklist

```bash
# 1. Verificar que no hay errores de TypeScript (usando JSDoc)
pnpm lint

# 2. Verificar types con typescript si está instalado
pnpm typecheck  # o npx tsc --noEmit

# 3. Build de producción local (opcional, para verificar)
pnpm build

# 4. Verificar que el build pasa
pnpm preview

# 5. Revisar cambios pendientes
git status
git diff --stat
```

#### Deployment Steps

```bash
# Development Environment
pnpm dev                    # Dev server local en puerto 5173

# Production Build
pnpm build                  # Build de producción a dist/

# Preview Build Local
pnpm preview                # Preview del build localmente

# Deploy a Vercel (Preview automático para cada PR)
vercel                     # Deploy a preview URL
vercel --prod              # Deploy a producción

# Deploy con configuración específica
vercel --token=tu-token    # Deploy con token CI/CD
vercel --yes               # Aceptar automáticamente confirmaciones

# Deploy función específica
vercel deploy --prebuilt   # Deploy con build pre-hecho

# Alias a deployment específico (para estabilidad)
vercel alias set <deployment-url> tudominio.com
```

#### Deployment con GitHub Integration

```bash
# Push triggers automatic deployment en Vercel
git push origin main       # Despliega a producción
git push origin feature/xxx # Despliega a preview

# Ver deployments en CLI
vercel ls                  # Listar todos los deployments
vercel ls --prod           # Solo deployments de producción
```

### Configuración de Variables de Entorno

#### Variables Requeridas para Producción

```bash
# Listar todas las variables de entorno necesarias
vercel env ls

# Agregar variable de entorno (desarrollo)
vercel env add FIREBASE_API_KEY
vercel env add FIREBASE_AUTH_DOMAIN
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_STORAGE_BUCKET
vercel env add FIREBASE_MESSAGING_SENDER_ID
vercel env add FIREBASE_APP_ID

# Agregar variable de entorno para producción
vercel env add FIREBASE_API_KEY production
vercel env add NODE_ENV production

# Agregar secreto (encriptado)
vercel secrets add firebase-private-key "$(cat firebase-key.json)"

# Pull variables de entorno locally
vercel env pull .env.local

# Eliminar variable
vercel env rm FIREBASE_API_KEY
```

#### Archivo `.env` para Vercel

```bash
# Desarrollo local (.env.local)
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_PROJECT_ID=xxx
FIREBASE_STORAGE_BUCKET=xxx
FIREBASE_MESSAGING_SENDER_ID=xxx
FIREBASE_APP_ID=xxx

# Producción - usar vercel env add para estas
# vercel env add FIREBASE_API_KEY production
```

### Testing Checklist Completo

#### Tests Funcionales

| # | Categoría | Elemento | Estado | Notas |
|---|-----------|----------|--------|-------|
| 1 | Autenticación | Login con email/password | ☐ | |
| 2 | Autenticación | Login con Google | ☐ | |
| 3 | Autenticación | Logout | ☐ | |
| 4 | Autenticación | Persistencia de sesión | ☐ | |
| 5 | Autenticación | Protected routes | ☐ | |
| 6 | CRUD | Crear documento | ☐ | |
| 7 | CRUD | Leer documento | ☐ | |
| 8 | CRUD | Actualizar documento | ☐ | |
| 9 | CRUD | Eliminar documento | ☐ | |
| 10 | Navegación | Links internos | ☐ | |
| 11 | Navegación | Navegación browser (back/forward) | ☐ | |
| 12 | Navegación | Deep links | ☐ | |
| 13 | Formularios | Validación de inputs | ☐ | |
| 14 | Formularios | Submit de formularios | ☐ | |
| 15 | Formularios | Estados de loading | ☐ | |
| 16 | Responsive | Mobile (375px) | ☐ | |
| 17 | Responsive | Tablet (768px) | ☐ | |
| 18 | Responsive | Desktop (1920px) | ☐ | |

#### Performance Testing

| # | Métrica | Target | Herramienta |
|---|---------|--------|-------------|
| 1 | Lighthouse Performance | > 90 | lighthouse |
| 2 | Lighthouse Accessibility | > 90 | lighthouse |
| 3 | First Contentful Paint (FCP) | < 1.8s | Web Vitals |
| 4 | Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| 5 | Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| 6 | Time to Interactive (TTI) | < 3.8s | Web Vitals |
| 7 | Bundle Size (JS) | < 200KB gzipped | webpack-bundle-analyzer |

#### SEO Testing

| # | Elemento | Verificación |
|---|----------|--------------|
| 1 | Meta tags | Title, description, og:* tags |
| 2 | Canonical URLs | Presentes y correctos |
| 3 | Sitemap | Generado y válido |
| 4 | Robots.txt | Configurado correctamente |
| 5 | Structured Data | Schema.org si aplica |
| 6 | H1 único | Solo uno por página |
| 7 | Alt tags | Todas las imágenes tienen alt |
| 8 | Semantic HTML | Uso correcto de tags |

#### Cross-Browser Testing

| Browser | Versión | Dispositivo | Resultado |
|---------|---------|-------------|-----------|
| Chrome | Latest | Desktop | ☐ |
| Firefox | Latest | Desktop | ☐ |
| Safari | Latest | macOS | ☐ |
| Edge | Latest | Desktop | ☐ |
| Chrome | Latest | Mobile (Android) | ☐ |
| Safari | Latest | iOS | ☐ |

#### Integración Firebase

| # | Función | Verificación |
|---|---------|--------------|
| 1 | Auth state | onAuthStateChanged funciona |
| 2 | Firestore reads | onSnapshot actualiza |
| 3 | Firestore writes | Datos persisten |
| 4 | Security rules | Permisos correctos |
| 5 | Cloud Functions | Llamadas funcionan |
| 6 | Error handling | Errores capturados |

### Verificación Post-Deployment

```bash
# 1. Verificar deployment exitoso
vercel ls --prod

# 2. Abrir URL de producción
vercel open

# 3. Verificar logs en caso de errores
vercel logs tudominio.com

# 4. Verificar desde terminal
curl -I https://tudominio.com

# 5. Verificar SSL
curl -I https://tudominio.com | grep -i ssl

# 6. Verificar tiempo de respuesta
time curl -o /dev/null -s https://tudominio.com

# 7. Revisar en Vercel Dashboard
# Settings → Deployment → Production
# Verificar "Ready" status
```

---

## Riesgos y Mitigaciones

| # | Riesgo | Probabilidad | Impacto | Mitigación | Contingencia |
|---|--------|--------------|---------|------------|--------------|
| 1 | Pérdida de SEO por cambios de URLs | Media | Alto | Implementar redirects 301 en vercel.json; mantener estructura de URLs lo más similar posible; crear redirects para rutas críticas | Usar Vercel rewrites para mapeo temporal; contactar Google Search Console para reindexación |
| 2 | Downtime durante transición DNS | Baja | Medio | Ejecutar cambios DNS en baja tráfico; usar Option A (ns records) para transición gradual | Mantener old site accesible; rollback DNS en GoDaddy si es necesario |
| 3 | Breakpoints de responsive no funcionan | Baja | Alto | Testing exhaustivo en múltiplos dispositivos; usar BrowserStack para verificación | Implementar CSS responsive básico como fallback |
| 4 | Errores de Firebase post-migration | Media | Alto | Verificar todas las variables de entorno en Vercel; hacer testing completo de auth y Firestore | Re-desplegar con variables correctas; verificar rules de Firestore |
| 5 | Build failures en Vercel | Baja | Medio | Testear build localmente antes de deploy; verificar dependencias compatibles con Next.js | Hacer debug del build local; consultar logs de Vercel |
| 6 | Certificados SSL no aprovisionados | Baja | Alto | Usar Option A (Vercel managed DNS); esperar tiempo de propagación | Support ticket a Vercel; verificación manual DNS |
| 7 | Performance degradada vs Vite | Baja | Medio | Implementar todas las optimizaciones de Next.js (SSR, ISR, Image); monitorear Core Web Vitals | Revisar configuración de rendering; ajustar revalidación |
| 8 | Breaking changes en APIs de Next.js 14/15 | Baja | Medio | Revisar changelog; usar versión estable; implementar feature flags | Rollback a versión anterior de Next.js |
| 9 | Problemas de memoria en build | Media | Bajo | Aumentar memory en vercel.json; optimizar imports; usar dynamic imports | Dividir bundles; lazy loading agresivo |
| 10 | Rate limiting en APIs de terceros | Baja | Medio | Implementar caching; agregar delays en llamadas | Usar rate limiting en cliente; usar APIs de backend si es crítico |
| 11 | Pérdida de datos de Firestore | Muy Baja | Crítico | No modificar datos durante migración; backup previo | Restaurar desde backup de Firestore; verificar regular de reglas |
| 12 | Errores de Auth (Google OAuth) | Media | Alto | Verificar redirect URIs en Google Cloud Console; probar flujo completo | Ajustar OAuth consent; verificar scopes |
| 13 | Configuración de environment en preview vs prod | Media | Medio | Usar vercel env para separar environments; documentar variables | Scripts de deploy pre-configurados; CI/CD pipeline |
| 14 | Cache de CDN no actualizado post-deploy | Baja | Bajo | Vercel maneja cache automáticamente; forzar purge si necesario | Usar vercel deploy --force; purgar cache manualmente |

---

## Timeline Resumen

| Fase | Descripción | Estimación | Dependencias | Entregables | Prioridad |
|------|-------------|------------|---------------|-------------|-----------|
| 0 | Evaluación y Planificación | 2-4 horas | Acceso a código, Vercel, GoDaddy | Documento de evaluación, checklist | Alta |
| 1 | Setup Proyecto Next.js | 4-8 horas | Node 18+, pnpm, cuenta Vercel | Proyecto Next.js compilando, estructura básica | Alta |
| 2 | Configuración Firebase | 2-4 horas | Proyecto Firebase existente, credenciales | Firebase client inicializado, auth funcionando | Alta |
| 3 | Migración de Componentes | 16-32 horas | Fase 1 y 2 completas | Componentes migrados y funcionando | Alta |
| 4 | Routing y Navegación | 4-8 horas | Estructura de componentes | Sistema de rutas funcional, layouts | Alta |
| 5 | Optimización y Testing | 8-16 horas | Componentes migrados | Build optimizado, testing passing | Alta |
| 6 | Configuración DNS | 1-2 horas | Cuenta GoDaddy, proyecto Vercel | Dominio configurado, SSL activo | Media |
| 7 | Deployment Final | 2-4 horas | DNS propagado, testing completo | Sitio en producción funcionando | Alta |

**Estimación Total:** 39-78 horas (1-2 semanas de trabajo)

**Hitos (Milestones):**
- Semana 1: Fases 0-3 completas (MVP funcional)
- Semana 2: Fases 4-5 completas (Feature parity)
- Semana 3: Fases 6-7 completas (Producción)

---

## Comandos de Referencia

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview de producción local
pnpm preview

# Linting
pnpm lint

# Type checking
pnpm typecheck   # o npx tsc --noEmit

# Limpiar cache y node_modules
pnpm clean

# Instalar dependencias
pnpm install

# Actualizar dependencias
pnpm up
pnpm up --latest

# Analizar bundle
pnpm analyze
```

### Vercel CLI

```bash
# Login y logout
vercel login
vercel logout

# Deploy
vercel                     # Deploy actual directorio
vercel --prod              # Deploy a producción
vercel --token TOKEN       # Deploy CI/CD
vercel --yes               # Auto-confirmar
vercel --force             # Force redeploy

# Gestión de dominios
vercel domains ls
vercel domains add DOMINIO
vercel domains rm DOMINIO
vercel domains verify DOMINIO
vercel domains set-default DOMINIO

# Variables de entorno
vercel env ls
vercel env add NOMBRE
vercel env add NOMBRE production
vercel env rm NOMBRE
vercel env pull .env.local

# Secrets
vercel secrets ls
vercel secrets add NOMBRE valor
vercel secrets rm NOMBRE

# Despliegues
vercel ls
vercel ls --prod
vercel inspect URL
vercel alias URL DESTINO
vercel alias set URL DESTINO

# Logs
vercel logs URL
vercel logs --follow URL

# Eliminación
vercel remove URL
vercel remove --yes

# Proyecto
vercel link
vercel switch PROYECTO
vercel project ls
```

### Git

```bash
# Estados
git status
git diff
git diff --staged
git log --oneline -10

# Ramas
git branch
git branch NOMBRE
git checkout NOMBRE
git checkout -b NOMBRE
git switch NOMBRE
git switch -c NOMBRE
git branch -d NOMBRE

# Staging y commits
git add .
git add -p
git commit -m "mensaje"
git commit -am "mensaje"  # solo archivos trackeados
git commit --amend
git reset HEAD~
git reset --soft HEAD~
git reset --hard HEAD~

# Sincronización
git fetch
git pull
git pull --rebase
git push
git push -u origin RAMA
git push --force-with-lease

# Stash
git stash
git stash list
git stash pop
git stash drop

# Rebase
git rebase main
git rebase -i HEAD~3
git rebase --continue
git rebase --abort
```

### next.js (durante desarrollo)

```bash
# Builds
next build
next build --no-lint
next build --noTelemetry

# Start producción
next start
next start -p 3000

# Export estático (si aplica)
next export

# Telemetry
next telemetry disable
next telemetry status
```

---

## Recursos

### Documentación Oficial

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Chakra UI Documentation](https://www.chakra-ui.com/docs)
- [Vite Migration Guide](https://vitejs.dev/guide/migration)

### Guías de Deployment

- [Vercel - Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
- [Vercel - Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel - Custom Domains](https://vercel.com/docs/concepts/custom-domains)
- [Vercel - Git Integration](https://vercel.com/docs/deployments/git)

### Performance

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Next.js Script Optimization](https://nextjs.org/docs/basic-features/script)
- [Web Vitals](https://web.dev/vitals/)
- [Core Web Vitals Guide](https://nextjs.org/docs/going-to-production#core-web-vitals)

### SEO

- [Next.js SEO Best Practices](https://nextjs.org/docs/going-to-production#improving-your-seo)
- [Google Search Central](https://developers.google.com/search)
- [Vercel Analytics Setup](https://vercel.com/docs/concepts/analytics)

### Testing

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro)
- [Jest](https://jestjs.io/docs/getting-started)
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

### Firebase

- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Auth States](https://firebase.google.com/docs/auth/web/start)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

## Notas para Sesiones Futuras

### Antes de Comenzar una Sesión

1. **Revisar estado actual:**
   ```bash
   git log --oneline -5
   git status
   vercel ls --prod
   ```

2. **Leer documentación de sesiones anteriores** en:
   - `src/docs/00_planning/PROGRESS.md`
   - `src/docs/00_planning/MIGRATION_PLAN_PART1.md`
   - `src/docs/00_planning/MIGRATION_PLAN_PART2.md`

3. **Verificarbranch activa:**
   ```bash
   git branch --show-current
   ```

4. **Checkpoints de trabajo:**
   - Hacer commit antes de cambios grandes
   - Usar feature branches para trabajo experimental
   - Mantener commits atómicos y descriptivos

### Enfoque de Trabajo Recomendado

1. **Sesiones cortas (1-2 horas):**
   - Focus en tareas específicas de una fase
   - No intentar completar fases completas
   - Documentar progreso al final

2. **Sesiones largas (3-4 horas):**
   - Dividir en bloques de 45-60 minutos con breaks
   - Combinar: coding + testing + documentation
   - Priorizar: funcionalidad > optimización > polish

3. **Manejo de problemas:**
   - Si algo no funciona después de 20-30 min, pedir ayuda o investigar docs
   - Documentar errores y soluciones en el archivo de progreso
   - Considerar alternativas si el enfoque original no funciona

### Criterios de Éxito por Sesión

- Al menos un feature/módulo migrado funcionando
- Código pasa lint sin warnings
- Sin errores de console en navegador
- Deployment exitoso a preview

### Tasks Pendientes de Documentar

- [ ] Estado actual de migración de componentes
- [ ] Issues known y workarounds
- [ ] URLs de preview para testing
- [ ] Variables de entorno configuradas
- [ ] Configuraciones específicas de Vercel
- [ ] Problemas resueltos y soluciones aplicadas

### Para Continuar la Migración

1. **Ejecutar siempre primero:**
   ```bash
   pnpm dev
   ```

2. **Verificar estado de Firebase:**
   - Probar login/logout
   - Verificar que Firestore operations funcionan

3. **Para cada componente:**
   - Verificar que compila sin errores
   - Testear interactividad
   - Verificar responsive en DevTools
   - Deploy a preview y verificar

4. **Antes de commit:**
   ```bash
   pnpm lint
   vercel --prod  # Solo si todo está verificado
   ```

### Recordatorios Importantes

- **No hacer deploy a producción** hasta que todo esté verificado en preview
- **Mantener backup del código** antes de refactors grandes
- **Documentar decisiones técnicas** que afecten arquitectura
- **Actualizar MIGRATION_PLAN** con cambios realizados
- **Verificar tests** antes de marcar una sección como completa

### Contacto y Soporte

Para dudas técnicas:
- Revisar documentación en `src/docs/`
- Consultar Next.js docs: https://nextjs.org/docs
- Vercel support: https://vercel.com/help
