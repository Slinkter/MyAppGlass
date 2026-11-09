# Guía de instalación de Claude Code en Windows

> Fuente: documentación oficial (code.claude.com/docs/en/setup). Verificada en noviembre de 2026.

## Requisitos
| Requisito | Detalle |
|---|---|
| Sistema operativo | Windows 10 versión 1809 o superior, o Windows 11 |
| Hardware | 4 GB de RAM o más, procesador x64 o ARM64 |
| Cuenta | Claude **Pro, Max, Team o Enterprise**, o una cuenta de **Claude Console** (API). El plan gratuito de claude.ai **no** incluye Claude Code |
| Recomendado | **Git for Windows**: aporta Git Bash, que Claude Code usa para ejecutar comandos. Sin él usa PowerShell |
| Editor | VS Code 1.94 o superior para la extensión |
| Red | Conexión a internet. En redes corporativas puede requerir configurar proxy |

No necesitas permisos de administrador ni Node.js para la instalación nativa.

## 1 · Instalar Git for Windows (si no lo tienes)
1. Descarga desde https://git-scm.com/downloads/win y ejecuta el instalador con las opciones por defecto.
2. Abre una terminal nueva y verifica: `git --version`

## 2 · Instalar Claude Code
Abre **PowerShell** (tu prompt muestra `PS C:\Users\TuNombre>`) y ejecuta:

```powershell
irm https://claude.ai/install.ps1 | iex
```

¿Usas **CMD** (el prompt no muestra `PS`)? Ejecuta en su lugar:

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Alternativa con WinGet (no se actualiza sola; luego usa `winget upgrade Anthropic.ClaudeCode`):

```powershell
winget install Anthropic.ClaudeCode
```

El instalador no muestra progreso mientras descarga. Cuando termine, **cierra y abre una terminal nueva**.

## 3 · Verificar
```powershell
claude --version     # imprime algo como 2.1.xxx (Claude Code)
claude doctor        # diagnóstico de instalación y configuración, sin abrir sesión
```

## 4 · Iniciar sesión
```powershell
cd ruta\a\tu\proyecto
claude
```
Sigue las instrucciones del navegador para iniciar sesión con tu cuenta. Dentro de la sesión,
`/status` muestra la cuenta y el modelo activos. Para salir: `/exit` o `Ctrl + C` dos veces.

## 5 · Extensión de VS Code
1. `Ctrl + Shift + X` → busca **Claude Code** (publicada por Anthropic) → **Install**.
2. Abre un archivo cualquiera: aparece el ícono **Spark** (✱) arriba a la derecha del editor.
3. Inicia sesión desde el panel la primera vez.
4. Si no aparece: `Ctrl + Shift + P` → **Developer: Reload Window**.

La extensión trae su propia copia de Claude Code para el panel. Para usar `claude` en la terminal
integrada de VS Code necesitas también la instalación del paso 2.

## Problemas frecuentes
| Mensaje | Causa | Solución |
|---|---|---|
| `'irm' is not recognized…` | Estás en CMD, no en PowerShell | Usa el comando de CMD o abre PowerShell |
| `The token '&&' is not a valid statement separator` | Estás en PowerShell con el comando de CMD | Usa `irm … \| iex` |
| `claude : The term 'claude' is not recognized` | La carpeta de instalación aún no está en el PATH | Cierra y abre la terminal. Si persiste, agrega `%USERPROFILE%\.local\bin` al PATH del usuario |
| Claude Code no encuentra Git Bash | Git instalado en otra ruta | En `~/.claude/settings.json`: `{"env": {"CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"}}` |
| Error 403 o de certificado en la red de la empresa | Proxy corporativo | Prueba desde otra red o pide a TI la configuración de proxy (ver "network configuration" en la documentación) |
| "Your plan does not include Claude Code" | Cuenta gratuita | Necesitas Pro, Max, Team, Enterprise o Console |

## Desinstalar (si lo necesitas)
```powershell
Remove-Item -Path "$env:USERPROFILE\.local\bin\claude.exe" -Force
Remove-Item -Path "$env:USERPROFILE\.local\share\claude" -Recurse -Force
```
