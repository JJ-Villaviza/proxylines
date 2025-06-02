import { Hono } from "hono";
import type { Variables } from "../lib/variable";
import { zValidator } from "@hono/zod-validator";
import { loginValidation, registerValidation } from "@/types/validations";
import { idGenerator } from "@/lib/id";
import { db } from "@/database";
import * as s from "@/database/schemas";
import type { SuccessResponse } from "@/types/response";
import { DatabaseError } from "pg";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

const route = new Hono<Variables>()

  // Register route
  .post("/register", zValidator("form", registerValidation), async (c) => {
    const { name, email, username, password } = c.req.valid("form");
    const hash = await Bun.password.hash(password);
    const id = idGenerator();

    try {
      await db.insert(s.branchTable).values({
        id,
        username,
        name,
        type: "main",
        companyId: id,
      });
      await db.insert(s.accountTable).values({
        id,
        password: hash,
      });
      await db.insert(s.companyTable).values({
        id,
        email,
      });

      return c.json<SuccessResponse>(
        {
          success: true,
          message: "Successfully created an account!",
        },
        201
      );
    } catch (error) {
      if (error instanceof DatabaseError && error.code === "23505") {
        throw new HTTPException(409, {
          message: "Username already used!",
          cause: { form: true },
        });
      }
    }
    throw new HTTPException(500, { message: "Failed to create user" });
  })

  // Login route
  .post("/login", zValidator("form", loginValidation), async (c) => {
    const { username, password } = c.req.valid("form");

    const branch = await db.query.branchTable.findFirst({
      columns: {
        id: true,
      },
      where: (branch, { eq }) => eq(branch.username, username),
    });

    if (!branch) {
      throw new HTTPException(401, {
        message: "Incredentials not correct!",
        cause: { form: true },
      });
    }

    const account = await db.query.accountTable.findFirst({
      columns: {
        password: true,
      },
      where: (account, { eq }) => eq(account.id, branch.id),
    });

    if (!account) {
      throw new HTTPException(401, {
        message: "No record found!",
        cause: { form: true },
      });
    }

    const verify = await Bun.password.verify(password, account.password);

    if (!verify) {
      throw new HTTPException(401, {
        message: "Incredentials not correct!",
        cause: { form: true },
      });
    }

    return c.json<SuccessResponse>(
      {
        success: true,
        message: "Successfully login, Welcome back!",
      },
      200
    );
  })

  // Sign-out route
  .get("/sign-out", async (c) => {
    const session = c.get("session")!;

    await db
      .delete(s.sessionTable)
      .where(eq(s.sessionTable.branchId, session.branchId));

    return c.json<SuccessResponse>({
      success: true,
      message: "Successfully sign-out!",
    });
  })

  // Me route
  .get("/me", async (c) => {
    const user = c.get("user")!;

    const profile = await db.query.profileTable.findFirst({
      columns: {
        image: true,
      },
      where: (profile, { eq }) => eq(profile.accountId, user.companyId),
    });

    return c.json<
      SuccessResponse<{
        name: string;
        username: string;
        companyId: string;
        image?: string;
      }>
    >(
      {
        success: true,
        message: "Details:",
        data: {
          name: user.name,
          username: user.username,
          companyId: user.companyId,
          image: profile?.image,
        },
      },
      200
    );
  });

export default route;
