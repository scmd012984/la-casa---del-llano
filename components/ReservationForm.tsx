"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { eventReservationTypes } from "@/lib/data";
import { buildReservationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const inputClass =
  "w-full rounded-lg bg-surface-container-low border border-outline-variant/50 px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50";

function isValidEventType(id: string | null) {
  return id !== null && eventReservationTypes.some((t) => t.id === id);
}

type ReservationFormProps = {
  defaultEventType?: string;
};

export default function ReservationForm({
  defaultEventType = "mesa",
}: ReservationFormProps) {
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get("tipo");
  const initialType = isValidEventType(tipoParam) ? tipoParam! : defaultEventType;

  const [eventType, setEventType] = useState(initialType);
  const [bottleService, setBottleService] = useState(
    initialType === "vip" || initialType === "cumpleanos" || initialType === "rumba-privada"
  );
  const [foodService, setFoodService] = useState(
    initialType === "cumpleanos" || initialType === "rumba-privada" || initialType === "familiar"
  );
  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = buildReservationMessage({
      eventType,
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      guests: String(formData.get("guests") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      bottleService,
      foodService,
    });

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  const selectedType = eventReservationTypes.find((t) => t.id === eventType);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg bg-tertiary-container/20 border border-tertiary/20 px-4 py-3 text-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-tertiary text-base align-middle mr-1">
          bolt
        </span>
        Al enviar, abrimos WhatsApp con tu solicitud lista para confirmar al
        instante.
      </div>

      <div>
        <label htmlFor="eventType" className="block text-sm text-on-surface-variant mb-1.5">
          Tipo de reserva / evento
        </label>
        <select
          id="eventType"
          name="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
          className={inputClass}
        >
          {eventReservationTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
        {selectedType && (
          <p className="text-sm text-on-surface-variant mt-2">
            {selectedType.description}
          </p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm text-on-surface-variant mb-1">
          Servicios adicionales
        </legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={bottleService}
            onChange={(e) => setBottleService(e.target.checked)}
            className="w-4 h-4 rounded border-outline-variant accent-secondary"
          />
          <span className="text-sm text-on-surface">
            Servicio de botellas premium
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={foodService}
            onChange={(e) => setFoodService(e.target.checked)}
            className="w-4 h-4 rounded border-outline-variant accent-secondary"
          />
          <span className="text-sm text-on-surface">
            Catering / comida y tapas
          </span>
        </label>
      </fieldset>

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
            Teléfono / WhatsApp
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
            Fecha del evento
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={today}
            className={inputClass}
          />
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30, 50, 80, 100].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persona" : "personas"}
              </option>
            ))}
            <option value="100+">Más de 100 personas</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm text-on-surface-variant mb-1.5">
          Detalles del evento
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tipo de celebración, botellas preferidas, menú de tapas, karaoke, decoración..."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-secondary text-on-secondary font-semibold hover:bg-secondary-container transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-xl">chat</span>
        Confirmar por WhatsApp
      </button>
    </form>
  );
}
