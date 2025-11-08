import fileS3 from "./file-s3.js";//default import fileS3
import { v4 as uuidv4 } from "uuid";

const { s3 } = fileS3;

export const uploadToS3 = async (file: Express.Multer.File, folder: string): Promise<string> => {
  const fileExtension = file.originalname.split('.').pop();
  const key = `${folder}/${uuidv4()}.${fileExtension}`;
  
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  await s3.upload(uploadParams).promise();
  return key;
};

export const deleteFromS3 = async (key: string): Promise<void> => {
  if (!key) return;
  
  const deleteParams = {
    Bucket: process.env.BUCKET_NAME!,
    Key: key
  };

  try {
    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.error(`Error deleting file from S3: ${key}`, error);
    throw error;
  }
};

export const getSignedUrl = (key: string, expiresIn: number = 3600): string => {
  if (!key) return "";
  
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    Expires: expiresIn
  });
};

export const generateFileKey = (folder: string, originalName: string): string => {
  const fileExtension = originalName.split('.').pop();
  return `${folder}/${uuidv4()}.${fileExtension}`;
};