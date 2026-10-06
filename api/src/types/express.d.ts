import { JWTPayload } from "../middleware/authMiddleware.js";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
