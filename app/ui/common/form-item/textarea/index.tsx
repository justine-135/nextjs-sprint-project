import React from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface IFormItemTextAreaProps<T extends FieldValues = object> {
  form: UseFormReturn<T | undefined | any>;
  name: string;
  label: string;
  placeholder?: string;
  message?: string;
  type?: string;
}

export default function FormItemTextArea<T>({
  form,
  name,
  label,
  placeholder,
  message,
  type = "text",
}: IFormItemTextAreaProps) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder || "Enter textarea message"}
              // className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage>{message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
