import { Hono } from "hono";
import type { Variables } from "../lib/variable";

const route = new Hono<Variables>()

  // Register route
  .post("/register", async (c) => {
    const data = await c.req.json();

    return c.json({ user: data });
  })

  // Login route
  .post("/login", async (c) => {
    const data = await c.req.json();

    return c.json({ user: data });
  })

  // Sign-out route
  .get("/sign-out", async (c) => {
    return c.json({ user: "data" });
  })

  // Me route
  .get("/me", async (c) => {
    return c.json({ user: "data" });
  });

export default route;
