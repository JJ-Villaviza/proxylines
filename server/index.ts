import { Hono } from "hono";
import { type Variables } from "hono/types";
import { errorHandling } from "./middlewares/error";
import { routes } from "./routes";

const app = new Hono<Variables>();

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.onError((error, c) => errorHandling(error, c));

export default app;
