import { Request, Response, NextFunction } from "express";
import { createFolders, listFolders } from "../../utils/file-s3.js";

export const addFoldersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { folders } = req.body;
    if (!folders || !Array.isArray(folders) || !folders.length) {
      return res.status(400).json({ error: "Folders must be a non-empty array of strings" });
    }

    await createFolders(folders);

    return res.status(200).json({
      message: `Folders added successfully!`,
    });
  } catch (err: any) {
    console.error("Error adding folders:", err);
    return res.status(500).json({ error: err.message || "Failed to add folders" });
  }
};

export const getFoldersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const folders = await listFolders();
    return res.status(200).json({ folders });
  } catch (err: any) {
    console.error("Error fetching folders:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch folders" });
  }
};
