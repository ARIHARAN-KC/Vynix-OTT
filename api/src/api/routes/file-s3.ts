import { default as express } from "express";
import * as s3Controller from "../controllers/file-s3.js";

export const router = express.Router();
router.post("/add-folders", s3Controller.addFoldersController);
router.get("/get-folders", s3Controller.getFoldersController);