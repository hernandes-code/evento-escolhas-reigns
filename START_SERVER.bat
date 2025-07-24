@echo off
echo 🚀 Iniciando servidor de desenvolvimento...
cd /d "%~dp0"
echo 📁 Diretorio atual: %CD%

echo 📦 Verificando dependencias...
if not exist node_modules (
    echo 🔄 Instalando dependencias...
    npm install
) else (
    echo ✅ Dependencias já instaladas
)

echo 🌐 Iniciando servidor na porta 5173...
echo ✅ Abra seu navegador em: http://localhost:5173
echo 🔧 Pressione Ctrl+C para parar o servidor
echo.
npm run dev

pause
