import { DeleteTodo } from "@/app/lib/actions/queries";
import useLoading from "@/app/lib/hooks/useLoading";
import { useSubmit } from "@/app/lib/hooks/useSubmit";
import ActionButton from "@/app/ui/common/button";
import { toast } from "@/components/ui/use-toast";
import React from "react";

interface IDeleteTaskProps {
  id: number;
  onClose: () => void;
}

export default function DeleteTask({ id, onClose }: IDeleteTaskProps) {
  const { isLoading, onFinish } = useSubmit({
    trigger: DeleteTodo,
    successMessage: `Task has been deleted.`,
    onSuccess: onClose,
  });

  const onDelete = async () => {
    onFinish({ id });
  };

  return (
    <div className="flex">
      <div className="ml-auto">
        <ActionButton onClick={onDelete} loading={isLoading}>
          Delete
        </ActionButton>
      </div>
    </div>
  );
}
