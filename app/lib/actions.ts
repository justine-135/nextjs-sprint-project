"use server";

import { sql } from "@vercel/postgres";
import { CreateForm } from "./definitions/form";
import { revalidatePath } from "next/cache";

async function initTab() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // Create the "users" table if it doesn't exist
  const createTable = await sql`
      CREATE TABLE IF NOT EXISTS tab_columns (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;

  console.log(`Created "tab_columns" table`);

  const initTableName = "Backlog";

  // Insert data into the "users" table
  const insertTabColumns = await sql`
        INSERT INTO tab_columns (title)
        VALUES (${initTableName})
        ON CONFLICT (id) DO NOTHING;
      `;

  return insertTabColumns.rows[0].id;
}

export async function createTodo(payload: CreateForm) {
  const { title, content, tabId, tagIds } = payload;

  let todoInserted = false;
  let tagsInserted = false;

  try {
    const insertTodoQuery = await sql`
      INSERT INTO todos (tab_id, title, content)
      VALUES (${tabId}, ${title}, ${content})
      RETURNING *;
    `;

    const returnedTodoId = insertTodoQuery.rows[0].id;

    todoInserted = true;

    if (tagIds && tagIds.length > 0) {
      const insertTodoTagQuery = await Promise.all(
        tagIds.map(async (tagId) => {
          await sql`
            INSERT INTO todo_tag (todo_id, tag_id)
            VALUES (${returnedTodoId}, ${tagId.todoId})
            RETURNING *;
          `;
        })
      );
      tagsInserted = true;
    }

    revalidatePath("/sprint");
  } catch (error) {
    // Check if both todo and tags are inserted successfully
    console.error("Error inserting data:", error); // Log error
    return {
      message: "Failed.",
      type: 0,
    };
  }

  if (todoInserted && tagsInserted) {
    return {
      message: "Both todo and tags inserted successfully.",
      type: 1,
    };
  } else if (todoInserted && !tagsInserted) {
    return {
      message: "Todo inserted successfully, but tags insertion failed.",
      type: 2,
    };
  } else {
    return {
      message: "Failed.",
      type: 0,
    };
  }
}
