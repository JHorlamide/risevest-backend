
import dotenv from 'dotenv';
dotenv.config();

const config = {
  allowedOrigin: {
    get baseUrl() {
      if (process.env.NODE_ENV === "production") {
        return process.env.BASE_URL_LIVE as string;
      }

      return process.env.BASE_URL_DEV as string;
    }
  },

  jwt: {
    secret: process.env.JWT_SECRETE as string,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    tokenExpiration: process.env.TOKEN_EXPIRATION as string
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: process.env.NODE_ENV,
  databaseUrl: process.env.MONGO_DATABASE_URL as string,
  tempPassword: process.env.TEMP_PASSWORD as string,
}

export default config;