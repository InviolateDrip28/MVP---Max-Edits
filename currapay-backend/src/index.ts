import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { appRouter } from "./trpc/_app";
import * as trpcExpress from "@trpc/server/adapters/express";
import { errorHandler } from "./utils/errorHandler";
import { logger } from "./utils/logger";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Initialize the Express application
const app = express();

// Get allowed origins
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL?.split(",") ?? []
    : [process.env.DEV_URL ?? "http://localhost:3000"];

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  logger(`Received ${req.method} request for ${req.url}`);
  next();
});

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the tRPC API!");
});

// tRPC setup
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
