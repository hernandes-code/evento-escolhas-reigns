# 🎮 Evento Escolhas Reigns - Versão Limpa

## 📋 Descrição
Jogo interativo estilo Reigns focado em produção de eventos, com sistema de badges e ofertas personalizadas.

## 🏗️ Estrutura do Projeto

### 📁 Core Files
- `src/App.tsx` - Aplicação principal
- `src/main.tsx` - Entry point
- `src/pages/Index.tsx` - Página inicial

### 🎯 Componentes Principais
- `ReignsGame.tsx` - Componente principal (fluxo simplificado)
- `LandingPageBilheteria.tsx` - Landing page
- `DesafioProdutor.tsx` - Sistema de jogo neural
- `OfertaFinal.tsx` - Finalização do ebook

### � UI Components
- `ui/toaster.tsx` - Sistema de notificações
- `ui/sonner.tsx` - Toasts
- `ui/tooltip.tsx` - Tooltips

### 🎨 Assets
- `assets/hero-events.jpg` - Imagem hero (se usada na landing)
- `assets/logo.png` - Logo (se usada na landing)

## 🚀 Execução

```bash
# Instalação
bun install

# Desenvolvimento
bun run dev

# Build
bun run build

# Limpeza completa
.\FORCE_REBUILD.ps1
```

## 🎯 Fluxo do Jogo
1. **Landing Page** - LandingPageBilheteria
2. **Jogo Neural** - DesafioProdutor (sistema neural)
3. **Oferta Final** - OfertaFinal (ebook)

## 📈 Características
- ✅ Código 100% limpo e otimizado
- ✅ Apenas dependências necessárias
- ✅ Estrutura organizada
- ✅ TypeScript completo
- ✅ UI consistente com Radix UI

## 🧹 Limpeza Realizada
- ❌ Removidos 70+ arquivos desnecessários
- ❌ Sistema de badges completamente removido
- ❌ Jogo de cartas antigo removido
- ❌ Todos os modais desnecessários removidos
- ❌ 40+ componentes UI não utilizados removidos
- ❌ Dependências não utilizadas removidas
- ❌ Assets de badges excluídos
- ❌ Código morto eliminado
- ✅ Apenas 3 componentes principais mantidos
- ✅ Fluxo simplificado: Landing → Neural → Ebook
