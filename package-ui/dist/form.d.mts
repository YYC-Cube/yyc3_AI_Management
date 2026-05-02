import * as React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
}
declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<HTMLDivElement>>;
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
}
declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps & React.RefAttributes<HTMLLabelElement>>;
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const FormControl: React.ForwardRefExoticComponent<FormControlProps & React.RefAttributes<HTMLDivElement>>;
interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const FormDescription: React.ForwardRefExoticComponent<FormDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: "default" | "destructive";
}
declare const FormMessage: React.ForwardRefExoticComponent<FormMessageProps & React.RefAttributes<HTMLParagraphElement>>;
interface FormFieldContextValue {
    name: string;
}
declare const FormFieldContext: React.Context<FormFieldContextValue>;
declare const useFormField: () => FormFieldContextValue;
interface FormFieldProps {
    name: string;
    children: React.ReactNode;
}
declare const FormField: React.FC<FormFieldProps>;

export { Form, FormControl, type FormControlProps, FormDescription, type FormDescriptionProps, FormField, FormFieldContext, type FormFieldContextValue, type FormFieldProps, FormItem, type FormItemProps, FormLabel, type FormLabelProps, FormMessage, type FormMessageProps, type FormProps, useFormField };
