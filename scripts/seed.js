const { db } = require("@vercel/postgres");
const { TabColumns, Todos, Tags } = require("../app/lib/placeholder-data.js");

async function seedTab(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS tab_columns (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL
        );
      `;

    console.log(`Created "tab_columns" table`);

    // Insert data into the "users" table
    const insertTabColumns = await Promise.all(
      TabColumns.map(async (tab) => {
        return client.sql`
          INSERT INTO tab_columns (title)
          VALUES (${tab.title})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertTabColumns.length} columns`);

    return {
      createTable,
      tabColumns: insertTabColumns,
    };
  } catch (error) {
    console.error("Error seeding tab columns:", error);
    throw error;
  }
}

async function seedTodos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          tab_id  INT REFERENCES tab_columns(id),
          title VARCHAR(255) NOT NULL,
          content VARCHAR(255) NOT NULL
        );
      `;

    console.log(`Created "todos" table`);

    // Insert data into the "users" table
    const insertTodos = await Promise.all(
      Todos.map(async (tab) => {
        return client.sql`
          INSERT INTO todos (tab_id, title, content)
          VALUES (${tab.tab_id}, ${tab.title}, ${tab.content})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertTodos.length} columns`);

    return {
      createTable,
      tabColumns: insertTodos,
    };
  } catch (error) {
    console.error("Error seeding tab columns:", error);
    throw error;
  }
}

async function seedTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS tags (
          id SERIAL PRIMARY KEY,
          type INT,
          text VARCHAR(255) NOT NULL
        );
      `;

    console.log(`Created "tags" table`);

    // Insert data into the "users" table
    const insertTags = await Promise.all(
      Tags.map(async (tab) => {
        return client.sql`
          INSERT INTO tags (type, text)
          VALUES (${tab.type}, ${tab.text})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertTags.length} columns`);

    return {
      createTable,
      tabColumns: insertTags,
    };
  } catch (error) {
    console.error("Error seeding tab columns:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTab(client);
  await seedTodos(client);
  await seedTags(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
