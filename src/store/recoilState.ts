import { atom } from "recoil";

export const modalSwitch = atom({
  key: "modalSwitch",
  default: false,
});

export const isDraggingState = atom({
  key: "isDragging",
  default: false,
});
