# Script para rebuild completo do projeto
Write-Host "🔄 Limpando cache e dependências..." -ForegroundColor Yellow

# Para node_modules e cache
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ node_modules removido" -ForegroundColor Green
}

if (Test-Path ".bun") {
    Remove-Item -Recurse -Force ".bun"
    Write-Host "✅ Cache .bun removido" -ForegroundColor Green
}

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
bun install

# Iniciar servidor
Write-Host "🚀 Iniciando servidor em modo desenvolvimento..." -ForegroundColor Green
bun run dev
