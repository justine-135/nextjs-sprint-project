import { ITodos } from "@/app/lib/definitions/tab-column";
import React from "react";
import { Todo } from "./todo";

export const Todos = ({ todos }: { todos?: ITodos[] }) => {
  if (!todos) return null;
  return (
    <ul className="flex flex-col gap-2 mt-small">
      {todos?.map((todo) => {
        return (
          <li key={todo?.id}>
            <Todo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};
