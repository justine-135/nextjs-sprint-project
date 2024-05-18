const { db } = require("@vercel/postgres");
const {
  TabColumns,
  Todos,
  Tags,
  TodoTags,
  Users,
  Projects,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedProjects(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "projects" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); `;

    console.log(`Created "projects" table`);

    // Insert data into the "projects" table
    const insertProjects = await Promise.all(
      Projects.map(async (tab) => {
        return client.sql`
          INSERT INTO projects (id, name, description)
          VALUES (${tab.id}, ${tab.name}, ${tab.description})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertProjects.length} columns`);

    return {
      createTable,
      tabColumns: insertProjects,
    };
  } catch (error) {
    console.error("Error seeding projects:", error);
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
          project_id UUID REFERENCES projects (id) ON DELETE CASCADE,
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
          INSERT INTO tab_columns (project_id, title)
          VALUES (${tab.project_id}, ${tab.title})
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
          project_id UUID REFERENCES projects (id) ON DELETE CASCADE,
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
          INSERT INTO todos (tab_id, project_id, title, content)
          VALUES (${tab.tab_id}, ${tab.project_id}, ${tab.title}, ${tab.content})
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
      value INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );  
      `;

    console.log(`Created "todo tags" table`);

    // Insert data into the "users" table
    const insertTodoTag = await Promise.all(
      TodoTags.map(async (tab) => {
        return client.sql`
          INSERT INTO todo_tag (todo_id, value)
          VALUES (${tab.todo_id}, ${tab.value})
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

  await seedProjects(client);
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
