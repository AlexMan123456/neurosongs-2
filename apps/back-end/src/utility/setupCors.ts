import { APIError } from "@alextheman/utility";
import cors from "cors";

function setupCors(allowedOrigins: string[]) {
  return cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new APIError(403, "CORS_ERROR"), false);
    },
    credentials: true,
  });
}

export default setupCors;
