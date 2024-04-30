import { getTodo, getTodos } from "@/app/lib/data";
import TodoDetail from "@/app/ui/sprint/main/detail";

export default async function PageTodo({ params }: { params: { id: string } }) {
  const { id } = params;
  const todoData = await getTodo(Number(id) as number);

  return <TodoDetail data={todoData} />;
}
