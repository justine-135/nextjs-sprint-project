import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "@/app/ui/common/button";
import useLoading from "@/app/lib/hooks/useLoading";
import { CreateTab } from "@/app/lib/actions/queries";
import { useToast } from "@/components/ui/use-toast";
import FormItemText from "@/app/ui/common/form-item/input";

interface ICreateTabForm {
  id?: string;
  onClose: () => void;
}

export default function CreateTabForm({ id, onClose }: ICreateTabForm) {
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      project_id: id,
    },
  });

  const { isLoading, startLoading, stopLoading } = useLoading();

  const onSubmit = async () => {
    startLoading();

    console.log(form.getValues());

    const payload = form.getValues();

    CreateTab(payload)
      .then((success) => {
        form.reset();
        if (success)
          toast({
            title: "Tab created!",
            description: "New tab has been created successfully.",
          });
      })
      .catch((error) => {
        if (error)
          toast({
            variant: "destructive",
            title: "Something went wrong!",
            description: "Your tab is not created.",
          });
      })
      .finally(() => {
        stopLoading();
        onClose();
      });
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
