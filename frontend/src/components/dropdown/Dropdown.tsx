import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Location } from 'react-router';
import { useFocus } from '~/hooks/useFocus';
import { useWindowOverflow } from '~/hooks/useWindowOverflow';
import Button, { type ButtonProps } from '../button/Button';
import { buttonVariants } from '../button/Button.cva';
import { Link, type LinkProps } from '../link/Link';

type DropdownProps = React.DialogHTMLAttributes<HTMLDivElement> & {
  onStateChange?({ }: { open: boolean }): void;
}

type DropdownContextValues = DropdownProps & {
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  dialogRef?: React.RefObject<HTMLDivElement | null>;
  itemsRef?: React.MutableRefObject<(HTMLButtonElement | null)[]>

  isOpen: boolean;

  toggleDialog(): void;
  closeDialog(): void;
  openDialog(): void;
};

export const DropdownContext = createContext<DropdownContextValues>({
  closeDialog: () => { },
  openDialog: () => { },
  toggleDialog: () => { },
  isOpen: false,
});

type ButtonTriggerProps = ButtonProps & {
  arrowHidden?: boolean;
}
export function DropdownTrigger({ onKeyDown, children, arrowHidden, ...props }: ButtonTriggerProps) {
  const { isOpen, triggerRef, toggleDialog, closeDialog } = useContext(DropdownContext);

  function getState() {
    return isOpen ? 'open' : 'closed';
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.code) {
      case 'Space':
      case 'Spacebar':
        event.preventDefault();
        toggleDialog();
        onKeyDown?.(event);
        break;
    }
  };


  return (
    <Button
      ref={triggerRef}
      onClick={toggleDialog}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      data-state={getState()}
      onKeyDown={(event: any) => {
        handleKeyDown(event as React.KeyboardEvent<HTMLButtonElement>);
      }}
      {...props}
    >
      {children}
      {!arrowHidden &&
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />}
    </Button>
  )
}

export const dropdownItemCva = cva('dropdown-button', {
  variants: {
    variant: {
      primary: "primary",
      destructive: "destructive",
      outline: "outlined",
      dashed: "dashed",
      ghost: "ghost",
      link: "link",
    },
    disabled: {
      true: "disabled"
    }
  },
});

type DropdownItem = LinkProps & VariantProps<typeof buttonVariants> & {
  label: React.ReactNode | string;
  onClick?: () => void;
  divider?: boolean;
  to?: string;
  target?: string;
  state?: Location;
}

interface DropdownDynamicItemsProps {
  items: DropdownItem[];
}

export function DropdownDynamicItems({ items }: DropdownDynamicItemsProps) {
  const { itemsRef, isOpen, closeDialog } = useContext(DropdownContext);

  return (
    <div className='dropdown-items'>
      {items.map(({ divider, onClick, label, to, ...item }, index) => (
        <div key={index}>
          {divider && <hr className='dropdown-divider' />}
          <Link
            to={to}
            ref={(el) => {
              (itemsRef?.current ? itemsRef.current[index] = el : null)
              return
            }}
            className={clsx("dropdown-button link button-sm w-full", buttonVariants({
              variant: item.variant,
              disabled: item.disabled
            }))}
            onClick={() => {
              onClick?.();
              closeDialog();
            }}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
          >
            {label}
          </Link>
        </div>
      ))}
    </div>
  )
}

type DropdownContentProps = React.DialogHTMLAttributes<HTMLDivElement> & {
  items?: DropdownItem[];
}

export function DropdownContent({ items, children, onKeyDown, ...props }: DropdownContentProps) {
  const { dialogRef, isOpen } = useContext(DropdownContext);
  const { trapFocus } = useFocus({ ref: dialogRef as React.RefObject<HTMLDivElement> })
  const { isOverflow, calculateOverflow } = useWindowOverflow({ ref: dialogRef as React.RefObject<HTMLDivElement> });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    trapFocus(event);
    onKeyDown?.(event)
  }

  useEffect(() => {
    if (isOpen) {
      calculateOverflow();
    }
  }, [isOpen])

  return (
    <div
      rel='dialog'
      ref={dialogRef}
      className={clsx('dropdown-content', {
        ['dropdown-content-overflow']: isOverflow
      })}
      onKeyDown={handleKeyDown}
      data-open={isOpen}
      {...props}
    >
      {items ? <DropdownDynamicItems items={items} /> : children}
    </div>
  );
}

export function Dropdown({ onStateChange = () => { }, children, ...props }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(props.open || false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const closeDialog = useCallback(() => {
    // dialogRef.current?.close();
    triggerRef.current?.focus();
    setIsOpen(false)
    onStateChange({ open: false });
  }, []);

  const openDialog = () => {
    // dialogRef.current?.show();
    setIsOpen(true)
    onStateChange({ open: true });
  }

  const toggleDialog = () => {
    if (isOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeDialog();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef?.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDialog, isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        triggerRef,
        containerRef,
        dialogRef,
        itemsRef,
        toggleDialog,
        closeDialog,
        openDialog,
        isOpen,
        ...props
      }}
    >
      <div className='dropdown-container' ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider >
  );
}
