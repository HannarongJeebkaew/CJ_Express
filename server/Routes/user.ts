import express from "express";
const router = express.Router();
import { login, register } from "../Controllers/users";
//localhost:5000/api/register/
http: router.post("/register", register);
router.post("/login", login);
router.post("/add", login);

export default router;
