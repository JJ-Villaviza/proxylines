import { randomBytes } from "crypto";

export const idGenerator = () => {
  let length: number = 10;

  if (length % 2 !== 0) {
    length++;
  }

  return randomBytes(length / 2).toString("hex");
};
