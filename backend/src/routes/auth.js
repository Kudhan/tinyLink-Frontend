import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

// Helpers
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const BCRYPT_SALT_ROUNDS = 10;

// POST /api/auth/register
// Body: { email, password }
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "email and password required" });
    }

    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) {
      return res.status(409).json({ error: "email already registered" });
    }

    const hashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, password: hashed }
    });

    // Do not return password
    return res.status(201).json({ id: user.id, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

// POST /api/auth/login
// Body: { email, password }
// Returns: { token, expiresIn, user: { id, email } }
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "invalid credentials" });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({
      token,
      expiresIn: JWT_EXPIRES_IN,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

export default router;
