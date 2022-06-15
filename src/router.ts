import Router from "koa-router";
import db from "./lib/db";
import redis from "./lib/redis";

const router = new Router();

router.get("/healthz", async (ctx) => {
  const dbStatus = async () => {
    try {
      await db.raw("SELECT 1");
      return true;
    } catch (err) {
      return false;
    }
  };

  ctx.status = 200;
  ctx.body = {
    db: await dbStatus(),
    redis: redis.status === "ready",
    ok: true,
  };
});

export default router;
