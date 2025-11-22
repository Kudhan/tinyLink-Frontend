import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function requireAuth(req, res, next) {
  try {
    const auth = req.get("Authorization") || "";
    const match = auth.match(/^Bearer (.+)$/i);
    if (!match) return res.status(401).json({ error: "missing token" });

    const token = match[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: "invalid token" });
    }

    // attach user to request
    const user = await prisma.user.findUnique({ where: { id: decoded.userId }});
    if (!user) return res.status(401).json({ error: "invalid token" });

    req.user = { id: user.id, email: user.email };
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
}
