import { default as express } from "express";
import { upload } from "../../middlewares/validators/rules/upload.js";
import { getAllAnime, getAnimeById, createAnime, updateAnime, deleteAnime } from "../controllers/animes.js";
import { isAdmin } from "../../middlewares/auth.js";
import { createAnimeRules, updateAnimeRules, animeIdParamRules, getAllAnimeRules } from "../../middlewares/validators/rules/animes.js";
import { validate } from "../../middlewares/validators/validate.js"; // You'll need to create this

export const router = express.Router();

// Public routes
router.get("/", getAllAnimeRules, validate, getAllAnime);
router.get("/:id", animeIdParamRules, validate, getAnimeById);

// Admin-only routes with file upload
router.post("/", isAdmin, upload.fields([{ name: "thumbnail", maxCount: 1 },{ name: "banner", maxCount: 1 }]), createAnimeRules, validate, createAnime);

router.patch("/:id", isAdmin, upload.fields([{ name: "thumbnail", maxCount: 1 },{ name: "banner", maxCount: 1 } ]), updateAnimeRules, validate, updateAnime);

router.delete("/:id", isAdmin, animeIdParamRules, validate, deleteAnime);

export default router;