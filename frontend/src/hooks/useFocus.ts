export function useFocus({ ref }: { ref: React.RefObject<HTMLElement> }) {
  const elements = ref.current?.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );
  const length = elements?.length;
  const firstElement = elements?.[0];
  const lastElement = elements?.[elements.length - 1];

  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      const tabForwards =
        !event.shiftKey && document?.activeElement === lastElement;
      const tabBackwards =
        event.shiftKey && document?.activeElement === firstElement;

      if (tabForwards) {
        // only TAB is pressed, not SHIFT simultaneously
        // Prevent default behavior of keydown on TAB (i.e. focus next element)
        event.preventDefault();
        (firstElement as HTMLElement).focus();
      } else if (tabBackwards) {
        // TAB and SHIFT are pressed simultaneously
        event.preventDefault();
        (lastElement as HTMLElement).focus();
      } else if (length === 1) {
        event.preventDefault();
      }
    }
  };

  return {
    trapFocus,
  };
}
