import { notFound } from "next/navigation";

// Cualquier ruta desconocida dentro de un idioma cae aquí y muestra el 404 propio.
export default function CatchAll(): never {
  notFound();
}
