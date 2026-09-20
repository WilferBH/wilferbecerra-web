"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/content/types";
import { Check, Copy, Mail } from "./icons";

const gmailCompose = (to: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;

/** Copiar es la acción principal porque `mailto:` no hace nada sin programa de correo configurado. */
export function EmailActions({ email, t }: { email: string; t: Dictionary["contact"] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Respaldo si el navegador bloquea el portapapeles.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.append(field);
      field.select();
      ok = document.execCommand("copy");
      field.remove();
    }
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div data-reveal className="mt-12">
      <button
        type="button"
        onClick={copy}
        aria-label={`${t.copy}: ${email}`}
        className="group inline-flex items-center justify-between gap-6 rounded-full bg-fg py-2 pl-6 pr-2 text-bg transition-[scale] duration-150 active:scale-[0.98]"
      >
        <span className="font-medium sm:text-lg">{email}</span>
        <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-bg text-fg">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "y" : "n"}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              {copied ? <Check className="text-accent-bright" /> : <Copy />}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <p aria-live="polite" className="mt-3 h-5 font-mono text-xs text-accent-bright">
        {copied ? t.copied : ""}
      </p>

      <div className="mt-2 flex flex-wrap gap-4 text-sm">
        <a
          href={gmailCompose(email)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-fg-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          <Mail className="size-4" />
          {t.gmail}
        </a>
        <a href={`mailto:${email}`} className="text-fg-3 underline-offset-4 transition-colors hover:text-fg hover:underline">
          {t.mailApp}
        </a>
      </div>
    </div>
  );
}
