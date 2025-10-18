import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import db from "../../models/index.js";
import { uploadToS3, deleteFromS3, getSignedUrl } from "../../utils/s3-helpers.js";
import { isAdmin } from "../../middlewares/auth.js";

const { Animes } = db;

async function getAllAnime(req: Request, res: Response, next: NextFunction) {
  try {
    const { filter = {}, pagination = {} } = res.locals;
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Animes.findAndCountAll({
      where: filter.where || {},
      attributes: [
        "id", "title", "description", "thumbnail_s3_key", "banner_s3_key",
        "genres", "release_year", "rating", "createdBy", "updatedBy",
        "createdAt", "updatedAt",
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // Generate signed URLs for images
    const animeWithUrls = rows.map((anime: any) => ({
      ...anime.toJSON(),
      thumbnail_url: getSignedUrl(anime.thumbnail_s3_key),
      banner_url: getSignedUrl(anime.banner_s3_key)
    }));

    pagination.count = count;
    return res.status(200).json({ anime: animeWithUrls, pagination });
  } catch (error) {
    console.error("Error fetching anime:", error);
    next({ status: 500, error: "DB error fetching anime" });
  }
}

async function getAnimeById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const anime = await Animes.findByPk(id, {
      attributes: [
        "id", "title", "description", "thumbnail_s3_key", "banner_s3_key",
        "genres", "release_year", "rating", "createdBy", "updatedBy",
        "createdAt", "updatedAt",
      ],
    });

    if (!anime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    const animeWithUrls = {
      ...anime.toJSON(),
      thumbnail_url: getSignedUrl(anime.thumbnail_s3_key),
      banner_url: getSignedUrl(anime.banner_s3_key)
    };

    return res.status(200).json({ anime: animeWithUrls });
  } catch (error) {
    console.error("Error fetching anime:", error);
    next({ status: 500, error: "DB error fetching anime" });
  }
}

async function createAnime(req: Request, res: Response, next: NextFunction) {
  // Declare variables at function scope for cleanup
  let uploadedThumbnailKey: string = "";
  let uploadedBannerKey: string = "";

  try {
    const {
      title,
      description,
      genres,
      release_year,
      rating
    } = req.body;

    // Get uploaded files from multer
    const thumbnailFile = (req.files as any)?.['thumbnail']?.[0] as Express.Multer.File;
    const bannerFile = (req.files as any)?.['banner']?.[0] as Express.Multer.File;

    // Validate required fields
    if (!title || !description || !genres || !release_year || !rating) {
      return res.status(400).json({
        error: "title, description, genres, release_year, and rating are required",
      });
    }

    // Validate that files were uploaded
    if (!thumbnailFile || !bannerFile) {
      return res.status(400).json({
        error: "thumbnail and banner images are required",
      });
    }

    // Parse genres safely
    let genresArray: string[];
    try {
      genresArray = typeof genres === "string" ? JSON.parse(genres) : genres;
      if (!Array.isArray(genresArray)) throw new Error("Genres must be an array");
    } catch {
      return res.status(400).json({ error: "Invalid genres format" });
    }

    // Upload files to S3 and get the keys (IDs)
    try {
      uploadedThumbnailKey = await uploadToS3(thumbnailFile, "anime-thumbnail");
      uploadedBannerKey = await uploadToS3(bannerFile, "anime-banner");
    } catch (uploadError) {
      console.error("Error uploading to S3:", uploadError);
      return res.status(500).json({ error: "Failed to upload images to storage" });
    }

    // Store in DB with the S3 keys
    const anime = await Animes.create({
      title,
      description,
      genres: genresArray,
      release_year: parseInt(release_year),
      rating,
      thumbnail_s3_key: uploadedThumbnailKey, // Store S3 key from upload
      banner_s3_key: uploadedBannerKey,       // Store S3 key from upload
      createdBy: req.headers["user-id"]?.toString() || "system",
      updatedBy: req.headers["user-id"]?.toString() || "system",
    });

    // Return response with signed URLs
    return res.status(201).json({
      message: "Anime created successfully",
      anime: {
        ...anime.toJSON(),
        thumbnail_url: getSignedUrl(uploadedThumbnailKey),
        banner_url: getSignedUrl(uploadedBannerKey),
      },
    });

  } catch (error) {
    console.error("Error creating anime:", error);
    
    // Clean up uploaded files from S3 if DB operation fails
    if (uploadedThumbnailKey) {
      await deleteFromS3(uploadedThumbnailKey).catch(console.error);
    }
    if (uploadedBannerKey) {
      await deleteFromS3(uploadedBannerKey).catch(console.error);
    }
    
    next({ status: 500, error: "DB error creating anime" });
  }
}

async function updateAnime(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { title, description, genres, release_year, rating } = req.body;
    const thumbnailFile = (req.files as any)?.['thumbnail']?.[0] as Express.Multer.File;
    const bannerFile = (req.files as any)?.['banner']?.[0] as Express.Multer.File;

    const anime = await Animes.findByPk(id);
    if (!anime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    // Prepare update data (keep your existing logic)
    const updateData: any = {
      title: title || anime.title,
      description: description || anime.description,
      release_year: release_year ? parseInt(release_year) : anime.release_year,
      rating: rating || anime.rating,
      updatedBy: req.headers["user-id"]?.toString() || 'system',
    };

    // Handle file updates (keep your existing logic)
    if (thumbnailFile) {
      await deleteFromS3(anime.thumbnail_s3_key);
      updateData.thumbnail_s3_key = await uploadToS3(thumbnailFile, "anime-thumbnail");
    }

    if (bannerFile) {
      await deleteFromS3(anime.banner_s3_key);
      updateData.banner_s3_key = await uploadToS3(bannerFile, "anime-banner");
    }

    const [affectedRows] = await Animes.update(updateData, { where: { id } });

    if (affectedRows !== 1) {
      return res.status(400).json({ error: "Anime not updated" });
    }

    const updatedAnime = await Animes.findByPk(id);

    return res.status(200).json({
      message: "Anime updated successfully",
      anime: {
        ...updatedAnime!.toJSON(),
        thumbnail_url: getSignedUrl(updatedAnime!.thumbnail_s3_key),
        banner_url: getSignedUrl(updatedAnime!.banner_s3_key)
      }
    });
  } catch (error) {
    console.error("Error updating anime:", error);
    next({ status: 500, error: "DB error updating anime" });
  }
}

async function deleteAnime(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const anime = await Animes.findByPk(id);
    if (!anime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    // Delete files from S3
    await deleteFromS3(anime.thumbnail_s3_key);
    await deleteFromS3(anime.banner_s3_key);

    const deleted = await Animes.destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ error: "Anime not deleted" });
    }

    return res.status(200).json({ message: "Anime deleted successfully" });
  } catch (error) {
    console.error("Error deleting anime:", error);
    next({ status: 500, error: "DB error deleting anime" });
  }
}

export {
  getAllAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime
};