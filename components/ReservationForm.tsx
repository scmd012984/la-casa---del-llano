"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg bg-surface-container-low border border-outline-variant/50 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50";

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl p-8 text-center bg-surface-container border border-secondary/30">
        <p className="font-display text-2xl font-bold text-secondary neon-glow-stone mb-2">
          ¡Reserva recibida!
        </p>
        <p className="text-on-surface-variant">
          Nos pondremos en contacto contigo para confirmar tu mesa.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-on-surface-variant mb-1.5">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-on-surface-variant mb-1.5">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="+58 412-000-0000"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="date" className="block text-sm text-on-surface-variant mb-1.5">
            Fecha
          </label>
          <input id="date" name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm text-on-surface-variant mb-1.5">
            Hora
          </label>
          <input id="time" name="time" type="time" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm text-on-surface-variant mb-1.5">
            Personas
          </label>
          <select id="guests" name="guests" required className={inputClass}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persona" : "personas"}
              </option>
            ))}
            <option value="9+">9 o más (VIP)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm text-on-surface-variant mb-1.5">
          Notas especiales
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Cumpleaños, mesa VIP, preferencias alimentarias..."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-secondary text-on-secondary font-semibold hover:bg-secondary-container transition-colors"
      >
        Confirmar Reserva
      </button>
    </form>
  );
}
