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
  { title: "Backlog" },
  { title: "Ready" },
  {
    title: "In progress",
  },
  { title: "In review" },
  { title: "Done" },
];

const Todos = [
  {
    tab_id: 1,
    title: "[Common/Timeline] Enhance UI",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    tab_id: 2,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    tab_id: 3,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    tab_id: 4,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
  {
    tab_id: 5,
    title: "[Common/Table] Enhance UI, Add pagination, Add search filter",
    content: "asdasdasdasdasd asd asd asd asd asd asd as das d",
  },
];

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

module.exports = {
  TabColumns,
  Todos,
  Tags,
  TodoTags,
  Users,
};
