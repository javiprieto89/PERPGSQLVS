// src/components/RenderInWindow.jsx
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function RenderInWindow({
  children,  
  title,
  width = 800,
  height = 600,
}) {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(null);

  // 1) Creamos el <div> contenedor
  useEffect(() => {
    const div = document.createElement("div");
    setContainer(div);
  }, []);

  // 2) Cuando el contenedor está listo, abrimos la ventana
  useEffect(() => {
    if (!container) return;

    newWindow.current = window.open(
      "",
      title,
      `width=${width},height=${height},left=200,top=200`
    );
    if (!newWindow.current) return;

    // Le ponemos título y agregamos nuestro div
    newWindow.current.document.title = title;
    newWindow.current.document.body.appendChild(container);

    // Cleanup: cerrar ventana si el componente se desmonta
    const cur = newWindow.current;
    return () => cur.close();
  }, [container, title, width, height]);

  // 3) Renderizamos el portal
  if (container) {
    return createPortal(children, container);
  }
  return null;
}
