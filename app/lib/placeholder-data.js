const Tags = [
  {
    type: 1,
    text: "High",
  },
  {
    type: 2,
    text: "Frontend",
  },
  {
    type: 3,
    text: "Low",
  },
  {
    type: 4,
    text: "Bug",
  },
];

const TabColumns = [
  { project_id: "410544b2-4001-4271-9855-fec4b6a6442a", title: "Backlog" },
  { project_id: "410544b2-4001-4271-9855-fec4b6a6442a", title: "Ready" },
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    title: "In progress",
  },
  { project_id: "410544b2-4001-4271-9855-fec4b6a6442a", title: "In review" },
  { project_id: "410544b2-4001-4271-9855-fec4b6a6442a", title: "Done" },
];

const Todos = [
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    tab_id: 1,
    title: "[Common/Timeline] Enhance UI",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    tab_id: 2,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    tab_id: 3,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    tab_id: 4,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    tab_id: 5,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
];

// const data = {
//   title: string // This is the project name
//   result: [ // Array of todos
//   { // These are sample data
//     project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     tab_id: 3,
//     title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//     content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
//   },
//   {
//     project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     tab_id: 4,
//     title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//     content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
//   },
//   {
//     project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     tab_id: 5,
//     title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//     content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
//   },
//   ]
// }

// {
//   title: string // This is the project name
//   result: [ // Array of todos
//   { // These are sample data
//     project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     tab_id: 3,
//     title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//     content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
//   },
//   {
//     project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     tab_id: 4,
//     title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//     content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
//   },
//   {
//     project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     tab_id: 5,
//     title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
//     content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
//   },
//   ]
// }

const TodoTags = [
  {
    todo_id: 1,
    tag_id: 1,
  },
  {
    todo_id: 1,
    tag_id: 2,
  },
  {
    todo_id: 1,
    tag_id: 3,
  },
  {
    todo_id: 2,
    tag_id: 3,
  },
];

const Users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const Projects = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Project 1",
    description: "This is description for project 1.",
    ownerId: "410544b2-4001-4271-9855-fec4b6a6442a",
    date_created:
      "Tue Apr 30 2024 03:55:18 GMT+0800 (Philippine Standard Time)",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a64422",
    name: "Project 2",
    description: "This is description for project 2.",
    ownerId: "410544b2-4001-4271-9855-fec4b6a6442a",
    date_created:
      "Tue Apr 30 2024 03:55:19 GMT+0800 (Philippine Standard Time)",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a64423",
    name: "Project 3",
    description: "This is description for project 3.",
    ownerId: "410544b2-4001-4271-9855-fec4b6a6442a",
    created_at: "Tue Apr 30 2024 03:55:20 GMT+0800 (Philippine Standard Time)",
  },
];

const ProjectMembers = [
  {
    project_id: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
];

module.exports = {
  TabColumns,
  Todos,
  Tags,
  TodoTags,
  Users,
  Projects,
};
