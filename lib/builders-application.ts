export type BuildersApplication = {
  fullName: string;
  phone: string;
  email: string;
  residency: string;
  country: string;
  model: string;
  plotLocation: string;
  plotStatus: string;
  moveIn: string;
};

export type DocumentGroup = "land" | "funds";
export type Attachment = { id: string; group: DocumentGroup; file: File };
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 30 * 1024 * 1024;
export const MAX_GROUP_FILES = 5;
export const DOCUMENT_ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
const types: Record<string, string> = { pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png" };

export function validateDetails(data: BuildersApplication): Record<string, string> {
  const errors: Record<string, string> = {};
  if (data.fullName.trim().length < 2 || data.fullName.trim().length > 120) errors.fullName = "Enter your full legal name (2–120 characters).";
  if (!/^[+0-9()\s-]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 9 || data.phone.replace(/\D/g, "").length > 15) errors.phone = "Enter a valid WhatsApp phone number, including country code if outside Ghana.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) || data.email.length > 254) errors.email = "Enter a valid email address.";
  if (!["ghana", "diaspora"].includes(data.residency)) errors.residency = "Select where you currently live.";
  if (data.residency === "diaspora" && (data.country.trim().length < 2 || data.country.length > 100)) errors.country = "Enter your country of residence.";
  if (!["two-bedroom", "three-bedroom", "four-bedroom"].includes(data.model)) errors.model = "Choose a home model.";
  if (data.plotLocation.trim().length < 5 || data.plotLocation.length > 500) errors.plotLocation = "Enter your plot location or nearest landmark (5–500 characters).";
  if (!["land-title", "registered-indenture", "site-plan-only"].includes(data.plotStatus)) errors.plotStatus = "Select your land documentation status.";
  if (!["standard", "accelerated"].includes(data.moveIn)) errors.moveIn = "Choose your preferred payment and move-in plan.";
  return errors;
}

export function validateAttachment(file: Pick<File, "name" | "type" | "size">): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!types[ext] || (file.type && file.type !== types[ext])) return "Choose a PDF, JPG or PNG file.";
  if (file.size <= 0) return "This file is empty. Choose a readable document.";
  if (file.size > MAX_FILE_BYTES) return "Each file must be 10 MB or smaller.";
  return null;
}

export function validateDocuments(attachments: Attachment[]): string | null {
  if (!attachments.some(item => item.group === "land")) return "Attach at least one land document or site plan.";
  if (!attachments.some(item => item.group === "funds")) return "Attach at least one proof-of-income or proof-of-funds document.";
  for (const group of ["land", "funds"] as const) {
    if (attachments.filter(item => item.group === group).length > MAX_GROUP_FILES) return "Choose no more than 5 documents per category.";
  }
  if (attachments.reduce((sum, item) => sum + item.file.size, 0) > MAX_TOTAL_BYTES) return "All attachments together must be 30 MB or smaller.";
  for (const item of attachments) {
    const error = validateAttachment(item.file);
    if (error) return `${item.file.name}: ${error}`;
  }
  return null;
}

export function createApplicationPayload(data: BuildersApplication, attachments: Attachment[], requestId: string): FormData {
  const body = new FormData();
  for (const [key, value] of Object.entries(data)) body.append(key, key === "country" && data.residency === "ghana" ? "Ghana" : value.trim());
  body.append("cohort", "2027");
  body.append("consent", "1");
  body.append("clientRequestId", requestId);
  for (const item of attachments) body.append(item.group === "land" ? "landDocuments[]" : "fundsDocuments[]", item.file, item.file.name);
  return body;
}
