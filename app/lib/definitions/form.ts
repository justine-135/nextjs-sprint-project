export interface CreateForm {
  content: string;
  title: string;
  tagIds?: { todoId: number }[];
  tabId: number | string | null;
}
