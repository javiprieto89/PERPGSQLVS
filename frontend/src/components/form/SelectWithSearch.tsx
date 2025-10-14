"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

import { Label } from "~/components/ui/label";
import { useArrowKeyNavigation } from "~/hooks/useArrowKeyNavigation";
import { useClickOutside } from "~/hooks/useClickOutside";
import { ErrorMessage, type FieldError } from "./ErrorMessage";

export interface SelectWithSearchProps<T extends Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'defaultValue'> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  /** Callback al seleccionar un valor */
  onSelect: (value: string) => void;
  /** Propiedad usada como identificador único */
  accessor: keyof T;
  /** Propiedad mostrada en la UI */
  display: keyof T | ((item: T) => string);
  /** Datos a renderizar */
  data?: T[];
  /** Placeholder */
  placeholder?: string;
  /** Valor por defecto */
  defaultValue?: string | null;
  /** ID opcional */
  id?: string;
  name?: string;
  /** Estado de carga */
  loading?: boolean;
  /** Mensaje de error opcional */
  error?: FieldError;
  required?: boolean;
}

function displayToString<T>(item: T, display: keyof T | ((item: T) => string)): string {
  if (typeof display === "function") {
    return display(item);
  }
  return String(item[display]);
}

export const SelectWithSearch = forwardRef(<T extends Record<string, unknown>>(
  {
    label,
    labelProps,
    className,
    onSelect,
    accessor,
    display,
    data = [],
    placeholder = "Select...",
    defaultValue = "",
    loading = false,
    error,
    id,
    name,
    required,
    ...rest
  }: SelectWithSearchProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const selectId = id || name;
  const [value, setValue] = useState(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");
  const hasInitialized = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useClickOutside({ ref: containerRef, defaultState: false });

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    String(displayToString(item, display)).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { highlightedIndex, handleKeyDown: handleArrowKeyDown } = useArrowKeyNavigation({
    isOpen: open,
    itemCount: filteredData.length,
    onSelect: (index) => {
      const selectedItem = filteredData[index];
      if (selectedItem) {
        handleSelect(selectedItem);
      }
    },
    searchQuery,
    listboxRef,
  });

  // Initialize value only once on mount
  useEffect(() => {
    setValue(defaultValue);
    hasInitialized.current = true;
  }, [defaultValue]);

  // Focus search input when popover opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  // Clear search query when closing
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  const selectedItem = data.find(
    (item) => String(item[accessor]) === String(value)
  );

  const handleSelect = (item: T) => {
    const newValue = value === String(item[accessor]) ? "" : String(item[accessor]);
    setValue(newValue);
    onSelect(newValue);
    setOpen(false);
    // Return focus to the trigger button after selection
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle arrow keys and enter for selection
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      handleArrowKeyDown(e);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "Enter" && highlightedIndex === -1) {
      e.preventDefault();
      // If there are filtered results, select the first one
      if (filteredData.length > 0) {
        handleSelect(filteredData[0]);
      } else {
        // Otherwise, just close the listbox
        setOpen(false);
        buttonRef.current?.focus();
      }
    } else if (e.key === "Tab" && open) {
      e.preventDefault();
      setOpen(false);
    }
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="flex flex-col gap-2" {...rest}>
      {label && (
        <Label htmlFor={selectId} {...labelProps}>
          {label}
        </Label>
      )}

      <div ref={containerRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? `${selectId}-listbox` : undefined}
          aria-haspopup="listbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : label ? `${selectId}-helper` : undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={handleButtonKeyDown}
          disabled={loading}
          className={cn(
            "group",
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "hover:bg-accent/20",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "justify-between items-center text-left",
            className
          )}
        >
          <span className="truncate leading-8">
            {loading
              ? "Loading..."
              : selectedItem
                ? displayToString(selectedItem, display)
                : placeholder}
          </span>
          <ChevronsUpDown className="transition-colors ml-2 opacity-80 group-hover:opacity-100 flex-shrink-0" size={16} />
        </button>

        {open && (
          <div
            id={`${selectId}-listbox`}
            role="listbox"
            aria-labelledby={selectId}
            className={cn(
              "absolute z-50 mt-1 min-w-full w-[90vw] max-w-[600px] md:w-[40vw] md:min-w-[350px] lg:w-[45vw] lg:min-w-[390px] lg:max-w-[280px]",
              "rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
            )}
          >
            <div className="p-2 border-b">
              <input
                ref={searchInputRef}
                type="text"
                role="searchbox"
                aria-label="Search options"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "flex h-9 w-full rounded-xs border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors",
                  "placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                required={required}
              />
            </div>

            <div ref={listboxRef} className="max-h-[300px] overflow-y-auto p-1">
              {filteredData.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              ) : (
                filteredData.map((item, index) => {
                  const itemValue = String(item[accessor]);
                  const itemLabel = String(displayToString(item, display));
                  const isSelected = value === itemValue;
                  const isHighlighted = highlightedIndex === index;

                  return (
                    <div
                      key={itemValue}
                      data-index={index}
                      role="option"
                      tabIndex={-1}
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSelect(item);
                        } else if (e.key === "Escape") {
                          e.preventDefault();
                          setOpen(false);
                          buttonRef.current?.focus();
                        } else {
                          // Delegate arrow keys to the handler
                          handleKeyDown(e);
                        }
                      }}
                      onMouseEnter={() => {
                        // Optional: highlight on mouse hover
                        // setHighlightedIndex(index);
                      }}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring",
                        isHighlighted && "bg-accent text-accent-foreground",
                        isSelected && !isHighlighted && "bg-accent/50"
                      )}
                    >
                      <span className="flex-1 truncate">{itemLabel}</span>
                      {isSelected && (
                        <Check className="ml-2 flex-shrink-0" size={16} />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <ErrorMessage error={error} />
    </div >
  );
}) as <T extends Record<string, unknown>>(
  props: SelectWithSearchProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

// SelectWithSearch.displayName = "SelectWithSearch";
