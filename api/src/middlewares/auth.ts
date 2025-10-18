import { Request, Response, NextFunction } from "express";
import db from "../models/index.js";

const { User } = db;

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqUserId = req.headers["user-id"]?.toString();
    
    if (!reqUserId) {
      return res.status(401).json({ error: "User ID required" });
    }

    const user = await User.findByPk(reqUserId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Error in admin check:", error);
    return res.status(500).json({ error: "Server error during admin verification" });
  }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqUserId = req.headers["user-id"]?.toString();
    
    if (!reqUserId) {
      return res.status(401).json({ error: "User ID required" });
    }

    const user = await User.findByPk(reqUserId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to request for later use
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authentication check:", error);
    return res.status(500).json({ error: "Server error during authentication" });
  }
};

export const isOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqUserId = req.headers["user-id"]?.toString();
    const targetUserId = req.params.userId || req.body.userId;
    
    if (!reqUserId) {
      return res.status(401).json({ error: "User ID required" });
    }

    const user = await User.findByPk(reqUserId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Allow if admin or if user is accessing their own data
    if (user.role !== "admin" && user.id !== targetUserId) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    console.error("Error in owner/admin check:", error);
    return res.status(500).json({ error: "Server error during authorization" });
  }
};