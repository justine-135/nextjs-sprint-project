import { TagsValue } from "../enums/tags";

export const TagText = {
  [TagsValue.LOW]: "Low",
  [TagsValue.MEDIUM]: "Medium",
  [TagsValue.HIGH]: "High",
  [TagsValue.URGENT]: "Urgent",
};

export const TagBg = {
  [TagsValue.LOW]: "border-lime-500",
  [TagsValue.MEDIUM]: "border-yellow-500",
  [TagsValue.HIGH]: "border-orange-500",
  [TagsValue.URGENT]: "border-red-500",
};
