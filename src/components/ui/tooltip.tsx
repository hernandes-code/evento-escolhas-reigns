import React from "react"

// Componentes Tooltip simplificados
const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
