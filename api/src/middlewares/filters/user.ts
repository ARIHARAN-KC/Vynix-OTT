import Sequelize from "sequelize";
import { Request, Response, NextFunction } from "express";
import processFilters from "./processFilters.js";

const Op = Sequelize.Op;

export function user(req: Request, res: Response, next: NextFunction) {
  const { userName, email } = req.query;
  const conditions = [];

  // conditions.push({
  //     role: {
  //         [Op.ne]: `SUPERADMIN`
  //     }
  // });

  if (userName) {
    conditions.push({
      name: {
        [Op.iLike]: `%${userName}%`,
      },
    });
  }
  
  if (email) {
    conditions.push({
      email: {
        [Op.iLike]: `%${email}%`,
      },
    });
  }

  processFilters(req, res, next, conditions);
}
