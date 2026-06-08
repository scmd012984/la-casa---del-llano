#!/usr/bin/env bash
# Copia videos desde ~/Downloads a public/videos/
# (Cursor no puede adjuntar archivos fuera del proyecto ni leer Descargas directamente.)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/videos"
DOWNLOADS="${DOWNLOADS_DIR:-$HOME/Downloads}"

mkdir -p "$DEST"

if [[ ! -d "$DOWNLOADS" ]]; then
  echo "No se encontró la carpeta Descargas: $DOWNLOADS"
  exit 1
fi

shopt -s nullglob nocaseglob
files=(
  "$DOWNLOADS"/*.mp4
  "$DOWNLOADS"/*.mov
  "$DOWNLOADS"/*.webm
  "$DOWNLOADS"/*.m4v
)

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No hay videos (.mp4, .mov, .webm, .m4v) en: $DOWNLOADS"
  echo ""
  echo "Alternativa manual:"
  echo "  1. Abre Finder → Descargas"
  echo "  2. Arrastra los videos a: $DEST"
  exit 0
fi

copied=0
for src in "${files[@]}"; do
  name="$(basename "$src")"
  dest="$DEST/$name"

  if [[ -e "$dest" ]]; then
    echo "Ya existe (omitido): $name"
    continue
  fi

  cp -p "$src" "$dest"
  echo "Copiado: $name"

  # Quitar cuarentena de macOS si aplica (archivos “bloqueados” de internet)
  if xattr -l "$dest" 2>/dev/null | grep -q "com.apple.quarantine"; then
    xattr -d com.apple.quarantine "$dest" 2>/dev/null || true
    echo "  → Cuarentena de macOS eliminada"
  fi

  copied=$((copied + 1))
done

echo ""
echo "Listo: $copied archivo(s) en public/videos/"
echo "Siguiente paso: edita lib/videos.ts y descomenta las rutas que quieras usar."
ls -lh "$DEST"
