import { type ErrorResponse } from "@/types/response";
import { type Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { HTTPResponseError } from "hono/types";

export const errorHandling = (error: Error | HTTPResponseError, c: Context) => {
  if (error instanceof HTTPException) {
    const errorResponse =
      error.res ??
      c.json<ErrorResponse>(
        {
          success: false,
          error: error.message,
          isFormError:
            error.cause &&
            typeof error.cause === "object" &&
            "form" in error.cause
              ? error.cause.form === true
              : false,
        },
        error.status
      );
    return errorResponse;
  }

  return c.json<ErrorResponse>(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.stack ?? error.message,
    },
    500
  );
};
