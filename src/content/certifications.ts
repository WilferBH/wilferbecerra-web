import type { Localized } from "./types";

export type Certification = {
  title: Localized;
  issuer: string;
  /** Formato "AAAA-MM". */
  date: string;
  status: "done" | "in-progress";
  url?: string;
  image?: string;
};

// Pendiente: añadir los títulos y certificados reales de Wilfer. La sección solo aparece si hay alguno.
export const certifications: Certification[] = [];
