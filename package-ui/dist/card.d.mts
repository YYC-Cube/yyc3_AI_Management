import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
}
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<CardDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;

export { Card, CardContent, type CardContentProps, CardDescription, type CardDescriptionProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, CardTitle, type CardTitleProps };
