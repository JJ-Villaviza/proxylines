import { Hono } from "hono";
import type { Variables } from "hono/types";
import { routes } from "./routes";

const app = new Hono<Variables>();

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

export default app;
