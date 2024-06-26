
import {z} from "zod";
import {Hono} from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export const runtime = "edge";

const app = new Hono().basePath('/api');

app
  .get(
      "/hello", 
      clerkMiddleware(),
      (c) => {
        const auth = getAuth(c);

        if( !auth?.userId ) {
          return c.json({ error: "Unauthenticated User."});
        }

        return c.json({
          message: "Hello Next.js with Hono!",
          userId: auth.userId,
        });
    })
  .get("/hello/:test", 
    zValidator("param", z.object({
      test: z.string(),
    })),
    (c) => {

      const test = c.req.param("test");

      return c.json({
        message: "Hello world",
        test: test,
      })
    })
  .post(
      "/create/:postId",
      zValidator("json", z.object({
        name: z.string(),
        userId: z.number(),
      })),
      zValidator("param", z.object({
        postId: z.number(),
      })),
      (c) => {
        const {name, userId} = c.req.valid("json");
        const {postId } = c.req.valid("param");

        return c.json({});
      }
  );


export const GET = handle(app);
export const POST = handle(app);
