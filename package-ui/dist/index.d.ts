export { Tokens, tokens } from './tokens.js';
export { Button, ButtonProps, buttonVariants } from './button.js';
export { Input, InputProps, inputVariants } from './input.js';
export { Badge, BadgeProps, badgeVariants } from './badge.js';
export { Card, CardContent, CardContentProps, CardDescription, CardDescriptionProps, CardFooter, CardFooterProps, CardHeader, CardHeaderProps, CardProps, CardTitle, CardTitleProps } from './card.js';
export { Table, TableBody, TableBodyProps, TableCell, TableCellProps, TableHead, TableHeadProps, TableHeader, TableHeaderProps, TableProps, TableRow, TableRowProps } from './table.js';
export { Form, FormControl, FormControlProps, FormDescription, FormDescriptionProps, FormField, FormFieldProps, FormItem, FormItemProps, FormLabel, FormLabelProps, FormMessage, FormMessageProps, FormProps } from './form.js';
import { ClassValue } from 'clsx';
import 'class-variance-authority/types';
import 'react';
import 'class-variance-authority';

declare function cn(...inputs: ClassValue[]): string;

declare function createVariant(base: string, variants: Record<string, Record<string, string>>): (variant?: string, variantValue?: string) => string;

declare const version = "2.0.0";

export { cn, createVariant, version };
