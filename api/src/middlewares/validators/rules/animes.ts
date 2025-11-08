import { body, param, query } from "express-validator";
import { default as express } from "express";

export const createAnimeRules = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 255 }).withMessage("Title can be at most 255 characters long"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required"),

  body("genres")
    .notEmpty().withMessage("Genres are required")
    .custom((value) => {
      try {
        const genresArray = typeof value === "string" ? JSON.parse(value) : value;
        if (!Array.isArray(genresArray)) {
          throw new Error("Genres must be an array");
        }
        return true;
      } catch {
        throw new Error("Invalid genres format. Must be a valid JSON array");
      }
    }),

  body("release_year")
    .notEmpty().withMessage("Release year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Release year must be a valid year"),

  body("rating")
    .notEmpty().withMessage("Rating is required")
    .isLength({ max: 10 }).withMessage("Rating can be at most 10 characters long"),
];

// Update Anime validation
export const updateAnimeRules = [
  param("id")
    .notEmpty().withMessage("Anime ID is required")
    .isUUID().withMessage("Invalid Anime ID format"),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage("Title can be at most 255 characters long"),

  body("description")
    .optional()
    .trim(),

  body("genres")
    .optional()
    .custom((value) => {
      const genresArray = typeof value === "string" ? JSON.parse(value) : value;
      if (!Array.isArray(genresArray)) {
        throw new Error("Genres must be an array");
      }
      return true;
    }),

  body("release_year")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Release year must be a valid year"),

  body("rating")
    .optional()
    .isLength({ max: 10 }).withMessage("Rating can be at most 10 characters long"),
];

// Get Anime by ID / Delete validation
export const animeIdParamRules = [
  param("id")
    .notEmpty().withMessage("Anime ID is required")
    .isUUID().withMessage("Invalid Anime ID format"),
];

// Pagination / filtering for getAllAnime
export const getAllAnimeRules = [
  query("page")
    .optional()
    .isInt({ min: 1 }).withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 }).withMessage("Limit must be a positive integer"),
];