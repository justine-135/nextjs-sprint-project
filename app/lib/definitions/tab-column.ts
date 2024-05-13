import { QueryResultRow } from "pg";

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
