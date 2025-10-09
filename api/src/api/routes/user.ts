import { default as express } from "express";
import * as userController from "../controllers/user.js";
import { userRules } from "../../middlewares/validators/rules/user.js";
import { validate } from "../../middlewares/validators/validate.js";
import filter from "../../middlewares/filters/index.js";
import { simpleValidate } from "../../middlewares/validators/validate.js";
export const router = express.Router();

router
    .route("/:id")
    .get(userRules.read, validate, userController.read)
    .delete(userRules.destroy, validate, userController.destroy)

router
    .route("/update-profile")
    .patch(userRules.updateProfile, validate, userController.updateProfile)

router
  .route("/")
  .get(userRules.filter, validate, filter.user, userController.users)
  .patch(userRules.updateProfile, validate, userController.updateProfile)
  .post(userRules.create, simpleValidate, userController.create);

router
  .patch("/change-password", userRules.changePassword, validate, userController.changePassword);