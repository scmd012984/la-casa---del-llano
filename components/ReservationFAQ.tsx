import Link from "next/link";
import { conversionCTAs, reservationFaq } from "@/lib/data";

export default function ReservationFAQ() {
  return (
    <section
      id="preguntas-reserva"
      className="site-container scroll-mt-24 py-16 sm:py-20"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="eyebrow-llano mb-2">Antes de reservar</p>
          <h2 className="font-display text-3xl text-on-surface">
            Preguntas <span className="title-accent">frecuentes</span>
          </h2>
        </div>
        <div className="space-y-3">
          {reservationFaq.map((item) => (
            <details
              key={item.id}
              className="group rounded-xl card-wood overflow-hidden open:bg-surface-container-high/40"
            >
              <summary className="cursor-pointer list-none px-4 py-3.5 sm:px-5 sm:py-4 font-semibold text-sm text-on-surface flex items-center justify-between gap-3">
                <span>{item.question}</span>
                <span
                  className="material-symbols-outlined text-on-surface-variant transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  expand_more
                </span>
              </summary>
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={conversionCTAs.vip.href} className="btn-led btn-led--sm">
            {conversionCTAs.vip.label}
          </Link>
          <Link
            href={conversionCTAs.evento.href}
            className="btn-led btn-led--alt btn-led--sm"
          >
            {conversionCTAs.evento.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
