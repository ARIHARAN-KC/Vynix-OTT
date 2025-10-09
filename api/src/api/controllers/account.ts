import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../constants/index.js";
import db from "../../models/index.js";

const { User } = db;

const generateToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, role: user.role });

    const safeUser = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      picture: user.picture,
    };

    return res.status(200).json({ token, user: safeUser });
  } catch (error) {
    console.error("Error logging in user:", error);
    next({ status: 500, error: "Error logging in user" });
  }
}
