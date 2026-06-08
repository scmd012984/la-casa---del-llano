import Link from "next/link";
import { getTonightHighlight } from "@/lib/tonight";

export default function TonightAtLaCasa() {
  const tonight = getTonightHighlight();

  return (
    <section
      id="esta-noche"
      className="site-container scroll-mt-24 -mt-6 sm:-mt-8 mb-2 sm:mb-0"
      aria-label="Programación de esta noche"
    >
      <div
        className={`rounded-xl border px-4 py-4 sm:px-5 sm:py-5 ${
          tonight.isOpen
            ? "card-wood border-outline-variant/40"
            : "bg-surface-container-low border-outline-variant/25"
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow-llano mb-1.5">Esta noche en La Casa</p>
            <h2 className="font-display text-xl sm:text-2xl text-on-surface leading-snug">
              {tonight.headline}
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
              {tonight.summary}
            </p>
            <p className="text-xs text-on-surface-variant/90 mt-2">
              <span className="material-symbols-outlined mr-1 align-middle text-sm">
                schedule
              </span>
              Horario: {tonight.hours}
            </p>
            {tonight.isOpen ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {tonight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-outline-variant/50 bg-surface-container-high px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          {tonight.isOpen ? (
            <Link
              href={tonight.href}
              className="btn-led btn-led--sm shrink-0 self-start sm:mt-1"
            >
              {tonight.ctaLabel}
            </Link>
          ) : (
            <Link
              href="/eventos"
              className="btn-led btn-led--alt btn-led--sm shrink-0 self-start sm:mt-1"
            >
              Ver cartelera
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
