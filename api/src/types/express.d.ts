import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      files?: {
        thumbnail?: Express.Multer.File[];
        banner?: Express.Multer.File[];
      };
    }
  }
}