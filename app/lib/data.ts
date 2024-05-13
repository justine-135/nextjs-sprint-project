"use server";

import { sql } from "@vercel/postgres";
import {
  ITabData,
  ITabProjectData,
  ITags,
  ITodos,
  ITodosResponse,
} from "./definitions/tab-column";
import { IProjects } from "./definitions/projects";

export async function GetProjects() {
  try {
    const data = await sql<IProjects>`SELECT * FROM projects;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET projects", error);
  }
}

export async function getTabColumns() {
  try {
    const data = await sql<ITabData[]>`SELECT * FROM tab_columns;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET tab_columns", error);
  }
}

export async function getTags(id: number) {
  try {
    const data = await sql<ITags>`SELECT * FROM tags WHERE id = ${id};`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error: GET todos", error);
  }
}

export async function getAllTags() {
  try {
    const data = await sql<ITags>`SELECT * FROM tags;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET todos", error);
  }
}

export async function getTodos(
  id: string
): Promise<ITodosResponse | undefined> {
  try {
    const data = await sql<ITabData>`
    SELECT 
    tab_columns.id,
    tab_columns.title,
    COALESCE(json_agg(
        json_build_object(
            'id', todos.id,
            'title', todos.title,
            'content', todos.content,
            'tags', (
                SELECT json_agg(
                    json_build_object(
                        'id', tags.id,
                        'type', tags.type,
                        'text', tags.text
                    )
                ) 
                FROM todo_tag
                LEFT JOIN tags ON todo_tag.tag_id = tags.id
                WHERE todo_tag.todo_id = todos.id
            )
        ) ORDER BY todos.id ASC
    ), '[]'::json) AS todos,
    projects.id AS project_id, -- referring to the id of projects
    projects.name -- Selecting the project name
FROM tab_columns
LEFT JOIN projects ON tab_columns.project_id = projects.id -- Joining projects table
LEFT JOIN todos ON tab_columns.id = todos.tab_id AND todos.project_id = projects.id -- Joining todos table
WHERE projects.id = ${id}
GROUP BY tab_columns.id, tab_columns.title, projects.id, projects.name; -- Grouping by projects.id and projects.name
    `;

    const title = await sql<ITabProjectData>`
    SELECT name, id FROM projects WHERE id = ${id};
    `;

    return {
      result: data.rows,
      project: title.rows[0],
    };
    // return data.rows;
  } catch (error) {
    console.error("Database Error: GET todos", error);
  }
}
export async function getTodo(id: number) {
  try {
    const data = await sql<ITodos>`
    SELECT 
      todos.id,
      todos.tab_id,
      todos.title,
      todos.content,
      json_agg(
          json_build_object(
              'id', tags.id,
              'type', tags.type,
              'text', tags.text
          )
      ) AS tags
    FROM todos 
    LEFT JOIN todo_tag ON todos.id = todo_tag.todo_id
    LEFT JOIN tags ON todo_tag.tag_id = tags.id
    WHERE todos.id = ${id}
    GROUP BY todos.id, todos.tab_id, todos.title, todos.content;
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error: GET todo", error);
  }
}
