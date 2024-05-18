import useLoading from "@/app/lib/hooks/useLoading";
import ActionButton from "@/app/ui/common/button";
import { Select } from "@/components/ui/select";
import React from "react";

interface IEditTaskProps {
  id: number;
  projectId: string;
  onClose: () => void;
}

export default function EditTask({ id, projectId, onClose }: IEditTaskProps) {
  const { isLoading } = useLoading();

  return (
    <>
      <div>
        <Select></Select>
      </div>
      <div className="flex">
        <div className="ml-auto">
          <ActionButton onClick={onClose} loading={isLoading}>
            Edit
          </ActionButton>
        </div>
      </div>
    </>
  );
}
