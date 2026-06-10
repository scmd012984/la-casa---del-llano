"use client";

import { useEffect, useId, useRef, useState } from "react";

export type QuoteFormSelectOption = {
  value: string;
  label: string;
};

type QuoteFormSelectProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: QuoteFormSelectOption[];
  placeholder?: string;
  required?: boolean;
  triggerClassName?: string;
};

export default function QuoteFormSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Selecciona...",
  required = false,
  triggerClassName = "",
}: QuoteFormSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="quote-form-select" ref={rootRef}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        id={id}
        className={`quote-form-select-trigger ${triggerClassName}`.trim()}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={value ? undefined : "text-on-surface-variant/50"}>
          {selectedLabel ?? placeholder}
        </span>
        <span className="material-symbols-outlined quote-form-select-icon" aria-hidden>
          expand_more
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          className="quote-form-select-list"
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={option.value === value ? "is-selected" : undefined}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
