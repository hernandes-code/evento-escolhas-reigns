import React from "react"

// Hook simplificado para toast
export const useToast = () => {
  return {
    toast: (options: any) => {
      console.log("Toast:", options.title || options.description)
    },
    toasts: []
  }
}
