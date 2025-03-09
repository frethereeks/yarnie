import React from 'react'

type TypoVariant = "primary" | "secondary"
type TypographyProps = {
  className?: string,
  children: React.ReactNode,
  variant?: TypoVariant
}

export const Header1 = ({ className = "", dotted = false, variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <h1 className={`relative font-eugusto ${dotted ? 'before:absolute before:h-4 before:w-4 before:bg-secondary before:left-0 before:top-1/2 before:-translate-y-1/2 pl-6' : ''} text-4xl md:text-5xl leading-tight font-bold ${variant === "primary" ? "text-dark" : "text-secondary"} ${className}`}>{children}</h1>
  )
}

export const Header2 = ({ className = "", dotted = false, variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <h2 className={`relative font-eugusto ${dotted ? 'before:absolute before:h-4 before:w-4 before:bg-secondary before:left-0 before:top-1/2 before:-translate-y-1/2 pl-6' : ''} text-3xl md:text-4xl leading-snug font-bold ${variant === "primary" ? "text-dark" : "text-secondary"} ${className}`}>{children}</h2>
  )
}

export const Header3 = ({ className = "", dotted = false, variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <h3 className={`relative font-eugusto ${dotted ? 'before:absolute before:h-4 before:w-4 before:bg-secondary before:left-0 before:top-1/2 before:-translate-y-1/2 pl-6' : ''} text-2xl md:text-3xl leading-tight font-bold ${variant === "primary" ? "text-dark" : "text-secondary"} ${className}`}>{children}</h3>
  )
}

export const Header4 = ({ className = "", dotted = false, variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <h4 className={`relative font-eugusto ${dotted ? 'before:absolute before:h-4 before:w-4 before:bg-secondary before:left-0 before:top-1/2 before:-translate-y-1/2 pl-6' : ''} text-xl md:text-2xl leading-snug font-semibold ${variant === "primary" ? "text-dark" : "text-secondary"} ${className}`}>{children}</h4>
  )
}

export const Header5 = ({ className = "", dotted = false, variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <h5 className={`relative font-eugusto ${dotted ? 'before:absolute before:h-4 before:w-4 before:bg-secondary before:left-0 before:top-1/2 before:-translate-y-1/2 pl-6' : ''} text-lg md:text-xl leading-tight font-medium ${variant === "primary" ? "text-dark" : "text-secondary"} ${className}`}>{children}</h5>
  )
}

export const Para1 = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <p className={`text-base md:text-lg leading-loose font-medium ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</p>
  )
}

export const Para1Light = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <p className={`text-base md:text-lg leading-loose font-medium ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</p>
  )
}

export const Para2 = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <p className={`text-sm md:text-base leading-loose font-normal ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</p>
  )
}

export const Para3 = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<TypographyProps> & { variant?: TypoVariant, dotted?: boolean, }) => {
  return (
    <p className={`text-sm md:text-base leading-loose font-light ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</p>
  )
}

export const ParaSmall = ({ className = "", variant = "primary", children }: TypographyProps) => {
  return (
    <p className={`text-xs md:text-sm leading-loose font-normal ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</p>
  )
}

export const ParaSmallLight = ({ className = "", variant = "primary", children }: TypographyProps) => {
  return (
    <p className={`text-xs md:text-sm leading-loose font-light ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</p>
  )
}