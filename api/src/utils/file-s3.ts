import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const BUCKET_NAME = process.env.BUCKET_NAME!;
if (!BUCKET_NAME) throw new Error("BUCKET_NAME is missing in .env");

const s3 = new AWS.S3({
  endpoint: process.env.S3_URL || undefined,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRETKEY,
  region: process.env.AWS_REGION || "ap-south-1",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

// Create bucket if it doesn't exist
export const createBucket = async (): Promise<void> => {
  const buckets = await s3.listBuckets().promise();
  if (!buckets.Buckets?.some((b) => b.Name === BUCKET_NAME)) {
    await s3.createBucket({ Bucket: BUCKET_NAME }).promise();
    console.log(`Bucket created: ${BUCKET_NAME}`);
  } else {
    console.log(`Bucket exists: ${BUCKET_NAME}`);
  }
};

// Create folders in the bucket
export const createFolders = async (folders: string[]): Promise<void> => {
  for (const folder of folders) {
    const folderKey = folder.endsWith("/") ? folder : `${folder}/`;
    await s3.putObject({ Bucket: BUCKET_NAME, Key: folderKey, Body: "" }).promise();
    console.log(`Folder created: ${folderKey}`);
  }
};

// List all folders in the bucket
export const listFolders = async (): Promise<string[]> => {
  const result = await s3.listObjectsV2({ Bucket: BUCKET_NAME, Delimiter: "/" }).promise();
  return result.CommonPrefixes?.map((p) => p.Prefix!) || [];
};

export const init = async (): Promise<void> => {
  // Ensure the bucket exists
  await createBucket();

  // Define the folders to create
  const initialFolders = [
    "anime-thumbnail",
    "anime-banner",
    "episode-video",
    "episode-thumbnail",
    "movie-videos",
    "movie-thumbnail",
    "playlist-thumbnails"
  ];

  // List existing folders to avoid duplicates
  const existingFolders = await listFolders();
  const foldersToCreate = initialFolders.filter(
    (f) => !existingFolders.includes(f + "/")
  );

  // Create missing folders
  if (foldersToCreate.length) {
    await createFolders(foldersToCreate);
  } else {
    console.log("All initial folders already exist.");
  }
};

export default { s3 , init, createBucket, createFolders, listFolders };
