"use client";

import { useEffect } from "react";

const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap";

export default function DeferredMaterialSymbols() {
  useEffect(() => {
    if (document.querySelector(`link[href="${MATERIAL_SYMBOLS_HREF}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = MATERIAL_SYMBOLS_HREF;
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  }, []);

  return null;
}
