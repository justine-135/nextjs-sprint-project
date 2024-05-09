export interface ICreateTodoForm {
  project_id: string;
  content?: string;
  title?: string;
  tagIds?: { todoId: number }[];
  tabId?: number | string | null;
}
