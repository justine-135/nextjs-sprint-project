export interface CreateForm {
  content: string;
  title: string;
  tagIds: number[];
  tabId: number | string | null;
}
