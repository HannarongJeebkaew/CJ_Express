
import express from "express";
const router = express.Router();
import { currentUser, login, register } from "../Controllers/auth";
import { auth } from "../Middlewares/auth";
//localhost:5000/api/register/
router.post("/register", register);
router.post("/login", login);
router.post("/add", login);
router.post("/current-user",auth, currentUser);

export default router;
