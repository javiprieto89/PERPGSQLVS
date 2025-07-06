// src/components/MyWindowPortal.jsx
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MyWindowPortal({
  children,
  title = "Ventana",
  width = 800,
  height = 600,
  existingWindow = null,
}) {
  const containerRef = useRef(document.createElement("div"));
  const newWindow = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const left = window.screenX + 100;
    const top = window.screenY + 100;

    newWindow.current =
      existingWindow ||
      window.open(
        "",
        title,
        `width=${width},height=${height},left=${left},top=${top}`
      );
    if (newWindow.current) {
      newWindow.current.document.title = title;

      // Copiar estilos del documento principal a la nueva ventana
      Array.from(document.styleSheets).forEach((styleSheet) => {
        try {
          const cssRules = Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
          const styleElement =
            newWindow.current.document.createElement("style");
          styleElement.appendChild(
            newWindow.current.document.createTextNode(cssRules)
          );
          newWindow.current.document.head.appendChild(styleElement);
        } catch (e) {
          // Ignorar errores de CORS al acceder a hojas de estilo de otros dominios (si las hubiera)
          console.warn(
            "No se pudo copiar la hoja de estilo:",
            styleSheet.href,
            e
          );
        }
      });

      // Copiar enlaces a hojas de estilo externas (como Google Fonts, etc.)
      Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach(
        (link) => {
          const newLink = newWindow.current.document.createElement("link");
          newLink.rel = link.rel;
          newLink.href = link.href;
          newLink.type = link.type;
          newWindow.current.document.head.appendChild(newLink);
        }
      );

      newWindow.current.document.body.appendChild(containerRef.current);
      setMounted(true);
    }

    const curWindow = newWindow.current;

    return () => {
      if (curWindow) {
        curWindow.close();
      }
    };
  }, []);

  return mounted ? createPortal(children, containerRef.current) : null;
}
