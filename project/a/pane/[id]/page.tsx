// import { getTodo, getTodos } from "@/app/lib/data";
// import { Pane } from "@/app/ui/common/pane";
// import { TabColumns } from "@/app/ui/common/tab-columns";
// import { EditForm } from "@/app/ui/sprint/main/pane/form/edit";

// export default async function PaneTodo({ params }: { params: { id: string } }) {
//   const todosData = await getTodos();
//   const { id } = params;
//   const todoData = await getTodo(Number(id) as number);

//   return (
//     <section className="mt-small overflow-auto">
//       <TabColumns data={todosData} />
//       <Pane title={todoData?.title} id={todoData?.id}>
//         <EditForm data={todoData} />
//       </Pane>
//     </section>
//   );
// }
