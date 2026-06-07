# Importar diseños desde Google Stitch

Coloca aquí los archivos exportados de Stitch para integrarlos en Next.js.

## Cómo exportar desde Stitch

1. Abre tu proyecto en [Google Stitch](https://stitch.withgoogle.com).
2. Selecciona cada pantalla:
   - `SCREEN_15` → Inicio
   - `SCREEN_16` → Menú de Tapas
   - `SCREEN_17` → Eventos y Karaoke
   - `SCREEN_2` → Reserva de Mesa
3. Exporta como **HTML/CSS** o **Tailwind**.
4. Guarda las imágenes en `public/images/stitch/`.
5. Pega el HTML en esta carpeta o compártelo en Cursor para convertirlo a componentes React.

## Estructura recomendada

```
stitch/
├── SCREEN_15-inicio.html
├── SCREEN_16-menu.html
├── SCREEN_17-eventos.html
└── SCREEN_2-reserva.html

public/images/stitch/
├── fachada.png
├── platos/
└── eventos/
```
