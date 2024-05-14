import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ActionButton from "@/app/ui/common/button";
import { useForm, UseFormReturn } from "react-hook-form";
import FormItemText from "@/app/ui/common/form-item/input";
import FormItemTextArea from "@/app/ui/common/form-item/textarea";

interface IFormParams {
  name: string;
  description: string;
}

export default function CreateProjectForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: IFormParams) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormItemText
              form={form}
              name="name"
              label="Project name"
              placeholder="Name your project"
            />
            <FormItemTextArea
              form={form}
              name="description"
              label="Description"
              placeholder="Tell us a little bit about this project"
            />
          </div>
          <div className="flex mt-4">
            <div className="ml-auto">
              <ActionButton type="submit">Add</ActionButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
