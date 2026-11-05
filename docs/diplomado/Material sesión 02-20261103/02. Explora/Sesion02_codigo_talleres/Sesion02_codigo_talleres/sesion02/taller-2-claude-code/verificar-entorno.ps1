# ============================================================================
#  TurnoYa · Sesión 2 · Taller 2 · Verificación del entorno (Windows)
#  Uso (en PowerShell, dentro de la carpeta taller-2-claude-code):
#     Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#     .\verificar-entorno.ps1
#  Solo LEE tu sistema: no instala ni modifica nada.
# ============================================================================

$ok = 0; $fallas = 0

function Revisar($nombre, $comando, $argumento, $obligatorio, $ayuda) {
    $cmd = Get-Command $comando -ErrorAction SilentlyContinue
    if ($cmd) {
        $version = (& $comando $argumento 2>$null | Select-Object -First 1)
        Write-Host ("  [OK]    {0,-22} {1}" -f $nombre, $version) -ForegroundColor Green
        $script:ok++
    } elseif ($obligatorio) {
        Write-Host ("  [FALTA] {0,-22} {1}" -f $nombre, $ayuda) -ForegroundColor Red
        $script:fallas++
    } else {
        Write-Host ("  [OPC]   {0,-22} {1}" -f $nombre, $ayuda) -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Verificando el entorno para Claude Code..." -ForegroundColor Cyan
Write-Host ""

# Sistema operativo: Claude Code pide Windows 10 1809 o superior
$build = [System.Environment]::OSVersion.Version.Build
if ($build -ge 17763) {
    Write-Host ("  [OK]    {0,-22} build {1}" -f "Windows 10 1809+", $build) -ForegroundColor Green; $ok++
} else {
    Write-Host ("  [FALTA] {0,-22} build {1}: actualiza Windows" -f "Windows 10 1809+", $build) -ForegroundColor Red; $fallas++
}

Revisar "Git for Windows"  "git"    "--version" $true  "Instala desde https://git-scm.com/downloads/win"
Revisar "VS Code (code)"   "code"   "--version" $true  "Instala VS Code y marca 'Add to PATH'"
Revisar "Claude Code"      "claude" "--version" $true  "Ejecuta: irm https://claude.ai/install.ps1 | iex  y abre una terminal nueva"
Revisar "Node.js"          "node"   "--version" $false "Opcional en esta sesión"

# Git Bash: Claude Code lo usa como shell si está instalado
$gitBash = "C:\Program Files\Git\bin\bash.exe"
if (Test-Path $gitBash) {
    Write-Host ("  [OK]    {0,-22} {1}" -f "Git Bash", $gitBash) -ForegroundColor Green; $ok++
} else {
    Write-Host ("  [OPC]   {0,-22} No está en la ruta por defecto. Claude Code usará PowerShell." -f "Git Bash") -ForegroundColor Yellow
}

# Ruta de instalación nativa de Claude Code en el PATH del usuario
$rutaClaude = Join-Path $env:USERPROFILE ".local\bin"
if (($env:Path -split ";") -contains $rutaClaude) {
    Write-Host ("  [OK]    {0,-22} {1}" -f "PATH de Claude", $rutaClaude) -ForegroundColor Green; $ok++
} elseif (Test-Path (Join-Path $rutaClaude "claude.exe")) {
    Write-Host ("  [FALTA] {0,-22} claude.exe existe pero {1} no está en el PATH. Cierra y abre la terminal." -f "PATH de Claude", $rutaClaude) -ForegroundColor Red; $fallas++
}

Write-Host ""
if ($fallas -eq 0) {
    Write-Host "Listo: $ok verificaciones correctas. Siguiente paso: ejecuta  claude doctor" -ForegroundColor Green
} else {
    Write-Host "Hay $fallas requisito(s) pendiente(s). Revisa guia-instalacion-windows.md" -ForegroundColor Red
}
Write-Host ""
