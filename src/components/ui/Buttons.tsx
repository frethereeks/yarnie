import React from "react"

type ButtonVariant = "primary" | "secondary" | "default"

type ButtonProps = {
    className?: string,
    dotted?: boolean,
    children: React.ReactNode,
}

export const ButtonLarge = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<ButtonProps> & { variant?: ButtonVariant }) => {
    return (
        <button className={`text-base md:text-lg leading-loose font-normal ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</button>
    )
}

export const ButtonMedium = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<ButtonProps> & { variant?: ButtonVariant }) => {
    return (
        <button className={`text-sm md:text-base leading-loose font-normal ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</button>
    )
}

export const ButtonSmall = ({ className = "", variant = "primary", children }: React.ButtonHTMLAttributes<ButtonProps> & { variant?: ButtonVariant }) => {
    return (
        <button className={`text-xs md:text-sm leading-loose font-light ${variant === "primary" ? "text-sitetext" : "text-secondary"} ${className}`}>{children}</button>
    )
}