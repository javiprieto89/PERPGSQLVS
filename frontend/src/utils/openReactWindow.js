// src/utils/openReactWindow.js
import React from "react";
import { createRoot } from "react-dom/client";

/**
 * Abre una ventana nueva y monta allí un componente React.
 * @param {() => React.ReactNode} ComponentFn – función que devuelve tu componente
 * @param {string} title – título de la ventana
 * @param {{ width?: number, height?: number }} options
 */
export function openReactWindow(ComponentFn, title = "Ventana", options = {}) {
  const width  = options.width  ||  1000;
  const height = options.height ||   700;

  // 1) Abro ventana en blanco
  const newWindow = window.open(
    "",                        // <-- vacío
    "_blank",
    `width=${width},height=${height},left=200,top=200`
  );
  if (!newWindow) {
    alert("No se pudo abrir una nueva ventana");
    return;
  }

  // 2) Personalizo el título
  newWindow.document.title = title;

  // 3) Creo el contenedor React
  const container = newWindow.document.createElement("div");
  container.id = "react-window-root";
  newWindow.document.body.style.margin = "0";
  newWindow.document.body.appendChild(container);

  // 4) Montaje de React en la nueva ventana
  const root = createRoot(container);
  // Si `ComponentFn` devuelve JSX, llamalo así:
  root.render(ComponentFn());
}
