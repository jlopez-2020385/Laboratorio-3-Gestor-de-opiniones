import { Router } from "express";
import {
  getUserById,
  getUsers,
  deleteUser,
  updatePassword,
  updateUser,
  updateProfilePicture,
} from "./user.controller.js";
import {
  getUserByIdValidator,
  deleteUserValidator,
  updatePasswordValidator,
  updateUserValidator,
  updateProfilePictureValidator,
} from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /adoptionSystem/v1/user/findUser/{uid}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /adoptionSystem/v1/user:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /adoptionSystem/v1/user/deleteUser/{uid}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /adoptionSystem/v1/user/updatePassword/{uid}:
 *   patch:
 *     summary: Update a user's password
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /adoptionSystem/v1/user/updateUser/{uid}:
 *   put:
 *     summary: Update a user's information
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser);

/**
 * @swagger
 * /adoptionSystem/v1/user/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update a user's profile picture
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 */
router.patch(
  "/updateProfilePicture/:uid",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
);

export default router;
