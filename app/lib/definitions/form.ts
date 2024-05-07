export interface ICreateTodoForm {
  content?: string;
  title?: string;
  tagIds?: { todoId: number }[];
  tabId: number | string | null;
}
