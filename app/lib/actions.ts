"use server";

import { sql } from "@vercel/postgres";
import { CreateForm } from "./definitions/form";

export async function createTodo(payload: CreateForm) {
  const { title, content, tabId, tagIds } = payload;
  try {
    const insertTodoQuery = await sql`
      INSERT INTO todos (tab_id, title, content)
      VALUES (${tabId}, ${title}, ${content})
      RETURNING *;
    `;

    const returnedTodoId = insertTodoQuery.rows[0].id;

    if (tagIds && tagIds.length > 0) {
      await Promise.all(
        tagIds.map(async (tagId) => {
          await sql`
            INSERT INTO todo_tag (todo_id, tag_id)
            VALUES (${returnedTodoId}, ${tagId.todoId})
            RETURNING *;
          `;
        })
      );
    }
  } catch (error) {
    console.error("Error inserting data:", error); // Log error
  }
}
