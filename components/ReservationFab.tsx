import Link from "next/link";

export default function ReservationFab() {
  return (
    <Link
      href="/reserva"
      className="fixed bottom-24 md:bottom-8 right-8 bg-secondary text-on-secondary p-4 rounded-full shadow-xl hover:shadow-[0_0_20px_rgba(245,43,176,0.6)] transition-all z-40 group"
      aria-label="Reservar Mesa"
    >
      <span className="material-symbols-outlined text-3xl">calendar_today</span>
      <span className="absolute right-full mr-4 bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-secondary/20 text-xs font-semibold">
        Reservar Mesa
      </span>
    </Link>
  );
}
