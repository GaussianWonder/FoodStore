import { MutableRefObject } from "react";

export function existsMutable<T>(mutableObject: MutableRefObject<T>): boolean {
  return !!(mutableObject && mutableObject.current);
}
