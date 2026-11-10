# Skills instaladas — MyAppGlass

Registro de las skills disponibles para Claude Code en este proyecto, con su origen y cómo restaurarlas en otra PC.

Generado el 2026-11-02 a partir de `skills-lock.json`, `.agents/skills/` y `~/.claude/skills/`.

---

## 1. Skills del proyecto (versionadas en git)

Están en `.agents/skills/` y el lock en `docs/skills-lock.json`. **Al clonar el repo ya vienen incluidas**; no hace falta instalarlas de nuevo.

Total: **32 skills** en `.agents/skills/`. `apple-design` es una skill de usuario (`.claude/skills/`, ignorada por git) y se restaura aparte. Último cambio del lock: 2026-11-02.

`ui-ux-pro-max` también está copiada en `.claude/skills/ui-ux-pro-max/` (ignorada por git) para que Claude Code la cargue. Para restaurarla: `npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max -a claude-code`.

| Skill | Origen (GitHub) | Ruta en el origen |
|---|---|---|
| apple-design | dickwu/apple-design-skill | SKILL.md (se instala en `.claude/skills/apple-design`, carpeta ignorada por git; restaurar con `npx skills add dickwu/apple-design-skill -a claude-code`) |
| extension-to-functions-codebase | firebase/agent-skills | skills/extension-to-functions-codebase |
| find-skills | vercel-labs/skills | skills/find-skills |
| firebase-ai-logic-basics | firebase/agent-skills | skills/firebase-ai-logic-basics |
| firebase-app-hosting-basics | firebase/agent-skills | skills/firebase-app-hosting-basics |
| firebase-auth-basics | firebase/agent-skills | skills/firebase-auth-basics |
| firebase-basics | firebase/agent-skills | skills/firebase-basics |
| firebase-crashlytics | firebase/agent-skills | skills/firebase-crashlytics |
| firebase-data-connect | firebase/agent-skills | skills/firebase-data-connect-basics |
| firebase-firestore | firebase/agent-skills | skills/firebase-firestore |
| firebase-hosting-basics | firebase/agent-skills | skills/firebase-hosting-basics |
| firebase-remote-config-basics | firebase/agent-skills | skills/firebase-remote-config-basics |
| firebase-security-rules-auditor | firebase/agent-skills | skills/firebase-security-rules-auditor |
| frontend-design | anthropics/skills | skills/frontend-design |
| game-engine | github/awesome-copilot | skills/game-engine |
| hyperframes-animation | heygen-com/hyperframes | skills/hyperframes-animation |
| improve-codebase-architecture | mattpocock/skills | skills/engineering/improve-codebase-architecture |
| mcp-builder | anthropics/skills | skills/mcp-builder |
| nextjs-app-router-patterns | wshobson/agents | plugins/frontend-mobile-development/skills/nextjs-app-router-patterns |
| nextjs-seo | laguagu/claude-code-nextjs-skills | skills/nextjs-seo |
| pdf | anthropics/skills | skills/pdf |
| react-doctor | millionco/react-doctor | skills/react-doctor |
| skill-creator | anthropics/skills | skills/skill-creator |
| theme-factory | anthropics/skills | skills/theme-factory |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill | .claude/skills/ui-ux-pro-max |
| vercel-cli-with-tokens | vercel-labs/agent-skills | skills/vercel-cli-with-tokens |
| vercel-composition-patterns | vercel-labs/agent-skills | skills/composition-patterns |
| vercel-optimize | vercel-labs/agent-skills | skills/vercel-optimize |
| vercel-react-best-practices | vercel-labs/agent-skills | skills/react-best-practices |
| vercel-react-view-transitions | vercel-labs/agent-skills | skills/react-view-transitions |
| web-design-guidelines | vercel-labs/agent-skills | skills/web-design-guidelines |
| webapp-testing | anthropics/skills | skills/webapp-testing |
| writing-guidelines | vercel-labs/agent-skills | skills/writing-guidelines |

---

## 2. Skills de usuario (fuera del repo)

Viven en `~/.claude/skills/`, **no están en git**. Hay que copiarlas a mano o volver a sincronizarlas en la otra PC.

### 2.1 `synced/` — instaladas el 2026-10-29 (última instalación)

Sincronizadas desde la cuenta de Claude (carpeta `4b8acfa2-…_062c172d-…`). Se reciben automáticamente al iniciar sesión con la misma cuenta.

| Skill | Uso |
|---|---|
| built-in-browser | Navegador integrado de la app de escritorio de Claude |
| chrome-browser | Extensión Claude in Chrome |
| computer-use | Control del escritorio de la persona |
| deep-research | Investigación multi-fuente con subagentes |
| docs | Documentos editables y compartibles |
| docx | Archivos Word (.docx / .dotx) |
| google-workspace | Google Docs, Sheets, Slides y Drive |
| import-memory | Importar memoria desde otro asistente |
| morning | Resumen matutino como artifact |
| pdf | Lectura, creación y edición de PDF |
| pptx | Presentaciones PowerPoint |
| skill-creator | Crear y mejorar skills |
| xlsx | Hojas de cálculo (.xlsx, .csv) |

Además existe `manifest.json` en esa misma carpeta con el catálogo.

### 2.2 `anatomy/` — instalada el 2026-10-12

Skill de figuras isométricas SVG interactivas. Origen: repositorio público de Anatomy (incluye `README.md`, `SKILL.md`, `kit/`, `examples/`, `tests/`). Para restaurarla en otra PC, clonar su repositorio dentro de `~/.claude/skills/anatomy`.

---

## 3. Cómo restaurar en otra PC

1. **Skills del proyecto:** `git clone` y `git pull` del repo. `.agents/skills/` y `docs/skills-lock.json` ya están versionados.
2. **Skills de la cuenta (`synced`):** iniciar sesión en Claude Code con la misma cuenta; se sincronizan solas.
3. **Skill `anatomy`:** copiar `~/.claude/skills/anatomy` desde la PC actual o clonar su repositorio de origen.
4. **Verificar:** en Claude Code, listar las skills y confirmar que aparecen las 32 del proyecto, las 13 de `synced` y `anatomy` (14 en total de usuario).

---

## 4. Invocar una skill

- Desde el chat: `/<nombre-de-skill>`, por ejemplo `/pdf` o `/firebase-firestore`.
- Desde el código: Claude la carga cuando la tarea coincide con su descripción.
