// src/utils/openReactWindow.js
import { createRoot } from "react-dom/client";
import { toast } from "sonner";

/**
 * Abre una ventana nueva y monta allí un componente React.
 * @param {() => React.ReactNode} ComponentFn – función que devuelve tu componente
 * @param {string} title – título de la ventana
 * @param {{ width?: number, height?: number, url?: string }} options
 */
export function openReactWindow(
  ComponentFn: (popup: Window) => React.ReactNode,
  title = "Ventana",
  options: { width: number; height: number; url?: string } = {
    width: 500,
    height: 500,
  }
) {
  const width = options.width || 1000;
  const height = options.height || 700;

  // Generar URL si no se proporciona una
  const windowUrl = options.url || `${document.location.href}/form`;

  // 1) Abro ventana con la URL especificada
  const newWindow = window.open(
    windowUrl,
    "_blank",
    `width=${width},height=${height},left=200,top=200`
  );
  if (!newWindow) {
    alert("No se pudo abrir una nueva ventana");
    return;
  }

  // 2) Personalizo el título
  newWindow.document.title = title;

  // Copiar estilos y hojas de estilo
  Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style')
  ).forEach((node) => {
    newWindow.document.head.appendChild(node.cloneNode(true));
  });

  // Copiar sessionStorage para mantener autenticación en la nueva ventana
  try {
    for (const key of Object.keys(sessionStorage)) {
      newWindow.sessionStorage.setItem(
        key,
        sessionStorage.getItem(key) as string
      );
    }
  } catch (err) {
    console.warn("No se pudo copiar sessionStorage:", err);
  }

  // 3) Creo el contenedor React
  const container = newWindow.document.createElement("div");
  container.id = "react-window-root";
  newWindow.document.body.style.margin = "0";
  newWindow.document.body.appendChild(container);

  // 4) Montaje de React en la nueva ventana
  const root = createRoot(container);

  if (ComponentFn) {
    // Pasar referencia de la ventana al componente
    root.render(ComponentFn(newWindow));
  }
}

/**
 * Abre una ventana nueva y monta allí un componente React.
 * @param {() => React.ReactNode} ComponentFn – función que devuelve tu componente
 * @param {string} title – título de la ventana
 * @param {{ width?: number, height?: number }} options
 */
export function openNewWindow(
  url: string,
  options: { width?: number; height?: number; title?: string } = {
    width: 500,
    height: 500,
    title: "Nueva Ventana",
  }
) {
  const width = options.width || 1000;
  const height = options.height || 700;

  // 1) Abro ventana en blanco
  const windowContext = window.open(
    url,
    "_blank",
    `width=${width},height=${height},left=200,top=200`
  );

  // 2) Personalizo el título
  if (windowContext) {
    windowContext.document.title = options.title || "Nueva Ventana";
  }

  if (!windowContext) {
    toast("Could not open the url", {
      description: "Nop, no lo pude abrir che",
    });
    return null;
  }

  // Copiar sessionStorage para mantener autenticación en la nueva ventana
  try {
    for (const key of Object.keys(sessionStorage)) {
      windowContext.sessionStorage.setItem(
        key,
        sessionStorage.getItem(key) as string
      );
    }
  } catch (err) {
    console.warn("No se pudo copiar sessionStorage:", err);
  }

  return windowContext;
}
