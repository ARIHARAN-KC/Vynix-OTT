import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../constants/index.js";
import db from "../../models/index.js";
import passport from "../../config/passport.js";

const { User } = db;

const generateToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

const sendAuthResponse = (user: any, res: Response) => {
  const token = generateToken({ id: user.id, role: user.role });
  const safeUser = { 
    id: user.id, 
    userName: user.userName, 
    email: user.email, 
    role: user.role, 
    picture: user.picture };
  return res.status(200).json({ token, user: safeUser });
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

    // Check if user has password (OAuth users might not have passwords)
    if (!user.password) {
      return res.status(401).json({ 
        error: "This account uses Google login. Please sign in with Google." 
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    sendAuthResponse(user, res);
  } catch (error) {
    console.error("Error logging in user:", error);
    next({ status: 500, error: "Error logging in user" });
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { userName, email, password, picture } = req.body;

    // Basic validation
    if (!userName || !email || !password) {
      return res.status(400).json({ error: "userName, email, and password are required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: "user",
      picture,
      createdBy: 'system',
      updatedBy: 'system',
    });

    // Auto-login after signup
    sendAuthResponse(user, res);
  } catch (error) {
    console.error("Error creating user:", error);
    next({ status: 500, error: "Error creating user" });
  }
}

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', (err: any, user: any) => {
    if (err || !user) 
      return res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=auth_failed`);

    const token = generateToken({ id: user.id, role: user.role });
    const userData = { 
        id: user.id, 
        userName: user.userName, 
        email: user.email, 
        role: user.role, 
        picture: user.picture 
    };

    // Redirect to frontend with token and user info
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
  })(req, res, next);
};

