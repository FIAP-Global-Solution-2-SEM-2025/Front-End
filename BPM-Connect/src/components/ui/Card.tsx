// src/components/ui/Card.tsx - VERSÃO CORRIGIDA
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  onClick?: () => void
}

export const Card = ({ 
  children, 
  className = "", 
  hover = false,
  padding = 'md',
  shadow = 'md',
  border = true,
  onClick
}: CardProps) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const baseStyle = `
    rounded-xl card-consistent /* TROQUEI card-differential por card-consistent */
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${border ? 'border' : ''}
    ${hover ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `

  return (
    <div className={`${baseStyle} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export const CardContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>
}

export const CardFooter = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return <div className={`mt-6 pt-4 border-t ${className}`}>{children}</div>
}