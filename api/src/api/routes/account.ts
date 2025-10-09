import express from "express";
import * as accountController from "../controllers/account.js";
import { userRules } from "../../middlewares/validators/rules/user.js";
import { simpleValidate } from "../../middlewares/validators/validate.js";

export const router = express.Router();

router.route("/login").post(userRules.login, simpleValidate, accountController.login);
router.route("/signup").post(userRules.create, simpleValidate, accountController.signup);

// Google OAuth
router.get("/auth/google", accountController.googleAuth);
router.get("/auth/google/callback", accountController.googleAuthCallback);