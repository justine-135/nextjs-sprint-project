const { db } = require("@vercel/postgres");
const {
  TabColumns,
  Todos,
  Tags,
  TodoTags,
  Users,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS tags (
          id SERIAL PRIMARY KEY,
          type INT,
          text VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

    console.log(`Created "tags" table`);

    const insertTags = await Promise.all(
      Tags.map(async (tab) => {
        return client.sql`
          INSERT INTO tags (type, text)
          VALUES (${tab.type}, ${tab.text})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertTags.length} tags`);

    return {
      createTable,
      tabColumns: insertTags,
    };
  } catch (error) {
    console.error("Error seeding tab columns:", error);
    throw error;
  }
}

async function seedTab(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS tab_columns (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
          tab_id INTEGER NOT NULL REFERENCES tab_columns (id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    console.error("Error seeding todos:", error);
    throw error;
  }
}

async function seedTodoTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS todo_tag (
      id SERIAL PRIMARY KEY,
      todo_id INTEGER REFERENCES todos (id) ON DELETE CASCADE,
      tag_id INTEGER REFERENCES tags (id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );  
      `;

    console.log(`Created "todo tags" table`);

    // Insert data into the "users" table
    const insertTodoTag = await Promise.all(
      TodoTags.map(async (tab) => {
        return client.sql`
          INSERT INTO todo_tag (todo_id, tag_id)
          VALUES (${tab.todo_id}, ${tab.tag_id})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertTodoTag.length} columns`);

    return {
      createTable,
      tabColumns: insertTodoTag,
    };
  } catch (error) {
    console.error("Error seeding todo tag:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );  
      `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      Users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );
    console.log(`Seeded ${insertedUsers.length} columns`);

    return {
      createTable,
      tabColumns: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTags(client);
  await seedTab(client);
  await seedTodos(client);
  await seedTodoTags(client);
  await seedUsers(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
