import { copyFile } from "node:fs/promises";

// La exportación sobrescribe 404.html con el de Next; se restaura el propio.
await copyFile("public/404.html", "out/404.html");
