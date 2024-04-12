export interface ITags {
  id: number;
  type: number;
  text: string;
}

export interface ITodoTags {
  id: number;
  todo_id: number;
  tag_id: number;
}

export interface ITodos {
  id: number;
  title: string;
  tags: ITags[];
}

export interface ITabColumns {
  id: number;
  title: string;
  todos?: ITodos[];
  count: number;
}

export interface SeedTabColumns {
  id: number;
  title: string;
}
