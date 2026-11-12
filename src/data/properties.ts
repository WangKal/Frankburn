import propertyData from "./properties.json";

export type PropertyType =
  | "Residential"
  | "Commercial"
  | "Land"
  | "Hospitality";

export const PROPERTY_TYPES: PropertyType[] = [
  "Residential",
  "Commercial",
  "Land",
  "Hospitality",
];

export interface PropertyImage {
  src: string;
  caption?: string;
}

export interface PropertyFact {
  label: string;
  value: string;
}

export interface PropertyOption {
  name: string;
  price: string;
  detail: string;
}

export interface Property {
  slug: string;
  title: string;
  type: PropertyType;
  location: string;
  county: string;
  price: number;
  priceLabel?: string;
  priceNote?: string;
  size: string;
  bedrooms?: string;
  summary: string;
  description: string[];
  facts: PropertyFact[];
  features: string[];
  rentalIncome?: string;
  options?: PropertyOption[];
  notes?: string[];
  images: PropertyImage[];
  mapQuery: string;
  coords?: { lat: number; lng: number };
  featured?: boolean;
  badge?: string;
}

interface PropertyData {
  version: number;
  properties: Property[];
}


const assetFiles = import.meta.glob(
  "/src/assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

const resolveImage = (src: string): string => {
  const normalized = `/src/assets/${src}`
    .replace(/\\/g, "/")
    .toLowerCase();

  const match = Object.entries(assetFiles).find(
    ([path]) => path.toLowerCase() === normalized
  );

  return match?.[1] ?? "";
};

const propertyPlaceholders: Record<PropertyType, string> = {
  Hospitality: resolveImage("listings/hospitality-property.jpg"),
  Commercial: resolveImage("listings/commercial-property.jpg"),
  Land: resolveImage("listings/land-property.jpg"),
  Residential: resolveImage("listings/residential-property.jpg"),
};

const data = propertyData as PropertyData;

export const properties: Property[] = data.properties.map(
  (property) => {
    const placeholder = propertyPlaceholders[property.type];

    const images = (property.images ?? [])
      .map((image) => ({
        ...image,
        src: resolveImage(image.src),
      }))
      .filter((image) => image.src);

    return {
      ...property,
      images:
        images.length > 0
          ? images
          : [
              {
                src: placeholder,
                caption: property.title,
              },
            ],
    };
  }
);

export const getProperty = (slug: string) =>
  properties.find((property) => property.slug === slug);

export const featuredProperties = properties.filter(
  (property) => property.featured
);

export const counties = Array.from(
  new Set(properties.map((property) => property.county))
).sort();

export const countByType = (type: PropertyType) =>
  properties.filter((property) => property.type === type).length;

export const coverOf = (property: Property) =>
  property.images[0]?.src ?? "";
