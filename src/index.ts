import { start } from "./app.js";

start().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
