export interface ICreateTodoForm {
  project_id: string;
  content?: string;
  title?: string;
  tagIds?: string[];
  tabId?: number | string | null;
}
