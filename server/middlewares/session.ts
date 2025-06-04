import { db } from "@/database";
import * as s from "@/database/schemas";
import type { Variables } from "@/lib/variable";
import { eq } from "drizzle-orm";
import type { Context, Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const sessionMiddleware = createMiddleware<Variables>(
  async (c: Context, next: Next) => {
    const token = getCookie(c, "__session");

    if (!token) {
      c.set("user", null);
      c.set("session", null);
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    const session = await db.query.sessionTable.findFirst({
      where: (session, { eq }) => eq(session.token, token),
    });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      deleteCookie(c, "__session");
      throw new HTTPException(401, {
        message: "Session not found!",
      });
    }

    const user = await db.query.branchTable.findFirst({
      where: (user, { eq }) => eq(user.id, session.branchId),
    });
    if (!user) {
      throw new HTTPException(404, {
        message: "No user is Login!",
      });
    }

    const expiresAt = new Date(session.expiresAt);
    if (expiresAt < new Date()) {
      c.set("user", null);
      c.set("session", null);
      deleteCookie(c, "__session");
      throw new HTTPException(401, {
        message: "Session expired!",
      });
    }

    const newToken = crypto.randomUUID();
    const extendedExpiresAt = new Date(Date.now() + 1000 * 24);

    const updated = await db
      .update(s.sessionTable)
      .set({ token: newToken, expiresAt: extendedExpiresAt })
      .where(eq(s.sessionTable.id, session.id))
      .returning();

    setCookie(c, "__session", newToken);

    c.set("session", updated);
    c.set("user", user);

    return next();
  }
);
