import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ActionButton from "@/app/ui/common/button";
import useLoading from "@/app/lib/hooks/useLoading";
import { CreateTab } from "@/app/lib/actions/queries";
import { useToast } from "@/components/ui/use-toast";

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
            title: "Task created!",
            description: "New task has been created successfully.",
          });
      })
      .catch((error) => {
        if (error)
          toast({
            variant: "destructive",
            title: "Something went wrong!",
            description: "Your task is not created.",
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
