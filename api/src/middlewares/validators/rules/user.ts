import { query, body, param } from "express-validator";
import db from "../../../models/index.js";
import { destroy } from "./libs/destroy.js";
import { read } from "./libs/read.js";
import itemExists from "./libs/itemExists.js";
import toTitleCase from "../../../libs/toTitleCase.js";
import filters from "./libs/filters.js";

const { User } = db;

const commonRules = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("User Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("User Name must be between 2 and 50 characters")
    .bail()
    .custom(async (userName: string, { req }) => {
      const user = await User.findOne({ where: { userName } });
      if (itemExists(user, req.body.id)) {
        return Promise.reject("A user with this user name already exists");
      }
      return true;
    }),

  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .isLength({ min: 5, max: 100 })
    .withMessage("Email must be between 5 and 100 characters long")
    .normalizeEmail()
    .bail()
    .custom(async (email: string, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (itemExists(user, req.body.id)) {
        return Promise.reject("A user with this email address already exists");
      }
      return true;
    }),
];

export const userRules = {
  // Login
  login: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must be between 8 and 50 characters"),
  ],

  // Filter (for search endpoints)
  filter: [query("userName").optional({ checkFalsy: true }).trim(), ...filters],

  // Create user
  create: [
    ...commonRules,
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must be between 8 and 50 characters"),

    // Make role optional
    body("role")
      .optional({ checkFalsy: true })
      .trim()
      .isIn(["user", "admin"])
      .withMessage("Role must be either 'user' or 'admin'"),
  ],

  // Read user
  read: [read("User")],

  // Update user
  updateProfile: [
    body("id")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("User ID is required")
      .custom(async (id: string) => {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        return true;
      }),

    ...commonRules,

    body("password")
      .optional({ checkFalsy: true })
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must be between 8 and 50 characters"),

    body("role")
      .optional({ checkFalsy: true })
      .trim()
      .isIn(["user", "admin"])
      .withMessage("Role must be either 'user' or 'admin'"),
  ],

  // Delete user
  destroy: [destroy("User", async (pk) => await User.findByPk(pk))],

  // Change password
  changePassword: [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Current password is required")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must be between 8 and 50 characters"),

    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 8, max: 50 })
      .withMessage("New password must be between 8 and 50 characters"),
  ],
};
