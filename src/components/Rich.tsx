import { Fragment, type ReactNode } from "react";

type Props = { text: string; split?: boolean };
type Segment = { text: string; em: boolean };

/** Convierte `*texto*` en <em>. La puntuación se une a la palabra anterior para que no quede suelta al saltar de línea. */
export function Rich({ text, split = false }: Props) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  if (!split) {
    return (
      <>
        {parts.map((p, i) => (p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : <Fragment key={i}>{p}</Fragment>))}
      </>
    );
  }

  const units: Segment[][] = [];
  let glue = false;
  for (const part of parts) {
    const em = part.startsWith("*");
    const raw = em ? part.slice(1, -1) : part;
    raw.split(/(\s+)/).forEach((token) => {
      if (token === "") return;
      if (/^\s+$/.test(token)) {
        glue = false;
        return;
      }
      if (glue && units.length) units[units.length - 1].push({ text: token, em });
      else units.push([{ text: token, em }]);
      glue = true;
    });
  }

  const render = (seg: Segment, key: number): ReactNode => (seg.em ? <em key={key}>{seg.text}</em> : <Fragment key={key}>{seg.text}</Fragment>);

  return (
    <>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      {units.map((unit, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className={`word ${unit.some((s) => s.em) ? "word-em" : ""}`} aria-hidden>
            <span style={{ "--w": i } as React.CSSProperties}>{unit.map(render)}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
