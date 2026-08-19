export type Artwork = {
  name: string;
  slug: string;
  year: string;
  metadata: ImageMetadata;
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

const imageImports = import.meta.glob<{ default: ImageMetadata }>(
  "/src/artworks/*/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const artworks = Object.entries(imageImports).reduce(
  (acc, [path, file]) => {
    const year = path.split("/")[3];

    const filename = path.split("/").pop() ?? "";

    const name = filename.replace(/\.[^/.]+$/, "");

    const slug = slugify(name);

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      name,
      slug,
      year,
      metadata: file.default,
    });

    acc[year].sort((a, b) => a.name.localeCompare(b.name));

    return acc;
  },
  {} as Record<string, Artwork[]>,
);

export const artworksByYear = artworks;

export const uniqueYears = Object.keys(artworksByYear).sort((a, b) =>
  b.localeCompare(a),
);

export const allArtworks = Object.values(artworksByYear).flat();