import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import { getArtworkPath } from "@/lib/artworks";

// Minimal MIME type map for common image types
const mimeTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

export const GET: APIRoute = async ({ params }) => {
  const { year, piece } = params;
  if (!year || !piece) return new Response("Not found", { status: 404 });

  const fullPath = getArtworkPath(year, piece);
  if (!fs.existsSync(fullPath)) return new Response("Not found", { status: 404 });

  const ext = path.extname(piece).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  const stream = fs.createReadStream(fullPath);

  // Wrap Node.js ReadStream in a Web ReadableStream
  const readableStream = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600", // optional caching
    },
  });
};
