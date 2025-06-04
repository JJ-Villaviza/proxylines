import { randomBytes } from "crypto";

export const idGenerator = (length: number): string => {
  if (length % 2 !== 0) {
    length++;
  }

  return randomBytes(length / 2).toString("hex");
};
