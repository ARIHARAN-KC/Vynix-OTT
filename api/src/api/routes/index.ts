import { default as express } from "express";
import { router as accountRoutes } from "./account.js";
import { router as userRoutes } from "./user.js" 

export const router = express.Router();

router.use("/account", accountRoutes);
router.use("/users", userRoutes);


