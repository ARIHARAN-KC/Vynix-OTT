import { default as express } from "express";
import { validate } from "../../middlewares/validators/validate.js";
import multer from "multer";
import AWS from "aws-sdk";
import db from "../../models/index.js";
import { getHString } from "../../libs/index.js";

const { Turfs, User } = db;
export const router = express.Router();

const s3 = new AWS.S3({
  endpoint: process.env.S3_URL,
  accessKeyId: process.env.S3_ACCESSKEY,
  secretAccessKey: process.env.S3_SECRETKEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

router
  .route("/upload/:id")
  .post(validate, upload.single("file") as any, async (req: any, res: any) => {
    const { id } = req.params;
    const { type, fileName, oldFileName } = req.query;
    const reqUser = getHString(req, "user-id");

    if (!req.file) {
      return res.status(400).json({ error: "Failed to upload a file" });
    }
    if (!type || typeof type !== "string") {
      return res.status(400).json({ error: "Type is required" });
    }
    if (!["turf-photo", "logo", "picture"].includes(type)) {
      return res.status(400).json({ error: "Type is invalid" });
    }
    if (!fileName || fileName.toString().length < 1) {
      return res.status(400).json({ error: "File Name is required" });
    }

    const bucketName =
      process.env["S3_BUCKET_NAME_" + type.toUpperCase()] || "";
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName.toString(),
      Body: req.file.buffer,
    };

    try {
      const uploadData = await s3.upload(uploadParams).promise();

      if (oldFileName && oldFileName !== fileName) {
        const deleteParams = {
          Bucket: bucketName,
          Key: oldFileName.toString(),
        };
        try {
          await s3.deleteObject(deleteParams).promise();
          console.log(`Deleted old file: ${oldFileName}`);
        } catch (deleteErr) {
          console.error("Failed to delete old file:", deleteErr);
        }
      }

      if (type === "turf-photo") {
        const turf = await Turfs.findByPk(id);
        if (turf && turf.id) {
          const updatedPhotos = [
            ...(turf.photo && turf.photo.length ? turf.photo : []),
            fileName,
          ];
          const [affectedRows] = await Turfs.update(
            { photo: updatedPhotos, updatedBy: reqUser },
            { where: { id } }
          );
          if (affectedRows < 1) {
            return res
              .status(400)
              .json({ error: "Failed to update turf photo" });
          }
          return res.status(200).json({ isUploaded: true, fileId: fileName });
        } else {
          return res.status(500).json({ error: "Turf not found" });
        }
      } else if (type === "picture") {
        const [affectedRows] = await User.update(
          { picture: fileName },
          { where: { id } }
        );
        if (affectedRows < 1) {
          return res
            .status(400)
            .json({ error: "Failed to update user picture" });
        }
        return res.status(200).json({ isUploaded: true, fileId: fileName });
      } else if (type === "logo") {
        // for logo
        return res.status(200).json({ isUploaded: true, fileId: fileName });
      }
    } catch (uploadErr) {
      console.error("Upload error:", uploadErr);
      return res.status(500).json({ error: "Error uploading file" });
    }
  });

router.route("/delete/:id").delete(validate, async (req: any, res: any) => {
  const { id } = req.params;
  const { type, fileName } = req.query;
  const reqUser = getHString(req, "user-id");

  if (!type || typeof type !== "string") {
    return res.status(400).json({ error: "Type is required" });
  }
  if (!["turf-photo", "logo", "picture"].includes(type)) {
    return res.status(400).json({ error: "Type is invalid" });
  }
  if (!fileName || fileName.toString().length < 1) {
    return res.status(400).json({ error: "File Name is required" });
  }

  const deleteParams = {
    Bucket: process.env["S3_BUCKET_NAME_" + type.toUpperCase()] || "",
    Key: fileName.toString(),
  };

  try {
    await s3.deleteObject(deleteParams).promise();

    if (type === "turf-photo") {
      const turf = await Turfs.findByPk(id);
      if (turf && turf.id) {
        const updatedPhotos = (turf.photo || []).filter(
          (photo: string) => photo !== fileName
        );
        const [affectedRows] = await Turfs.update(
          { photo: updatedPhotos, updatedBy: reqUser },
          { where: { id } }
        );
        if (affectedRows < 1) {
          return res
            .status(400)
            .json({ error: "Failed to update turf after delete" });
        } else {
          return res.status(200).json({ isDeleted: true });
        }
      } else {
        return res.status(500).json({ error: "Turf not found" });
      }
    } else if (type === "logo") {
      return res.status(200).json({ isDeleted: true });
    } else if (type === "picture") {
      return res.status(200).json({ isDeleted: true });
    }
  } catch (err) {
    console.error("Error deleting file:", err);
    return res.status(400).json({ error: "Failed to delete a file" });
  }
});
