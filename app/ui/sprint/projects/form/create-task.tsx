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
import { TAG_SEPARATOR } from "@/app/constants/utils";
import useLoading from "@/app/lib/hooks/useLoading";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import ActionButton from "@/app/ui/common/button";
import FormItemText from "@/app/ui/common/form-item/input";
import FormItemTextArea from "@/app/ui/common/form-item/textarea";
import { TagBg, TagText } from "@/app/constants/tags";
import { TagsValue } from "@/app/enums/tags";
import { useSubmit } from "@/app/lib/hooks/useSubmit";

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

  const { isLoading, onFinish } = useSubmit({
    trigger: CreateTodo,
    successMessage: `New task has been created successfully.`,
    onSuccess: handleCloseDialog,
  });

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
    const payload = {
      ...form.getValues(),
      tagIds: selectedTags || [],
      tabId,
      project_id: projectId,
    };

    onFinish(payload);
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
                {selectedTags?.map((value, key) => {
                  return (
                    <li key={key}>
                      <Badge
                        className={`flex gap-1 items-center ${
                          TagBg[value as unknown as TagsValue]
                        }`}
                        variant="outline"
                      >
                        {TagText[value as unknown as TagsValue]}
                        <X onClick={() => onTagRemove(value)} size={13} />
                      </Badge>
                    </li>
                  );
                })}
              </ul>
              <SelectTags onTagSelect={onTagSelect} />
            </div>
          </div>
          <div className="flex mt-2">
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
