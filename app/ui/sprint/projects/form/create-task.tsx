"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SelectTags } from "./select-tags";
import { CreateTodo } from "@/app/lib/actions/queries";
import { TAG_SEPARATOR } from "@/app/lib/constants/utils";
import useLoading from "@/app/lib/hooks/useLoading";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import ActionButton from "@/app/ui/common/button";
import FormItemText from "@/app/ui/common/form-item/input";
import FormItemTextArea from "@/app/ui/common/form-item/textarea";

interface ICreateTaskForm {
  tabId?: number;
  handleCloseDialog?: () => void;
}

export const CreateTaskForm = ({
  tabId,
  handleCloseDialog,
}: ICreateTaskForm) => {
  const router = usePathname();

  const lastSlashIndex = router.lastIndexOf("/");
  const projectId = router.substring(lastSlashIndex + 1);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { toast } = useToast();

  const onTagSelect = (value: string) => {
    // Check if the value already exists in the array
    if (!selectedTags.includes(value)) {
      setSelectedTags((prev) => [...prev, value]);
    }
  };

  const onTagRemove = (value: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== String(value)));
  };

  const onSubmit = async () => {
    startLoading();

    const tagIds = selectedTags.map((str) => {
      const [firstCharacter] = str.split(",");
      const data = firstCharacter;
      return {
        todoId: Number(data),
      };
    });

    const payload = {
      ...form.getValues(),
      tagIds: tagIds || [],
      tabId,
      project_id: projectId,
    };

    CreateTodo(payload)
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
        if (!isLoading) handleCloseDialog?.();
      });
  };

  return (
    <>
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
              label="Task name"
              placeholder="Enter task name"
            />
            <FormItemTextArea
              form={form}
              name="content"
              label="Add content"
              placeholder="Tell us more information about this task"
            />
            <div className="flex gap-1">
              <ul className="flex gap-1">
                {selectedTags?.map((tag, key) => {
                  const name = tag.split(TAG_SEPARATOR)[1];
                  return (
                    <li key={key}>
                      <Badge className="flex gap-1 items-center">
                        {name} <X onClick={() => onTagRemove(tag)} size={13} />
                      </Badge>
                    </li>
                  );
                })}
              </ul>
              <SelectTags onTagSelect={onTagSelect} />
            </div>
          </div>
          <div className="flex">
            <div className="ml-auto">
              <ActionButton type="submit" loading={isLoading}>
                Add
              </ActionButton>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
