"use client";

import { useEffect } from "react";

export function ScrollRevealCards() {
  useEffect(() => {
    const cards = document.querySelectorAll(".interactive-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      card.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-700"
      );
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

export function NeonPulse() {
  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll(".neon-glow-magenta").forEach((el) => {
        (el as HTMLElement).style.opacity = (
          0.9 +
          Math.random() * 0.1
        ).toString();
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
