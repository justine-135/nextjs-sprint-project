import React from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface IFormItemTextProps<T extends FieldValues = object> {
  form: UseFormReturn<T | undefined | any>;
  name: string;
  label: string;
  placeholder?: string;
  message?: string;
  type?: string;
}

export default function FormItemText<T>({
  form,
  name,
  label,
  placeholder,
  message,
  type = "text",
}: IFormItemTextProps) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || "Enter text here"}
              {...field}
            />
          </FormControl>
          <FormMessage>{message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
