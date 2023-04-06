import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  number: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    res.status(403).json({ message: "Token not found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as User;
    req.user = decoded;
    return next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid token" });
    } else if (err instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: "Token expired" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authMiddleware;
