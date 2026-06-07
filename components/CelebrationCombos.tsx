"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  celebrationCombos,
  celebrationCombosModule,
  type CelebrationComboId,
} from "@/lib/data";

const celebrationFilterMap: Record<string, CelebrationComboId[]> = {
  Cumpleaños: ["rumbero", "platino"],
  "Eventos corporativos": ["corporativo", "platino"],
  "Bodas y aniversarios": ["platino", "familiar"],
  Despedidas: ["rumbero", "platino"],
  Ascensos: ["rumbero", "corporativo"],
  "Celebraciones familiares": ["familiar", "rumbero"],
};

const accentClasses = {
  secondary: "card-wood celebration-combo-card--secondary",
  tertiary: "card-wood celebration-combo-card--tertiary",
} as const;

type CelebrationCombosProps = {
  showIntro?: boolean;
  className?: string;
};

export default function CelebrationCombos({
  showIntro = true,
  className = "",
}: CelebrationCombosProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visibleCombos = useMemo(() => {
    if (!activeFilter) return celebrationCombos;
    const ids = celebrationFilterMap[activeFilter] ?? [];
    return celebrationCombos.filter((combo) => ids.includes(combo.id));
  }, [activeFilter]);

  return (
    <section
      id={celebrationCombosModule.id}
      className={`celebration-combos scroll-mt-24 ${className}`.trim()}
      aria-labelledby="celebration-combos-heading"
    >
      {showIntro && (
        <header className="celebration-combos-header">
          <p className="celebration-combos-eyebrow">
            {celebrationCombosModule.eyebrow}
          </p>
          <h2
            id="celebration-combos-heading"
            className="type-section-title text-on-surface mb-3"
          >
            {celebrationCombosModule.title}
          </h2>
          <p className="celebration-combos-lead">
            {celebrationCombosModule.description}
          </p>
          <p className="celebration-combos-policy">
            {celebrationCombosModule.familyPolicy}
          </p>
        </header>
      )}

      <div className="celebration-combos-filters" role="group" aria-label="Tipo de celebración">
        <button
          type="button"
          className={`celebration-combos-filter${activeFilter === null ? " celebration-combos-filter--active" : ""}`}
          onClick={() => setActiveFilter(null)}
        >
          Todos los combos
        </button>
        {celebrationCombosModule.celebrationTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`celebration-combos-filter${activeFilter === type ? " celebration-combos-filter--active" : ""}`}
            onClick={() =>
              setActiveFilter((current) => (current === type ? null : type))
            }
          >
            {type}
          </button>
        ))}
      </div>

      <div className="celebration-combos-grid">
        {visibleCombos.map((combo) => (
          <article
            key={combo.id}
            className={`celebration-combo-card ${accentClasses[combo.accent]}`}
          >
            <div className="celebration-combo-card-top">
              <span className="material-symbols-outlined celebration-combo-icon">
                {combo.icon}
              </span>
              <span className={`celebration-combo-tier celebration-combo-tier--${combo.accent}`}>
                {combo.tier}
              </span>
            </div>

            <h3 className="celebration-combo-name">{combo.name}</h3>
            <p className="celebration-combo-tagline">{combo.tagline}</p>
            <p className="celebration-combo-desc">{combo.description}</p>

            <div className="celebration-combo-meta">
              <span className="celebration-combo-meta-item">
                <span className="material-symbols-outlined">groups</span>
                {combo.guests}
              </span>
              <span className="celebration-combo-meta-item">
                <span className="material-symbols-outlined">star</span>
                {combo.highlight}
              </span>
            </div>

            <div className="celebration-combo-ideal">
              <span className="celebration-combo-ideal-label">Ideal para</span>
              <div className="celebration-combo-ideal-tags">
                {combo.idealFor.map((item) => (
                  <span key={item} className="celebration-combo-ideal-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <ul className="celebration-combo-includes">
              {combo.includes.map((item) => (
                <li key={item}>
                  <span className="material-symbols-outlined">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={`/reserva?tipo=${combo.reservationType}&combo=${combo.id}#formulario-reserva`}
              className={`celebration-combo-cta celebration-combo-cta--${combo.accent}`}
            >
              Cotizar {combo.name}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </article>
        ))}
      </div>

      {visibleCombos.length === 0 && (
        <p className="celebration-combos-empty" role="status">
          No hay combos para ese filtro. Prueba otro tipo de celebración o
          contáctanos para un paquete a medida.
        </p>
      )}
    </section>
  );
}
