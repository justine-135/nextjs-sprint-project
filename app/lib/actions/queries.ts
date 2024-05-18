"use server";

import { sql } from "@vercel/postgres";
import { ICreateTodoForm } from "../definitions/form";
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

export async function CreateTodo(payload: ICreateTodoForm) {
  const { project_id, title, content, tabId, tagIds } = payload;

  let todoInserted = false;
  let tagsInserted = false;

  try {
    const insertTodoQuery = await sql`
      INSERT INTO todos (project_id, tab_id, title, content)
      VALUES (${project_id}, ${tabId}, ${title}, ${content})
      RETURNING *;
    `;

    const returnedTodoId = insertTodoQuery.rows[0].id;

    todoInserted = true;

    if (tagIds && tagIds.length > 0) {
      const insertTodoTagQuery = await Promise.all(
        tagIds.map(async (tagId) => {
          await sql`
            INSERT INTO todo_tag (todo_id, value)
            VALUES (${returnedTodoId}, ${tagId})
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

export async function DeleteTodo(id: number) {
  try {
    await sql`
      DELETE FROM todos WHERE id = ${id};
    `;

    revalidatePath("/sprint");

    return {
      message: "Success",
      success: 1,
    };
  } catch (error) {
    console.error("Error deleting data:", error); // Log error
    return {
      message: "Failed.",
      type: 0,
    };
  }
}

export async function Login(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { message: "Error no user" };
  }
}

export async function VerifyPassword(pwd: string, hashPwd: string) {
  const bcrypt = require("bcrypt");

  const isCorrect = bcrypt.compare(pwd, hashPwd);
  return isCorrect;
}

interface ICreateTabProps {
  project_id?: string;
  title: string;
}

export async function CreateTab({ project_id, title }: ICreateTabProps) {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    await sql`
        CREATE TABLE IF NOT EXISTS tab_columns (
          id SERIAL PRIMARY KEY,
          project_id UUID REFERENCES projects (id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

    console.log(`Created "tab_columns" table`);

    // Insert data into the "users" table
    await sql`
      INSERT INTO tab_columns (project_id, title)
      VALUES (${project_id}, ${title})
      ON CONFLICT (id) DO NOTHING;
        `;

    revalidatePath("/sprint");

    return {
      success: 1,
      message: "Success",
    };
  } catch (error) {
    return {
      success: 0,
      message: "Failed",
    };
  }
}

interface ICreateProjectsProps {
  name: string;
  description: string;
}

export async function CreateProject({
  name,
  description,
}: ICreateProjectsProps) {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255),
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

    console.log(`Created "tab_columns" table`);

    // Insert data into the "users" table
    await sql`
      INSERT INTO projects (name, description)
      VALUES (${name}, ${description})
      ON CONFLICT (id) DO NOTHING;
        `;

    revalidatePath("/sprint");

    return {
      success: 1,
      message: "Success",
    };
  } catch (error) {
    return {
      success: 0,
      message: "Failed",
    };
  }
}
