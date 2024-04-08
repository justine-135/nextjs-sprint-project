import { sql } from "@vercel/postgres";
import { CreateForm } from "./definitions/form";

export async function createTodo(payload: CreateForm) {
  const { title, content, tabId } = payload; // Destructure payload
  try {
    // Execute SQL query to insert data into the todos table
    const insertedData = await sql`
      INSERT INTO todos (tab_id, title, content)
      VALUES (${tabId}, ${title}, ${content})
      RETURNING *;`; // Use RETURNING * to get inserted data

    console.log(`Inserted data:`, insertedData); // Log inserted data
    return insertedData; // Return inserted data (optional)
  } catch (error) {
    console.error("Error inserting data:", error); // Log error
    throw error; // Rethrow error (optional)
  }
}
