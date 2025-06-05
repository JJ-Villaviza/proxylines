import type { Variables } from "@/lib/variable";
import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const administratorMiddleware = createMiddleware<Variables>(
  async (c: Context, next: Next) => {
    const user = c.get("user")!;

    if (user.type !== "main") {
      throw new HTTPException(403, {
        message: "Unauthorized, Forbidden to proccessed!",
      });
    }

    return next();
  }
);
