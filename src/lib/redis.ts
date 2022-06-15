import Redis from "ioredis";

const isLocalhost =
  !process.env.REDIS_URL ||
  ["redis://localhost:6379", "redis://127.0.0.1:6379"].includes(
    process.env.REDIS_URL
  );

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  commandTimeout: 5000,
  keepAlive: 1,
  tls: isLocalhost
    ? null
    : {
        rejectUnauthorized: false,
        requestCert: true,
      },
});

export default redis;
