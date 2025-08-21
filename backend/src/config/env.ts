import "dotenv/config";

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",

  JWT_ACCESS_SECRET: required(
    "JWT_ACCESS_SECRET",
    process.env.JWT_ACCESS_SECRET,
  ),
  JWT_REFRESH_SECRET: required(
    "JWT_REFRESH_SECRET",
    process.env.JWT_REFRESH_SECRET,
  ),
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || "15m",
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || "7d",
};
