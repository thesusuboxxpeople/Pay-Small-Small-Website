export const buildersModels = [
  { id: "two-bedroom", name: "Modern Villa", bedrooms: 2, monthly: 13000, image: "/builders-club/two-bedroom.png", features: ["2 en-suite bedrooms", "Guest powder room", "Open-plan living and dining", "Balcony and paved compound"] },
  { id: "three-bedroom", name: "Executive Residence", bedrooms: 3, monthly: 16000, image: "/builders-club/three-bedroom.png", features: ["3 en-suite bedrooms", "Private family lounge", "Master balcony", "Modern fitted kitchen and perimeter wall"] },
  { id: "four-bedroom", name: "Luxury Duplex", bedrooms: 4, monthly: 18000, image: "/builders-club/four-bedroom.png", features: ["4 en-suite bedrooms", "Double-volume living room", "Executive study", "Master suite with terrace and compound"] },
] as const;
export const BUILDERS_TENOR = 48;
export const BUILDERS_PHONE = "+233303978485";
export const formatGhs = (value: number) => `GHS ${value.toLocaleString("en-GH")}`;
