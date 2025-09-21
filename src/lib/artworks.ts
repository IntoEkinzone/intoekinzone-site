import fs from "fs";
import path from "path";

const BASE = process.env.ARTWORK_DIR || "/artworks";

export function getYears(): string[] {
  return fs.readdirSync(BASE).filter((name) =>
    fs.statSync(path.join(BASE, name)).isDirectory()
  );
}

export function getArtworks(year: string): string[] {
  const dir = path.join(BASE, year);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => !fs.statSync(path.join(dir, f)).isDirectory());
}

export function getArtworkPath(year: string, file: string): string {
  return path.join(BASE, year, file);
}
