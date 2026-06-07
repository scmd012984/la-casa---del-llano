import Link from "next/link";

export default function ReservationFab() {
  return (
    <Link
      href="/reserva"
      className="btn-led fixed bottom-24 md:bottom-8 right-8 z-40 p-4 group"
      aria-label="Reservar mesa"
    >
      <span className="material-symbols-outlined text-3xl">calendar_today</span>
      <span className="absolute right-full mr-4 card-wood text-on-surface px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-xs font-semibold">
        Reservar mesa
      </span>
    </Link>
  );
}
