import { DeleteTodo } from "@/app/lib/actions/queries";
import useLoading from "@/app/lib/hooks/useLoading";
import ActionButton from "@/app/ui/common/button";
import { toast } from "@/components/ui/use-toast";
import React from "react";

interface IDeleteTaskProps {
  id: number;
  onClose: () => void;
}

export default function DeleteTask({ id, onClose }: IDeleteTaskProps) {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const onDelete = async () => {
    if (!id) return null;

    startLoading();

    try {
      const res = await DeleteTodo(id);
      if (res.success)
        toast({
          title: "Task has been deleted",
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Your request is not submitted.",
      });
    } finally {
      onClose();
      stopLoading();
    }
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
