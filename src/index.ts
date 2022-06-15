import "dotenv/config";
import Koa from "koa";
import https from "https";
import cors from "@koa/cors";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import { RequestListener } from "http";
import sslify, { xForwardedProtoResolver } from "koa-sslify";
import router from "./router";

const app = new Koa();

// Bypass for Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.proxy = true;
  app.use(sslify({ resolver: xForwardedProtoResolver }) as any);
}

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.WEBSITE_URL
        : "http://localhost:3000",
    credentials: true,
  }) as any
);

// Request logging
app.use(logger());

// Enable POST request bodies
app.use(bodyParser({}));

// API routes
app.use(router.allowedMethods());
app.use(router.routes());

const port = process.env.PORT || 3030;

// Start a HTTPS server
if (process.env.NODE_ENV === "production") {
  app.listen(port, () => {
    console.log(`Koa API listening on port ${port}`);
  });
} else {
  const httpsLocalhost = require("https-localhost")();

  (async () => {
    const certs = await httpsLocalhost.getCerts();

    https
      .createServer(certs, app.callback() as RequestListener)
      .listen(port, () => {
        console.log(`Koa API listening on https://localhost:${port}`);
      });
  })();
}
