export interface ITags {
  id: number;
  type: number;
  text: string;
}

export interface ITodos {
  id: number;
  title: string;
  tags: ITags[];
}

export interface ITabColumns {
  id: number;
  title: string;
  todos?: ITodos[] | undefined;
}

export interface SeedTabColumns {
  id: number;
  title: string;
}
