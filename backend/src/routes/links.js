// src/routes/links.js
import express from "express";
import prisma from "../prismaClient.js";
import isUrl from "is-url-superb";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Code regex per spec
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

// Helper: normalize URL (ensure scheme)
function normalizeUrl(u) {
  if (!/^https?:\/\//i.test(u)) return `https://${u}`;
  return u;
}

// Helper: generate random code (6-8 chars, here 7 chars)
function generateCode(len = 7) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

/**
 * POST /api/links
 * Body: { target: string, code?: string }
 * Auth required.
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { target, code } = req.body;

    if (!target || typeof target !== "string") {
      return res.status(400).json({ error: "target is required" });
    }

    const normalized = normalizeUrl(target);
    if (!isUrl(normalized)) {
      return res.status(400).json({ error: "invalid target URL" });
    }

    let finalCode = code ? String(code) : undefined;
    if (finalCode) {
      if (!CODE_REGEX.test(finalCode)) {
        return res.status(400).json({ error: "code must match [A-Za-z0-9]{6,8}" });
      }
      // check uniqueness (only non-deleted conflict considered)
      const existing = await prisma.link.findUnique({ where: { code: finalCode }});
      if (existing && !existing.deleted) {
        return res.status(409).json({ error: "code already exists" });
      }
      // if existing but deleted, we allow creating with same code (soft-delete reuse)
    } else {
      // auto-generate until unique (rare collision)
      let tries = 0;
      do {
        finalCode = generateCode(7);
        const exists = await prisma.link.findUnique({ where: { code: finalCode }});
        if (!exists) break;
        tries++;
        if (tries > 5) break;
      } while (true);
    }

    const created = await prisma.link.create({
      data: {
        code: finalCode,
        target: normalized,
        ownerId: userId,
        deleted: false
      }
    });

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    return res.status(201).json({
      code: created.code,
      target: created.target,
      shortUrl: `${baseUrl}/${created.code}`,
      totalClicks: created.totalClicks,
      lastClicked: created.lastClicked,
      createdAt: created.createdAt
    });
  } catch (err) {
    // Prisma unique constraint or other DB errors
    if (err?.code === "P2002") {
      return res.status(409).json({ error: "code already exists" });
    }
    console.error("POST /api/links error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

/**
 * GET /api/links
 * List links for authenticated user.
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const links = await prisma.link.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" }
    });

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const result = links.map(l => ({
      code: l.code,
      target: l.target,
      shortUrl: `${baseUrl}/${l.code}`,
      totalClicks: l.totalClicks,
      lastClicked: l.lastClicked,
      deleted: l.deleted,
      createdAt: l.createdAt
    }));

    return res.json(result);
  } catch (err) {
    console.error("GET /api/links error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

/**
 * GET /api/links/:code
 * Return stats for a single code (must be owner)
 */
router.get("/:code", requireAuth, async (req, res) => {
  try {
    const { code } = req.params;
    if (!CODE_REGEX.test(code)) return res.status(400).json({ error: "invalid code format" });

    const link = await prisma.link.findUnique({ where: { code }});
    if (!link) return res.status(404).json({ error: "not found" });

    if (link.ownerId !== req.user.id) {
      return res.status(403).json({ error: "forbidden" });
    }

    return res.json({
      code: link.code,
      target: link.target,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked,
      deleted: link.deleted,
      createdAt: link.createdAt
    });
  } catch (err) {
    console.error("GET /api/links/:code error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

/**
 * DELETE /api/links/:code
 * Soft-delete (set deleted=true). Owner only.
 */
router.delete("/:code", requireAuth, async (req, res) => {
  try {
    const { code } = req.params;
    if (!CODE_REGEX.test(code)) return res.status(400).json({ error: "invalid code format" });

    const link = await prisma.link.findUnique({ where: { code }});
    if (!link) return res.status(404).json({ error: "not found" });

    if (link.ownerId !== req.user.id) {
      return res.status(403).json({ error: "forbidden" });
    }

    await prisma.link.update({
      where: { code },
      data: { deleted: true }
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/links/:code error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

export default router;
