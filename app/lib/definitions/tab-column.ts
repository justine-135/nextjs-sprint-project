export interface ITags {
  id: number;
  type: number;
  text: string;
}

export interface ITodos {
  id: number;
  title: string;
  content: string;
  tags: ITags[];
}

export interface ITabColumns {
  id: number;
  title: string;
  todos?: ITodos[] | undefined;
  name: string;
  project_id: string;
}

export interface SeedTabColumns {
  id: number;
  title: string;
}
