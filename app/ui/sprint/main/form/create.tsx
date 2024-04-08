import { useForm } from "react-hook-form";
import Modal from "../../../common/modal";
import { useModal } from "../../../common/modal/ModalContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { tags } from "@/app/lib/data";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TAG_SEPARATOR } from "@/app/lib/constants";
import { X } from "lucide-react";
import { createTodo } from "@/app/lib/actions";

export const CreateForm = () => {
  const { isVisible, tabId, closeForm } = useModal();
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    const tagIds = selectedTags.map((str) => {
      const [firstCharacter] = str.split(",");
      return Number(firstCharacter);
    });

    const payload = { ...form.getValues(), tagIds, tabId };

    await createTodo(payload);
  };

  return (
    <Modal title="Create todo" visible={isVisible} onClose={closeForm}>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            onSubmit();
            e.preventDefault();
          }}
        >
          <div className="p-2 space-y-2">
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
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-1">
              <ul className="flex gap-1">
                {selectedTags?.map((tag) => {
                  const name = tag.split(TAG_SEPARATOR)[1];
                  return (
                    <li key={tag}>
                      <Badge className="flex gap-1 items-center">
                        {name} <X onClick={() => onTagRemove(tag)} size={13} />
                      </Badge>
                    </li>
                  );
                })}
              </ul>
              <Select onValueChange={onTagSelect} defaultValue="Tag 1">
                <SelectTrigger className="w-auto">Select tag</SelectTrigger>
                <SelectContent>
                  <ul>
                    {tags?.map((tag) => {
                      return (
                        <li key={tag?.id}>
                          <SelectItem
                            value={`${tag?.id},${tag?.title},${tag?.type}`}
                          >
                            {tag?.title}
                          </SelectItem>
                        </li>
                      );
                    })}
                  </ul>
                </SelectContent>
              </Select>
            </div>
          </div>
          <hr />
          <div className="flex p-2">
            <div className="ml-auto">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
