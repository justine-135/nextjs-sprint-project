import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { TagsValue } from "@/app/enums/tags";
import { TagText, TagBg } from "@/app/constants/tags";

export const SelectTags = ({
  onTagSelect,
}: {
  onTagSelect: (value: string) => void;
}) => {
  const tags = Object.keys(TagText);

  return (
    <Select onValueChange={onTagSelect}>
      <SelectTrigger className="w-auto h-[22px]">Select tag</SelectTrigger>
      <SelectContent>
        <ul>
          {tags?.map((value) => (
            <li key={value}>
              <SelectItem
                value={value}
                textValue={TagText[value as unknown as TagsValue]}
              >
                {TagText[value as unknown as TagsValue]}
              </SelectItem>
            </li>
          ))}
        </ul>
      </SelectContent>
    </Select>
  );
};
