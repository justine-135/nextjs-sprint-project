import React from "react";
import { Form } from "@/components/ui/form";
import ActionButton from "@/app/ui/common/button";
import { useForm, UseFormReturn } from "react-hook-form";
import FormItemText from "@/app/ui/common/form-item/input";
import FormItemTextArea from "@/app/ui/common/form-item/textarea";
import { CreateProject } from "@/app/lib/actions/queries";
import { useSubmit } from "@/app/lib/hooks/useSubmit";

interface ICreateProjectFormProps {
  handleCloseDialog: () => void;
}

interface IFormParams {
  name: string;
  description: string;
}

export default function CreateProjectForm({
  handleCloseDialog,
}: ICreateProjectFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isLoading, onFinish } = useSubmit({
    trigger: CreateProject,
    successMessage: `New project has been created successfully.`,
    onSuccess: handleCloseDialog,
  });

  const onSubmit = (data: IFormParams) => {
    onFinish(data);
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
              <ActionButton type="submit" loading={isLoading}>
                Create
              </ActionButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
