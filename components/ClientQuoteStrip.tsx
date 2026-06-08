import { clientQuotes } from "@/lib/data";

export default function ClientQuoteStrip() {
  return (
    <section
      className="site-container py-10 sm:py-12"
      aria-label="Opiniones de clientes"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {clientQuotes.map((quote) => (
          <figure
            key={quote.author}
            className="rounded-xl card-wood px-4 py-4 sm:px-5 sm:py-5"
          >
            <div className="flex gap-0.5 mb-2" aria-hidden>
              {Array.from({ length: quote.rating }).map((_, index) => (
                <span
                  key={index}
                  className="material-symbols-outlined text-sm text-platinum-muted"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <blockquote className="text-sm text-on-surface leading-relaxed">
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-on-surface-variant">
              {quote.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
