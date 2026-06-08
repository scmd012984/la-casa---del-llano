"use client";

type EventCalendarPrintButtonProps = {
  className?: string;
};

export default function EventCalendarPrintButton({
  className = "link-llano",
}: EventCalendarPrintButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.print()}
    >
      Guardar calendario (PDF)
    </button>
  );
}
