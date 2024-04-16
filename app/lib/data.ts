"use server";

import { sql } from "@vercel/postgres";
import { ITabColumns, ITags, ITodos } from "./definitions/tab-column";

export async function getTabColumns() {
  try {
    const data = await sql<ITabColumns>`SELECT * FROM tab_columns;`;

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

export async function getTodos() {
  try {
    const data = await sql<ITodos>`
    SELECT 
    tab_columns.id,
    tab_columns.title,
    json_agg(
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
      ) AS todos
    FROM tab_columns
    LEFT JOIN todos ON tab_columns.id = todos.tab_id
    GROUP BY tab_columns.id;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET todos", error);
    return [
      {
        id: 1,
        title: "Backlog",
        todos: [],
      },
    ];
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
