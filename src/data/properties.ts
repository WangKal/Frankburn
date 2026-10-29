import beachM from "@/assets/M.JPG";
import beachM1 from "@/assets/M1.JPG";
import beachP3 from "@/assets/P3.JPG";
import beachP4 from "@/assets/P4.JPG";
import beachP5 from "@/assets/P5.jpg";
import beachP6 from "@/assets/P6.jpg";
import beachP7 from "@/assets/P7.jpg";
import beachP8 from "@/assets/P8.jpg";
import beachP9 from "@/assets/P9.jpg";
import beachIm1 from "@/assets/im1.jpeg";
import beachIm2 from "@/assets/im2.jpeg";
import beachIm3 from "@/assets/im3.jpeg";
import beachIm5 from "@/assets/im5.jpeg";
import beachIm6 from "@/assets/im6.jpeg";
import beachG1 from "@/assets/G1.png";
import beachG2 from "@/assets/G2.png";
import beachAerial from "@/assets/beachfront/beachfront-aerial.jpg.asset.json";
import beachSunset from "@/assets/beachfront/beachfront-sunset.jpg.asset.json";

export type PropertyType = "Residential" | "Commercial" | "Land" | "Hospitality";

export const PROPERTY_TYPES: PropertyType[] = ["Residential", "Commercial", "Land", "Hospitality"];

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

// Listing photos from the brochure are CDN asset pointers named "<slug>-<n>.jpg.asset.json"
// Load property images directly from src/assets/listings
const listingFiles = import.meta.glob(
  "../assets/listings/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

const photos = (
  prefix: string,
  captions: (string | undefined)[] = []
): PropertyImage[] =>
  Object.entries(listingFiles)
    .map(([path, url]) => {
      const filename = path.split("/").pop() ?? "";

      const match = filename.match(
        new RegExp(`^${prefix}-(\\d+)\\.(jpg|jpeg|png|webp)$`, "i")
      );

      return match
        ? { n: Number(match[1]), src: url }
        : null;
    })
    .filter((x): x is { n: number; src: string } => x !== null)
    .sort((a, b) => a.n - b.n)
    .map(({ n, src }) => ({
      src,
      caption: captions[n - 1],
    }));


const reorder = (imgs: PropertyImage[], first: number) =>
  imgs.length > first ? [imgs[first], ...imgs.filter((_, i) => i !== first)] : imgs;

export const properties: Property[] = [
  {
    slug: "frankburn-beachfront-plots",
    title: "Frankburn Beachfront Plots",
    type: "Land",
    location: "Opposite Sand Pipper International School, Malindi",
    county: "Kilifi",
    price: 4_000_000,
    priceLabel: "From",
    size: "18 acres · 68 quarter-acre + 1 premium acre",
    summary:
      "A prime 18-acre gated beachfront development directly fronting the Indian Ocean, subdivided into quarter-acre homesites and one premium acre.",
    description: [
      "An exclusive chance in Malindi – a prime 18-acre beachfront property directly fronting the breathtaking Indian Ocean. The land is subdivided into one-acre and quarter-acre plots, offering flexible investment options for homeowners and investors alike.",
      "Neighbours include Seaview Resort & Lawfords Hotel on the right and Ocean Beach Resort on the left. The location is within walking distance of Naivas Supermarket, the Malindi Complex (KPLC, KRA and others), major banks, the police station, luxury resorts and white sandy beaches.",
    ],
    facts: [
      { label: "Total area", value: "18 acres" },
      { label: "Quarter-acre plot", value: "849 m² (0.21 acres)" },
      { label: "Premium plot", value: "3,397 m² (0.84 acres)" },
      { label: "Soil", value: "Sandy loam over coral" },
      { label: "Frontage", value: "Direct ocean access" },
      { label: "Title deeds", value: "Processed within 1 month" },
    ],
    features: [
      "Direct Indian Ocean frontage",
      "Gated, planned community",
      "5 m driveways and 2 m pedestrian sidewalks",
      "Clearly marked, numbered plot beacons",
      "Title deed for every plot",
      "Next to Seaview Resort, Lawfords Hotel & Ocean Beach Resort",
    ],
    options: [
      { name: "Quarter-acre homesite", price: "From KSh 4,000,000", detail: "849 m² · 23.20 m × 36.60 m · 68 plots available" },
      { name: "Premium 1-acre oceanfront", price: "KSh 75,000,000", detail: "3,397 m² · 92.80 m × 36.60 m · single plot" },
    ],
    images: [
      { src: beachP6, caption: "The beach at Frankburn" },
      { src: beachM, caption: "Aerial view of the property boundary" },
      { src: beachIm1, caption: "On site" },
      { src: beachIm2, caption: "On site" },
      { src: beachIm3, caption: "On site" },
      { src: beachIm5, caption: "On site" },
      { src: beachIm6, caption: "On site" },
      { src: beachP5, caption: "Ocean frontage" },
      { src: beachP7, caption: "Ocean frontage" },
      { src: beachP8, caption: "Ocean frontage" },
      { src: beachP9, caption: "Ocean frontage" },
      { src: beachM1, caption: "Location overview" },
      { src: beachP3, caption: "Location overview" },
      { src: beachP4, caption: "Location overview" },
      { src: beachG2, caption: "Quarter-acre plot dimensions" },
      { src: beachG1, caption: "Premium acre dimensions" },
      { src: beachAerial.url, caption: "Development concept" },
      { src: beachSunset.url, caption: "Development concept" },
    ],
    mapQuery: "-3.199055,40.117246",
    coords: { lat: -3.199055, lng: 40.117246 },
    featured: true,
    badge: "Flagship · Beachfront",
  },
  {
    slug: "thome-estate-maisonette",
    title: "Maisonette — Thome Estate",
    type: "Residential",
    location: "Thome Estate, Nairobi",
    county: "Nairobi",
    price: 60_000_000,
    size: "Approx. 5,811 sq ft / 540 m² built-up",
    summary: "A grand two-storey maisonette with en-suite bedrooms, study, family room and mini-bar area.",
    description: [
      "A substantial two-storey family home in the established Thome Estate. The house offers en-suite bedrooms, a study, a family room, a sunken lounge and a mini-bar area.",
      "Similar homes reportedly rent for KSh 220,000–250,000 per month, making it attractive for owner-occupiers and investors.",
    ],
    facts: [
      { label: "Built-up area", value: "5,811 sq ft / 540 m²" },
      { label: "Storeys", value: "2" },
      { label: "Bedrooms", value: "En-suite (confirm count)" },
      { label: "Reported rent", value: "KSh 220,000–250,000 / month" },
    ],
    features: ["En-suite bedrooms", "Study", "Family room", "Sunken lounge", "Mini-bar area"],
    rentalIncome: "KSh 220K–250K / month",
    images: photos("thome-maisonette", ["Front elevation", "Side elevation", "Sunken lounge", "Staircase"]),
    mapQuery: "Thome Estate, Nairobi, Kenya",
    featured: true,
  },
  {
    slug: "breeze-point-resort",
    title: "Breeze Point Resort",
    type: "Hospitality",
    location: "Kadzonzo, Mariakani, Kilifi",
    county: "Kilifi",
    price: 60_000_000,
    size: "Approx. 1.754 acres",
    summary: "An operating-style resort with hotel-room blocks, restaurant & bar, two swimming pools and gazebos.",
    description: [
      "Breeze Point Resort sits on approximately 1.754 acres in Kadzonzo, Mariakani. The property includes hotel-room blocks, two incomplete villa blocks, a restaurant/bar, dining room, two swimming pools and gazebos.",
      "A ready platform for a hospitality operator or investor looking to complete and expand an established coastal resort.",
    ],
    facts: [
      { label: "Land size", value: "Approx. 1.754 acres" },
      { label: "Swimming pools", value: "2" },
      { label: "Villa blocks", value: "2 (incomplete)" },
      { label: "Dining", value: "Restaurant, bar & dining room" },
    ],
    features: ["Hotel-room blocks", "Two swimming pools", "Restaurant & bar", "Dining room", "Gazebos", "Room to complete & expand"],
    images: reorder(photos("breeze-point-resort", ["Main block", "Pool & gardens", "Cottage block", "Guest room", "Villa block", "Gazebo & dining"]), 1),
    mapQuery: "Mariakani, Kilifi, Kenya",
    featured: true,
    badge: "Resort",
  },
  {
    slug: "kibokoni-50-acre-oceanfront",
    title: "50-Acre Oceanfront Agricultural Property",
    type: "Land",
    location: "Kibokoni, Sabaki, Malindi, Kilifi",
    county: "Kilifi",
    price: 335_000_000,
    priceNote: "Reserve price",
    size: "Approx. 50 acres (20.20 ha)",
    summary: "A rare 50-acre parcel fronting the Indian Ocean near the Sabaki estuary, north of Malindi.",
    description: [
      "Approximately 20.20 hectares (about 50 acres) of land at Kibokoni, Sabaki, fronting the Indian Ocean close to the Sabaki River estuary and the Malindi Golf & Country Club.",
      "Water and electricity are not connected to the property; services are reportedly available in the wider neighbourhood. Ideal for a large-scale resort, residential or agricultural project.",
    ],
    facts: [
      { label: "Land size", value: "20.20 ha (~50 acres)" },
      { label: "Frontage", value: "Indian Ocean" },
      { label: "Utilities", value: "Available in neighbourhood" },
      { label: "Price basis", value: "Reserve price" },
    ],
    features: ["Indian Ocean frontage", "Near Sabaki estuary", "Close to Malindi Golf & Country Club", "Large single parcel"],
    images: photos("kibokoni-50-acres", ["The parcel", "Coastal vegetation", "Open grassland", "Location sketch"]),
    mapQuery: "Kibokoni, Sabaki, Malindi, Kenya",
    featured: true,
    badge: "Oceanfront",
  },
  {
    slug: "tsavo-road-commercial-building",
    title: "Six-Storey Commercial Building",
    type: "Commercial",
    location: "Tsavo Road, Nairobi CBD",
    county: "Nairobi",
    price: 280_000_000,
    priceNote: "Negotiable",
    size: "Approx. 25,892 sq ft",
    summary: "A six-storey income-generating building with shops on multiple floors, most reportedly let.",
    description: [
      "A six-storey commercial building on busy Tsavo Road in the Nairobi CBD, with shops on multiple floors. Most shops are reportedly let.",
      "Reported rental income is about KSh 1,946,000 per month.",
    ],
    facts: [
      { label: "Floor area", value: "Approx. 25,892 sq ft" },
      { label: "Storeys", value: "6" },
      { label: "Occupancy", value: "Most shops reportedly let" },
      { label: "Reported rent", value: "KSh 1,946,000 / month" },
    ],
    features: ["Prime CBD frontage", "Shops on multiple floors", "Established tenants", "Strong monthly income"],
    rentalIncome: "KSh 1.95M / month",
    images: photos("tsavo-road-building", ["Street frontage", "Shop floors"]),
    mapQuery: "Tsavo Road, Nairobi, Kenya",
    featured: true,
    badge: "Income property",
  },
  {
    slug: "scandinavia-house-river-road",
    title: "Commercial Building — Scandinavia House",
    type: "Commercial",
    location: "River Road, Nairobi CBD",
    county: "Nairobi",
    price: 120_000_000,
    priceNote: "Negotiable",
    size: "Approx. 4,225 sq ft",
    summary: "A compact CBD commercial building with shops, rooftop office and shower room.",
    description: [
      "Scandinavia House on River Road offers shops, a rooftop office and a shower room. Most shops are reportedly let.",
      "Reported rental income is about KSh 810,000 per month.",
    ],
    facts: [
      { label: "Floor area", value: "Approx. 4,225 sq ft" },
      { label: "Occupancy", value: "Most shops reportedly let" },
      { label: "Reported rent", value: "KSh 810,000 / month" },
    ],
    features: ["River Road frontage", "Ground-floor shops", "Rooftop office", "Shower room"],
    rentalIncome: "KSh 810K / month",
    images: photos("scandinavia-house", ["Scandinavia House"]),
    mapQuery: "River Road, Nairobi, Kenya",
  },
  {
    slug: "mtwapa-luxury-apartment",
    title: "3-Bedroom Apartment — Mtwapa Luxury Apartments",
    type: "Residential",
    location: "Mtwapa, Kilifi",
    county: "Kilifi",
    price: 6_500_000,
    size: "Approx. 113 m²",
    bedrooms: "3",
    summary: "A spacious 3-bedroom apartment in a gated estate with a shared swimming pool.",
    description: [
      "A 3-bedroom apartment of about 113 m² on the 3rd floor of Block 8 (Apartment J) at Mtwapa Luxury Apartments.",
      "The estate offers a shared swimming pool and visitors' parking, with one dedicated parking space for the unit.",
    ],
    facts: [
      { label: "Bedrooms", value: "3" },
      { label: "Size", value: "Approx. 113 m²" },
      { label: "Unit", value: "3rd floor, Block 8, Apt J" },
      { label: "Parking", value: "1 space + visitors'" },
    ],
    features: ["Shared swimming pool", "Gated estate", "One parking space", "Visitors' parking"],
    images: photos("mtwapa-apartment", ["The estate", "The subject block", "Other blocks", "Swimming pool", "Lounge (typical unit)", "Kitchen (typical unit)"]),
    mapQuery: "Mtwapa, Kilifi, Kenya",
  },
  {
    slug: "bluebells-gardens-apartment",
    title: "2-Bedroom Apartment — Bluebells Gardens",
    type: "Residential",
    location: "Syokimau, Machakos",
    county: "Machakos",
    price: 7_500_000,
    size: "Approx. 110 m²",
    bedrooms: "2",
    summary: "A 2-bedroom apartment in a gated community with a shared pool, close to Nairobi.",
    description: [
      "A 2-bedroom apartment of about 110 m² on the 4th floor of Block M (Unit 403) at Bluebells Gardens, Syokimau.",
      "Residents enjoy a shared swimming pool and visitors' parking, with one parking space for the unit.",
    ],
    facts: [
      { label: "Bedrooms", value: "2" },
      { label: "Size", value: "Approx. 110 m²" },
      { label: "Unit", value: "4th floor, Block M, Unit 403" },
      { label: "Parking", value: "1 space + visitors'" },
    ],
    features: ["Shared swimming pool", "One parking space", "Visitors' parking", "Built-in wardrobes"],
    images: photos("bluebells-gardens", ["The block", "Staircase", "Bedroom", "Kitchen"]),
    mapQuery: "Syokimau, Machakos, Kenya",
  },
  {
    slug: "ack-sigona-maisonette",
    title: "Maisonette — A.C.K. Sigona",
    type: "Residential",
    location: "Off Nderi-Kari Road, Kikuyu, Kiambu",
    county: "Kiambu",
    price: 25_000_000,
    size: "0.25 acres · approx. 250 m² plinth",
    bedrooms: "4–5",
    summary: "A family maisonette on a quarter acre, freehold, with steady rental income.",
    description: [
      "A maisonette of about 250 m² plinth area on approximately 0.25 acres off Nderi-Kari Road, Kikuyu. Freehold interest is stated in the listing.",
      "Reported rental income is about KSh 35,000 per month.",
    ],
    facts: [
      { label: "Land size", value: "Approx. 0.25 acres" },
      { label: "Plinth area", value: "Approx. 250 m²" },
      { label: "Tenure", value: "Freehold (as listed)" },
      { label: "Reported rent", value: "KSh 35,000 / month" },
    ],
    features: ["Quarter-acre compound", "Freehold", "Elevated water tank", "Spacious lounge"],
    rentalIncome: "KSh 35K / month",
    notes: ["The listing heading says 4 bedrooms while the description says 5 — please confirm."],
    images: photos("sigona-maisonette", ["Front view", "Lounge", "Kitchen", "Side view"]),
    mapQuery: "Sigona, Kikuyu, Kenya",
  },
  {
    slug: "bandari-villas-house-85",
    title: "Villa — House No. 85, Bandari Villas",
    type: "Residential",
    location: "Bombolulu, Mombasa",
    county: "Mombasa",
    price: 15_000_000,
    size: "Two-storey villa, gated estate",
    bedrooms: "3–4",
    summary: "A two-storey villa in a gated Mombasa estate with strong rental demand.",
    description: [
      "House No. 85 at Bandari Villas is a two-storey villa within a gated estate in Bombolulu.",
      "Similar homes reportedly rent for about KSh 50,000 per month.",
    ],
    facts: [
      { label: "Type", value: "Two-storey villa" },
      { label: "Bedrooms", value: "3–4 (confirm)" },
      { label: "Estate", value: "Gated" },
      { label: "Reported rent", value: "~KSh 50,000 / month" },
    ],
    features: ["Gated estate", "Two storeys", "Fitted kitchen", "Built-in wardrobes"],
    rentalIncome: "~KSh 50K / month",
    notes: ["The listing heading says 4 bedrooms but the detailed description says 3 — please confirm."],
    images: photos("bandari-villa", ["The villa", "Living area", "Kitchen", "Bedroom"]),
    mapQuery: "Bombolulu, Mombasa, Kenya",
  },
  {
    slug: "kawala-agricultural-land",
    title: "Agricultural Land — Kawala",
    type: "Land",
    location: "Kawala, Mariakani, Kilifi",
    county: "Kilifi",
    price: 36_000_000,
    size: "Approx. 8.945 acres",
    summary: "Nearly 9 acres of freehold vacant land with water and electricity nearby.",
    description: [
      "Approximately 8.945 acres of vacant land under light natural vegetation at Kawala, Mariakani. Freehold interest is stated in the listing.",
      "Water and electricity are reportedly available nearby for connection.",
    ],
    facts: [
      { label: "Land size", value: "Approx. 8.945 acres" },
      { label: "Tenure", value: "Freehold (as listed)" },
      { label: "Utilities", value: "Available nearby" },
    ],
    features: ["Freehold", "Vacant & ready", "Water nearby", "Electricity nearby"],
    images: photos("kawala-land", ["View a", "View b", "View c", "View d"]),
    mapQuery: "Mariakani, Kilifi, Kenya",
  },
  {
    slug: "shimanzi-commercial-yard",
    title: "Commercial Yard — Shimanzi Road",
    type: "Commercial",
    location: "Shimanzi Road, Mombasa Island",
    county: "Mombasa",
    price: 30_000_000,
    size: "Approx. 0.1977 acres",
    summary: "A secured yard near the port with site office, storage and ablution blocks.",
    description: [
      "A yard of about 0.1977 acres on Shimanzi Road with a site office, storage room and two ablution blocks.",
      "The yard is jointly secured/developed with the adjacent plot — please confirm access and boundaries during viewing.",
    ],
    facts: [
      { label: "Land size", value: "Approx. 0.1977 acres" },
      { label: "Structures", value: "Office, store, 2 ablution blocks" },
      { label: "Location", value: "Shimanzi industrial area" },
    ],
    features: ["Near Mombasa port", "Site office", "Storage room", "Ablution blocks"],
    notes: ["Jointly secured with the adjacent plot — confirm access and boundaries."],
    images: photos("shimanzi-yard", ["The yard", "The yard", "Gate area", "Workshop"]),
    mapQuery: "Shimanzi Road, Mombasa, Kenya",
  },
  {
    slug: "mtwapa-residential-plot",
    title: "Vacant Residential Plot — Mtwapa",
    type: "Land",
    location: "Mtwapa, Kilifi",
    county: "Kilifi",
    price: 4_000_000,
    size: "Approx. 0.0921 acres",
    summary: "A freehold residential plot near Naivas/Petrocity and Bambino Academy.",
    description: [
      "A vacant residential plot of about 0.0921 acres in Mtwapa. Freehold interest is stated in the listing.",
      "Located near Naivas/Petrocity and Bambino Academy, in an area with neighbouring developments. No buildings were on the plot at inspection.",
    ],
    facts: [
      { label: "Land size", value: "Approx. 0.0921 acres" },
      { label: "Tenure", value: "Freehold (as listed)" },
      { label: "Nearby", value: "Naivas/Petrocity, Bambino Academy" },
    ],
    features: ["Freehold", "Ready to build", "Established neighbourhood", "Near shopping & schools"],
    images: photos("mtwapa-plot", ["View a", "View b", "View c", "View d"]),
    mapQuery: "Mtwapa, Kilifi, Kenya",
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const featuredProperties = properties.filter((p) => p.featured);

export const counties = Array.from(new Set(properties.map((p) => p.county))).sort();

export const countByType = (type: PropertyType) => properties.filter((p) => p.type === type).length;

export const coverOf = (p: Property) => p.images[0]?.src ?? "";
