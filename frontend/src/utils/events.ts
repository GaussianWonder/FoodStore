import { MouseEventHandler } from "react";

export const stopMouseEvent: MouseEventHandler<any> = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};
