import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { getAllTags } from "@/app/lib/data";
import { ITags } from "@/app/lib/definitions/tab-column";

export const SelectTags = ({
  onTagSelect,
}: {
  onTagSelect: (value: string) => void;
}) => {
  const [tags, setTags] = useState<ITags[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTags();
      if (data) {
        const parsedTags = data?.map(({ id, text, type }) => ({
          id,
          text,
          type,
        }));
        setTags(parsedTags);
      }
    };

    fetchData();
  }, []); // empty dependency array to run only once on component mount

  return (
    <Select onValueChange={onTagSelect} defaultValue="Tag 1">
      <SelectTrigger className="w-auto">Select tag</SelectTrigger>
      <SelectContent>
        <ul>
          {tags?.map(({ id, text, type }) => (
            <li key={id}>
              <SelectItem value={`${id},${text},${type}`}>{text}</SelectItem>
            </li>
          ))}
        </ul>
      </SelectContent>
    </Select>
  );
};
