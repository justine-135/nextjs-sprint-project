import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "@/app/ui/common/button";
import { CreateTab } from "@/app/lib/actions/queries";
import FormItemText from "@/app/ui/common/form-item/input";
import { useSubmit } from "@/app/lib/hooks/useSubmit";

interface ICreateTabForm {
  id?: string;
  onClose: () => void;
}

export default function CreateTabForm({ id, onClose }: ICreateTabForm) {
  const form = useForm({
    defaultValues: {
      title: "",
      project_id: id,
    },
  });

  const { isLoading, onFinish } = useSubmit({
    trigger: CreateTab,
    successMessage: `New tab has been created successfully.`,
    onSuccess: onClose,
  });

  const onSubmit = async () => {
    const payload = form.getValues();
    onFinish(payload);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            onSubmit();
            e.preventDefault();
          }}
        >
          <div className="space-y-2">
            <FormItemText
              form={form}
              name="title"
              label="Tab title"
              placeholder="Enter tab name"
            />
          </div>
          <div className="flex mt-4">
            <div className="ml-auto">
              <ActionButton type="submit" loading={isLoading}>
                Add
              </ActionButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
