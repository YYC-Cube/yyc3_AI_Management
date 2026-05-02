// Design Tokens
export * from "./design-tokens/tokens"

// Atoms (原子组件)
export { Button, buttonVariants } from "./components/Button/Button"
export type { ButtonProps } from "./components/Button/Button"

export { Input, inputVariants } from "./components/Input/Input"
export type { InputProps } from "./components/Input/Input"

export { Badge, badgeVariants } from "./components/Badge/Badge"
export type { BadgeProps } from "./components/Badge/Badge"

// Molecules (分子组件) - v2.0 新增
export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./components/Card/Card"
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps, CardTitleProps, CardDescriptionProps } from "./components/Card/Card"

// Organisms (有机体组件) - v2.0 新增
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./components/Table/Table"
export type { TableProps, TableHeaderProps, TableBodyProps, TableRowProps, TableHeadProps, TableCellProps } from "./components/Table/Table"

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "./components/Form/Form"
export type { FormProps, FormFieldProps, FormItemProps, FormLabelProps, FormControlProps, FormMessageProps, FormDescriptionProps } from "./components/Form/Form"

// Utils
export { cn } from "./lib/utils"
export { createVariant } from "./lib/variants"

// Version
export const version = "2.0.0"
