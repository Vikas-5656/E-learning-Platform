import express from "express";
import { register, login, logout } from "../controllers/auth";

const router = express.Router();

router.post("/Register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;