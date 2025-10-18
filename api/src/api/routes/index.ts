import { default as express } from "express";
import { router as accountRoutes } from "./account.js";
import { router as userRoutes } from "./user.js" 
import { router as fileS3Routes } from "./file-s3.js";
import { router as animeRoutes } from "./animes.js";

export const router = express.Router();

router.use("/account", accountRoutes);
router.use("/users", userRoutes);
router.use("/file-s3", fileS3Routes);
router.use("/animes",animeRoutes);


