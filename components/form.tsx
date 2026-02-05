'use client';

import * as React from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Loader2, Upload, X } from 'lucide-react';

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

interface FileFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  accept?: string;
  required?: boolean;
}

function FileField<T extends FieldValues>({
  name,
  label,
  accept = 'image/*',
  required = false,
}: FileFieldProps<T>) {
  const { form } = useFormContext<T>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      form.setValue(name, files as never, { shouldValidate: true });
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClear = () => {
    form.setValue(name, undefined as never, { shouldValidate: true });
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ fieldState }) => (
        <Field className="gap-1">
          {label && (
            <FieldLabel htmlFor={name}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FieldLabel>
          )}
          <div className="flex items-center gap-3">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => inputRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <input
              ref={inputRef}
              id={name}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
            {!preview && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                Choose File
              </Button>
            )}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

interface VideoDropzoneProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  accept?: string;
  required?: boolean;
  placeholder?: string;
}

function VideoDropzone<T extends FieldValues>({
  name,
  label,
  accept = 'video/*',
  required = false,
  placeholder = 'Click to select a video file',
}: VideoDropzoneProps<T>) {
  const { form } = useFormContext<T>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      form.setValue(name, files as never, { shouldValidate: true });
      setFileName(files[0].name);
    }
  };

  const handleClear = () => {
    form.setValue(name, undefined as never, { shouldValidate: true });
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ fieldState }) => (
        <Field className="gap-1">
          {label && (
            <FieldLabel htmlFor={name}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FieldLabel>
          )}
          <div
            onClick={() => !fileName && inputRef.current?.click()}
            className={`
              relative flex flex-col items-center justify-center 
              w-full h-32 border-2 border-dashed rounded-lg
              transition-colors cursor-pointer
              ${
                fileName
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            {fileName ? (
              <div className="flex flex-col items-center gap-2 px-4">
                <div className="flex items-center gap-2 text-primary">
                  <Upload className="w-5 h-5" />
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {fileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="w-8 h-8" />
                <span className="text-sm">{placeholder}</span>
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            id={name}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
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
  FileField,
  VideoDropzone,
};
