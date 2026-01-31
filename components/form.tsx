'use client';

import * as React from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';

interface FormContextValue<T extends FieldValues> {
  form: UseFormReturn<T>;
  formId: string;
  onSubmit: (data: T) => void;
}

const FormContext = React.createContext<FormContextValue<FieldValues> | null>(
  null
);

function useFormContext<T extends FieldValues>() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form.Root');
  }
  return context as FormContextValue<T>;
}

interface RootProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formId: string;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
  className?: string;
}

function Root<T extends FieldValues>({
  form,
  formId,
  onSubmit,
  children,
  className = 'w-full sm:max-w-md',
}: RootProps<T>) {
  return (
    <FormContext.Provider
      value={{ form, formId, onSubmit } as FormContextValue<FieldValues>}
    >
      <Card className={className}>{children}</Card>
    </FormContext.Provider>
  );
}

interface HeaderProps {
  title: string;
  description: string;
}

function Header({ title, description }: HeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
}

interface ContentProps {
  className?: string;
  children: React.ReactNode;
}

function Content({ children, className }: ContentProps) {
  const { form, formId, onSubmit } = useFormContext();

  return (
    <CardContent className={className}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        {children}
      </form>
    </CardContent>
  );
}

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
}

function TextField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
}: TextFieldProps<T>) {
  const { form } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className="gap-1">
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <Input
            {...field}
            id={name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function TextAreaField<T extends FieldValues>({
  name,
  label,
  placeholder,
}: TextFieldProps<T>) {
  const { form } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className="gap-1">
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <Textarea
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

function Footer({ children, className = 'flex flex-col gap-2' }: FooterProps) {
  return <CardFooter className={className}>{children}</CardFooter>;
}

interface SubmitButtonProps {
  loadingText: string;
  children: React.ReactNode;
}

function SubmitButton({ loadingText, children, ...props }: SubmitButtonProps) {
  const { form, formId } = useFormContext();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Field>
      <Button
        type="submit"
        form={formId}
        className="w-full disabled:opacity-50 rounded-full px-4"
        disabled={isSubmitting}
        {...props}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    </Field>
  );
}

interface FooterLinkProps {
  text: string;
  linkText: string;
  onClick?: () => void;
}

function FooterLink({ text, linkText, onClick }: FooterLinkProps) {
  return (
    <div>
      {text}{' '}
      <Button
        variant="link"
        className="text-blue-600 px-1 hover:underline hover:cursor-pointer"
        onClick={onClick}
      >
        {linkText}
      </Button>
    </div>
  );
}

export const Form = {
  Root,
  Header,
  Content,
  TextField,
  Footer,
  SubmitButton,
  FooterLink,
  TextAreaField,
};
