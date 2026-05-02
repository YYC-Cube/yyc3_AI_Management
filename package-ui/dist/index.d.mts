export { Tokens, tokens } from './tokens.mjs';
export { Button, ButtonProps, buttonVariants } from './button.mjs';
export { Input, InputProps, inputVariants } from './input.mjs';
export { Badge, BadgeProps, badgeVariants } from './badge.mjs';
export { Card, CardContent, CardContentProps, CardDescription, CardDescriptionProps, CardFooter, CardFooterProps, CardHeader, CardHeaderProps, CardProps, CardTitle, CardTitleProps } from './card.mjs';
export { Table, TableBody, TableBodyProps, TableCell, TableCellProps, TableHead, TableHeadProps, TableHeader, TableHeaderProps, TableProps, TableRow, TableRowProps } from './table.mjs';
export { Form, FormControl, FormControlProps, FormDescription, FormDescriptionProps, FormField, FormFieldProps, FormItem, FormItemProps, FormLabel, FormLabelProps, FormMessage, FormMessageProps, FormProps } from './form.mjs';
import { ClassValue } from 'clsx';
import 'class-variance-authority/types';
import 'react';
import 'class-variance-authority';

declare function cn(...inputs: ClassValue[]): string;

declare function createVariant(base: string, variants: Record<string, Record<string, string>>): (variant?: string, variantValue?: string) => string;

declare const version = "2.0.0";

export { cn, createVariant, version };
