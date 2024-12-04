import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 3600, // 1 hour
  checkperiod: 600, // Clean up every 10 minutes
});
