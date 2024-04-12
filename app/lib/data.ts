"use server";

import { sql } from "@vercel/postgres";
import {
  ITabColumns,
  ITags,
  ITodos,
  ITodoTags,
} from "./definitions/tab-column";

// export const TabColumnsData: ITabColumns[] = [
//   {
//     id: 1,
//     title: "Backlog",
//     todos: [
//       {
//         id: 1,
//         title: "[Common/Timeline] Enhance UI",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//       {
//         id: 2,
//         title: "[Common/Modal] Enhance UI",
//         tags: [
//           { id: 1, type: 1, text: "High" },
//           { id: 2, type: 2, text: "Front-end" },
//         ],
//       },
//       {
//         id: 3,
//         title: "[Common/Modal] Enhance UI",
//         tags: [
//           { id: 1, type: 1, text: "High" },
//           { id: 2, type: 2, text: "Front-end" },
//           { id: 3, type: 3, text: "Bug" },
//         ],
//       },
//     ],
//     count: 3,
//   },
//   {
//     id: 2,
//     title: "Ready",
//     todos: [
//       {
//         id: 1,
//         title: "[Common/Timeline] Enhance UI",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//       {
//         id: 2,
//         title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//     ],
//     count: 2,
//   },
//   {
//     id: 3,
//     title: "In progress",
//     todos: [
//       {
//         id: 1,
//         title: "[Common/Timeline] Enhance UI",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//       {
//         id: 2,
//         title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//       {
//         id: 3,
//         title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//       {
//         id: 4,
//         title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//       {
//         id: 5,
//         title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//         tags: [{ id: 1, type: 1, text: "High" }],
//       },
//     ],
//     count: 5,
//   },
//   { id: 4, title: "In review", count: 0 },
//   { id: 5, title: "Done", count: 0 },
// ];

// export const tags = [
//   {
//     id: 1,
//     title: "High",
//     type: 1,
//   },
//   {
//     id: 2,
//     title: "Low",

//     type: 2,
//   },
//   {
//     id: 3,
//     title: "Medium",
//     type: 3,
//   },
//   {
//     id: 4,
//     title: "Back-end",
//     type: 4,
//   },
//   {
//     id: 5,
//     title: "Front-end",
//     type: 5,
//   },
//   {
//     id: 6,
//     title: "Bug",
//     type: 7,
//   },
// ];

export async function getTabColumns() {
  try {
    const data = await sql<ITabColumns>`SELECT * FROM tab_columns;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET tab_columns", error);
  }
}

export async function getTodos(id: number) {
  try {
    const data = await sql<ITodos>`SELECT * FROM todos WHERE tab_id = ${id};`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET todos", error);
  }
}

export async function getTodoTags(id: number) {
  try {
    const data =
      await sql<ITodoTags>`SELECT * FROM todo_tag WHERE todo_id = ${id};`;

    return data.rows;
  } catch (error) {
    console.error("Database Error: GET todos", error);
  }
}

export async function getTags(id: number) {
  try {
    const data = await sql<ITags>`SELECT * FROM tags;`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error: GET todos", error);
  }
}
