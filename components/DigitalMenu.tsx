"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  baldesCerveza,
  cocteleria,
  menuCategories,
  serviciosBotellas,
  tapasTradicionales,
  tragosBarra,
  type MenuCategoryId,
} from "@/lib/stitch-menu";

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function matchesQuery(
  query: string,
  fields: Array<string | null | undefined>,
) {
  if (!query) return true;
  const normalizedQuery = normalizeSearchText(query);
  const haystack = normalizeSearchText(fields.filter(Boolean).join(" "));
  return haystack.includes(normalizedQuery);
}

function Tag({
  text,
  variant,
}: {
  text: string;
  variant?: "tertiary" | "primary";
}) {
  const classes =
    variant === "primary"
      ? "digital-menu-tag digital-menu-tag--primary"
      : "digital-menu-tag";

  return <span className={classes}>{text}</span>;
}

function MenuCard({
  name,
  price,
  description,
  tag,
  tagVariant,
}: {
  name: string;
  price: string;
  description: string;
  tag?: string | null;
  tagVariant?: "tertiary" | "primary";
}) {
  return (
    <article className="digital-menu-card group">
      <div className="digital-menu-card-header">
        <h3 className="digital-menu-item-name">{name}</h3>
        <span className="digital-menu-price">{price}</span>
      </div>
      <p className="digital-menu-item-desc">{description}</p>
      {tag && <Tag text={tag} variant={tagVariant} />}
    </article>
  );
}

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <div className="digital-menu-price-row">
      <span className="digital-menu-price-row-name">{name}</span>
      <span className="digital-menu-dots" aria-hidden />
      <span className="digital-menu-price-row-price">{price}</span>
    </div>
  );
}

export default function DigitalMenu() {
  const [activeId, setActiveId] = useState<MenuCategoryId>("botellas");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Partial<Record<MenuCategoryId, HTMLElement | null>>>(
    {},
  );
  const navRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollingRef = useRef(false);

  const trimmedQuery = searchQuery.trim();
  const isSearching = trimmedQuery.length > 0;

  const filteredBotellas = useMemo(
    () =>
      serviciosBotellas.filter((item) =>
        matchesQuery(trimmedQuery, [item.name, item.description, item.tag]),
      ),
    [trimmedQuery],
  );

  const filteredBaldes = useMemo(
    () =>
      baldesCerveza.filter((item) =>
        matchesQuery(trimmedQuery, [item.name, item.description, item.tag]),
      ),
    [trimmedQuery],
  );

  const filteredCocteleria = useMemo(
    () =>
      cocteleria.filter((item) =>
        matchesQuery(trimmedQuery, [item.name, item.description, item.tag]),
      ),
    [trimmedQuery],
  );

  const filteredBarra = useMemo(
    () =>
      tragosBarra.filter((item) =>
        matchesQuery(trimmedQuery, [item.name, item.price]),
      ),
    [trimmedQuery],
  );

  const filteredTapas = useMemo(
    () =>
      tapasTradicionales.filter((item) =>
        matchesQuery(trimmedQuery, [
          item.name,
          item.description,
          item.badge?.text,
        ]),
      ),
    [trimmedQuery],
  );

  const totalResults =
    filteredBotellas.length +
    filteredBaldes.length +
    filteredCocteleria.length +
    filteredBarra.length +
    filteredTapas.length;

  const showBotellas = filteredBotellas.length > 0 || filteredBaldes.length > 0;
  const showCocteleria =
    filteredCocteleria.length > 0 || filteredBarra.length > 0;
  const showTapas = filteredTapas.length > 0;

  const scrollToCategory = useCallback((id: MenuCategoryId) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    scrollingRef.current = true;
    setActiveId(id);

    const navbarEl = document.querySelector(".site-navbar");
    const navbarHeight = navbarEl?.getBoundingClientRect().height ?? 0;
    const stickyNavHeight = navRef.current?.offsetHeight ?? 0;
    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      stickyNavHeight -
      12;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

    window.setTimeout(() => {
      scrollingRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    if (isSearching) return;

    const ids = menuCategories.map((c) => c.id);

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          const id = visible[0].target.id as MenuCategoryId;
          if (ids.includes(id)) setActiveId(id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    ids.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isSearching]);

  const handleCategoryClick = (id: MenuCategoryId) => {
    setSearchQuery("");
    scrollToCategory(id);
  };

  return (
    <div className="digital-menu">
      <div className="digital-menu-toolbar">
        <label className="digital-menu-search" htmlFor="menu-search">
          <span className="material-symbols-outlined digital-menu-search-icon">
            search
          </span>
          <input
            ref={searchRef}
            id="menu-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar trago, tapa o botella…"
            className="digital-menu-search-input"
            autoComplete="off"
            enterKeyHint="search"
          />
          {isSearching && (
            <button
              type="button"
              className="digital-menu-search-clear"
              onClick={() => {
                setSearchQuery("");
                searchRef.current?.focus();
              }}
              aria-label="Limpiar búsqueda"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </label>

        {isSearching && (
          <p className="digital-menu-search-meta" aria-live="polite">
            {totalResults === 0
              ? `Sin resultados para “${trimmedQuery}”`
              : `${totalResults} resultado${totalResults === 1 ? "" : "s"} para “${trimmedQuery}”`}
          </p>
        )}
      </div>

      <nav
        ref={navRef}
        aria-label="Categorías de la carta"
        className="digital-menu-nav"
      >
        <div className="digital-menu-nav-inner">
          {menuCategories.map((category) => {
            const isActive = !isSearching && activeId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => handleCategoryClick(category.id)}
                className={`digital-menu-nav-btn${isActive ? " digital-menu-nav-btn--active" : ""}`}
              >
                <span className="material-symbols-outlined digital-menu-nav-icon">
                  {category.icon}
                </span>
                <span className="digital-menu-nav-label">
                  {category.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
        <p className="digital-menu-nav-hint">
          {isSearching
            ? "Mostrando coincidencias en todas las categorías"
            : "Carta web interactiva — toca una categoría o desplázate"}
        </p>
      </nav>

      {isSearching && totalResults === 0 && (
        <div className="digital-menu-empty" role="status">
          <span className="material-symbols-outlined digital-menu-empty-icon">
            search_off
          </span>
          <p className="digital-menu-empty-title">No encontramos ese plato o trago</p>
          <p className="digital-menu-empty-desc">
            Prueba con otro nombre: “mojito”, “tequeños”, “cerveza” o “ron”.
          </p>
          <button
            type="button"
            className="digital-menu-empty-btn"
            onClick={() => setSearchQuery("")}
          >
            Ver carta completa
          </button>
        </div>
      )}

      {showBotellas && (
        <section
          id="botellas"
          ref={(el) => {
            sectionRefs.current.botellas = el;
          }}
          className="digital-menu-section"
          aria-labelledby="menu-heading-botellas"
        >
          <header className="digital-menu-section-header">
            <span className="material-symbols-outlined digital-menu-section-icon">
              wine_bar
            </span>
            <div>
              <h2
                id="menu-heading-botellas"
                className="digital-menu-section-title"
              >
                Servicios de Botellas y Baldes de Cerveza
              </h2>
              <p className="digital-menu-section-desc">
                Botellas selectas para mesa VIP y baldes fríos para compartir en
                grupo.
              </p>
            </div>
          </header>

          {filteredBotellas.length > 0 && (
            <div className="digital-menu-subsection">
              <h3 className="digital-menu-subtitle">Servicio de botellas VIP</h3>
              <p className="digital-menu-subdesc">
                Incluye hielo, mezcladores y servicio de mesa. Precios en USD;
                sujetos a disponibilidad.
              </p>
              <div className="digital-menu-grid">
                {filteredBotellas.map((item) => (
                  <MenuCard key={item.name} {...item} tagVariant="primary" />
                ))}
              </div>
            </div>
          )}

          {filteredBaldes.length > 0 && (
            <div className="digital-menu-subsection">
              <h3 className="digital-menu-subtitle">Baldes de cerveza</h3>
              <div className="digital-menu-grid digital-menu-grid--compact">
                {filteredBaldes.map((item) => (
                  <MenuCard key={item.name} {...item} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {showCocteleria && (
        <section
          id="cocteleria"
          ref={(el) => {
            sectionRefs.current.cocteleria = el;
          }}
          className="digital-menu-section"
          aria-labelledby="menu-heading-cocteleria"
        >
          <header className="digital-menu-section-header">
            <span className="material-symbols-outlined digital-menu-section-icon">
              liquor
            </span>
            <div>
              <h2
                id="menu-heading-cocteleria"
                className="digital-menu-section-title"
              >
                Coctelería de Autor
              </h2>
              <p className="digital-menu-section-desc">
                Creaciones exclusivas de la barra, preparadas al momento.
              </p>
            </div>
          </header>

          {filteredCocteleria.length > 0 && (
            <div className="digital-menu-grid">
              {filteredCocteleria.map((item) => (
                <MenuCard key={item.name} {...item} />
              ))}
            </div>
          )}

          {filteredBarra.length > 0 && (
            <div className="digital-menu-subsection digital-menu-subsection--list">
              <h3 className="digital-menu-subtitle">Clásicos de barra</h3>
              <div className="digital-menu-list">
                {filteredBarra.map((item) => (
                  <PriceRow key={item.name} {...item} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {showTapas && (
        <section
          id="tapas"
          ref={(el) => {
            sectionRefs.current.tapas = el;
          }}
          className="digital-menu-section"
          aria-labelledby="menu-heading-tapas"
        >
          <header className="digital-menu-section-header">
            <span className="material-symbols-outlined digital-menu-section-icon">
              restaurant_menu
            </span>
            <div>
              <h2 id="menu-heading-tapas" className="digital-menu-section-title">
                Tapas y Entradas para Compartir
              </h2>
              <p className="digital-menu-section-desc">
                Picoteo criollo para mesa. Ideal mientras esperas karaoke o
                brindas con la mesa.
              </p>
            </div>
          </header>

          <div className="digital-menu-tapas-grid">
            {filteredTapas.map((item) => (
              <article key={item.name} className="digital-menu-tapa group">
                <div className="digital-menu-tapa-image-wrap">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span
                      className={`digital-menu-tapa-badge${item.badge.variant === "primary" ? " digital-menu-tapa-badge--primary" : ""}`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </div>
                <div className="digital-menu-tapa-body">
                  <div className="digital-menu-card-header">
                    <h3 className="digital-menu-item-name">{item.name}</h3>
                    <span className="digital-menu-price">{item.price}</span>
                  </div>
                  <p className="digital-menu-item-desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
