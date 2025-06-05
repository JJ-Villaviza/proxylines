import { db } from "@/database";
import * as s from "@/database/schemas";
import type { Variables } from "@/lib/variable";
import { administratorMiddleware } from "@/middlewares/administrator";
import { sessionMiddleware } from "@/middlewares/session";
import type { SuccessResponse } from "@/types/response";
import type { Branch } from "@/types/schemas";
import {
  branchAddValidation,
  branchUpdateValidation,
  idValidation,
} from "@/types/validations";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { requestId } from "hono/request-id";
import { DatabaseError } from "pg";

const route = new Hono<Variables>()

  // Deactive branch
  .patch(
    "/deactivate-status/:id",
    zValidator("param", idValidation),
    sessionMiddleware,
    administratorMiddleware,
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("user")!;

      try {
        await db
          .update(s.branchTable)
          .set({
            status: "offline",
            deletedAt: new Date(Date.now()),
          })
          .where(
            and(
              eq(s.branchTable.id, id),
              eq(s.branchTable.companyId, user.companyId),
              eq(s.branchTable.type, "branch")
            )
          );
        return c.json<SuccessResponse>(
          {
            success: true,
            message: "Successfully Deactivated Branch",
          },
          200
        );
      } catch (error) {
        throw new HTTPException(409, {
          message: "Cannot deactivated account",
        });
      }
    }
  )

  .patch(
    "/activate-branch/:id",
    zValidator("param", idValidation),
    sessionMiddleware,
    administratorMiddleware,
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("user")!;

      try {
        await db
          .update(s.branchTable)
          .set({
            status: "online",
          })
          .where(
            and(
              eq(s.branchTable.id, id),
              eq(s.branchTable.companyId, user.companyId),
              eq(s.branchTable.type, "branch")
            )
          );
        return c.json<SuccessResponse>(
          {
            success: true,
            message: "Successfully Activated Btanch",
          },
          200
        );
      } catch (error) {
        throw new HTTPException(409, {
          message: "Cannot deactivated account",
        });
      }
    }
  )

  // Edit branch details
  .patch(
    "/edit-branch/:id",
    zValidator("form", branchUpdateValidation),
    zValidator("param", idValidation),
    sessionMiddleware,
    administratorMiddleware,
    async (c) => {
      const { name, username, password } = c.req.valid("form");
      const { id } = c.req.valid("param");
      const user = c.get("user")!;

      if (name && username) {
        await db
          .update(s.branchTable)
          .set({
            username,
            name,
          })
          .where(
            and(
              eq(s.branchTable.companyId, user.companyId),
              eq(s.branchTable.id, id)
            )
          );
      }

      if (password) {
        const hash = await Bun.password.hash(password);
        await db
          .update(s.accountTable)
          .set({ password: hash })
          .where(
            and(
              eq(s.branchTable.companyId, user.companyId),
              eq(s.branchTable.id, id)
            )
          );
      }

      return c.json<SuccessResponse>(
        {
          success: true,
          message: "Successfully updated details!",
        },
        200
      );
    }
  )

  // List of branches
  .get("/list-branch/:id", zValidator("param", idValidation), async (c) => {
    const { id } = c.req.valid("param");

    const list = await db.query.branchTable.findMany({
      where: (list, { and, eq, ne }) =>
        and(eq(list.companyId, id), ne(list.status, "offline")),
    });

    if (!list) {
      throw new HTTPException(404, {
        message: "No branches!",
      });
    }

    return c.json<SuccessResponse<Branch[]>>(
      {
        success: true,
        message: `Length: ${list.length}, Branch List:`,
        data: [...list],
      },
      200
    );
  })

  // List of branches for login users
  .get("/list-branch", sessionMiddleware, async (c) => {
    const user = c.get("user")!;

    const list = await db.query.branchTable.findMany({
      where: (list, { and, eq, ne }) =>
        and(eq(list.companyId, user.companyId), ne(list.id, user.id)),
    });

    if (!list) {
      throw new HTTPException(404, {
        message: "No branches!",
      });
    }

    return c.json<SuccessResponse<Branch[]>>(
      {
        success: true,
        message: `Length: ${list.length}, Branch List:`,
        data: [...list],
      },
      200
    );
  })

  // Add new branches route
  .post(
    "/add-branch",
    zValidator("form", branchAddValidation),
    sessionMiddleware,
    administratorMiddleware,
    requestId(),
    async (c) => {
      const { name, username, password } = c.req.valid("form");
      const hash = await Bun.password.hash(password);
      const id = c.get("requestId");
      const user = c.get("user")!;

      try {
        await db.insert(s.branchTable).values({
          id,
          username,
          name,
          type: "branch",
          companyId: user.companyId,
        });
        await db.insert(s.accountTable).values({
          id,
          password: hash,
        });

        return c.json<SuccessResponse>(
          {
            success: true,
            message: "Successfully added an branch!",
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
        throw new HTTPException(500, { message: "Failed to create user" });
      }
    }
  );

export default route;
