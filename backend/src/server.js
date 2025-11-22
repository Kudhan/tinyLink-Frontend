import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import linksRouter from "./routes/links.js";
import { requireAuth } from "./middleware/auth.js";
import prisma from "./prismaClient.js"; // <-- REQUIRED IMPORT

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/healthz", (req, res) => res.json({ ok: true }));

// API
app.use("/api/auth", authRouter);
app.use("/api/links", linksRouter);

// Protected test endpoint
app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Home
app.get("/", (req, res) => res.json({ message: "tinylink backend" }));

// --------------------------------------------------------
// 🚀 PUBLIC REDIRECT ROUTE (VERY IMPORTANT)
// This must be placed AFTER all /api routes
// --------------------------------------------------------
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  // quick reject invalid format to avoid DB hits
  if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
    return res.status(404).send("Not Found");
  }

  try {
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link || link.deleted) {
      return res.status(404).send("Not Found");
    }

    // update clicks + lastClicked
    await prisma.link.update({
      where: { code },
      data: {
        totalClicks: { increment: 1 },
        lastClicked: new Date()
      }
    });

    return res.redirect(302, link.target);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server Error");
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
