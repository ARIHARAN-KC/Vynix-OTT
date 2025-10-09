import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from "../../models/index.js";

const { User } = db;

async function users(req: Request, res: Response, next: NextFunction) {
  try {
    const { filter = {}, pagination = {} } = res.locals;
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const offset = (page - 1) * limit;

    const reqUserId = req.headers["user-id"]?.toString();
    const reqUser = await User.findByPk(reqUserId);

    if (!reqUser) {
      return res.status(403).json({ error: "Invalid user" });
    }

    // If regular user → only show their own data
    if (reqUser.role === "user") {
      filter.where = { ...filter.where, id: reqUser.id };
    }

    const { count, rows } = await User.findAndCountAll({
      where: filter.where || {},
      attributes: [
        "id",
        "userName",
        "email",
        "role",
        "picture",
        "createdBy",
        "updatedBy",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    pagination.count = count;
    return res.status(200).json({ users: rows, pagination });
  } catch (error) {
    console.error("Error fetching users:", error);
    next({ status: 500, error: "DB error fetching users" });
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { userName, email, password, picture, role } = req.body;

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

    // Determine role
    let finalRole: "user" | "admin" = "user"; // default role
    if (role && role.toLowerCase() === "admin") {
      finalRole = "admin";
    }

    // Create user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: finalRole,
      picture,
      createdBy: req.headers["user-id"] || 'system',
      updatedBy: req.headers["user-id"] || 'system',
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    next({ status: 500, error: "DB error creating user" });
  }
}

async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "id",
        "userName",
        "email",
        "role",
        "picture",
        "createdBy",
        "updatedBy",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error reading user:", error);
    next({ status: 500, error: "DB error reading user" });
  }
}

async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, userName, email, role, picture } = req.body;
    const reqUserId = req.headers["user-id"]?.toString();

    const reqUser = await User.findByPk(reqUserId);
    if (!reqUser) {
      return res.status(403).json({ error: "Invalid user" });
    }

    // Only admin or same user can update
    if (reqUser.role !== "admin" && reqUser.id !== id) {
      return res.status(403).json({ error: "Unauthorized update" });
    }

    // Determine role
    let finalRole = role;
    if (!finalRole) finalRole = "user"; // default if role not provided
    if (finalRole === "admin" && reqUser.role !== "admin") {
      return res.status(403).json({ error: "Only admins can assign admin role" });
    }

    const [affectedRows] = await User.update(
      {
        userName,
        email,
        role: finalRole,
        picture,
        updatedBy: reqUserId,
      },
      { where: { id } }
    );

    if (affectedRows !== 1) {
      return res.status(400).json({ error: "User not updated" });
    }

    const updatedUser = await User.findByPk(id);
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    next({ status: 500, error: "DB error updating user" });
  }
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, oldPassword, newPassword } = req.body;
    const reqUserId = req.headers["user-id"]?.toString();

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user has a password (OAuth users might not have passwords)
    if (!user.password) {
      return res.status(400).json({ error: "This account uses OAuth login and doesn't have a password set." });
    }

    const validOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validOldPassword) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [affectedRows] = await User.update(
      { password: hashedPassword, updatedBy: reqUserId },
      { where: { id } }
    );

    if (affectedRows !== 1) {
      return res.status(400).json({ error: "Password not updated" });
    }

    return res.status(200).json({ isChanged: true });
  } catch (error) {
    console.error("Error changing password:", error);
    next({ status: 500, error: "DB error changing password" });
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const reqUserId = req.headers["user-id"]?.toString();

    const reqUser = await User.findByPk(reqUserId);
    if (!reqUser || reqUser.role !== "admin") {
      return res.status(403).json({ error: "Only admins can delete users" });
    }

    const deleted = await User.destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ error: "User not deleted" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    next({ status: 500, error: "DB error deleting user" });
  }
}

export {
  users,
  create,
  read,
  updateProfile,
  changePassword,
  destroy
};