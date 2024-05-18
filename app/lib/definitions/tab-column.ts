export interface ITags {
  id: number;
  value: number;
}

export interface ITodos {
  id: number;
  title: string;
  content: string;
  tags: ITags[];
}

export interface ITabData {
  id: number;
  title: string;
  todos?: ITodos[] | undefined;
  name: string;
  project_id: string;
}

export interface ITabProjectData {
  name: string;
  id: string;
}

export interface ITodosResponse {
  result: ITabData[];
  project: ITabProjectData;
}

export interface SeedTabColumns {
  id: number;
  title: string;
}

export interface ITabLabelsData {
  id: number;
  title: string;
  project_id: string;
}

export interface ITabLabelsResponse {
  result: ITabLabelsData[];
}
