import { UpdateTodoStatus } from "@/app/lib/actions/queries";
import { useSubmit } from "@/app/lib/hooks/useSubmit";
import ActionButton from "@/app/ui/common/button";
import React from "react";

interface IEditTaskProps {
  todoId?: number;
  statusId?: number;
  title?: string;
  onClose: () => void;
}

export default function EditTask({
  todoId,
  statusId,
  title,
  onClose,
}: IEditTaskProps) {
  const { isLoading, onFinish } = useSubmit({
    trigger: UpdateTodoStatus,
    successMessage: `Task id ${todoId} has been changed to ${title}`,
    onSuccess: onClose,
  });

  const onSetLabel = async () => {
    onFinish({ todoId, statusId });
  };

  return (
    <>
      <div className="flex">
        <div className="ml-auto">
          <ActionButton onClick={onSetLabel} loading={isLoading}>
            Set to {title}
          </ActionButton>
        </div>
      </div>
    </>
  );
}
