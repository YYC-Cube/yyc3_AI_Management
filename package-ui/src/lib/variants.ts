import { cn } from "./utils"

export function createVariant(base: string, variants: Record<string, Record<string, string>>) {
  return (variant?: string, variantValue?: string) => {
    if (!variant || !variantValue) return base
    const variantClasses = variants[variant]?.[variantValue]
    return cn(base, variantClasses)
  }
}
