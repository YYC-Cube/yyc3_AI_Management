import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    removable?: boolean;
    onRemove?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const badgeVariants: (props?: ({
    variant?: "default" | "success" | "destructive" | "outline" | "secondary" | "warning" | "danger" | "info" | "purple" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>;

export { Badge, type BadgeProps, badgeVariants };
