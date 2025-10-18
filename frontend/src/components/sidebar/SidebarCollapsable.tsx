import { atom, useAtom } from "jotai";
import { PanelLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface SidebarCollapsibleProps extends React.PropsWithChildren {
  className: string;
}

export const isOpenSidebarAtom = atom<boolean>(false);

export function SidebarCollapsible({ children, className }: SidebarCollapsibleProps) {
  const [isOpen, setOpen] = useAtom(isOpenSidebarAtom);

  console.log("isOpen", isOpen)

  return (
    <div className={cn("lg:w-64 shrink-0", className)}>
      {isOpen && window.innerWidth < 1024 && <div className="bg-background/50 w-full h-dvh fixed top-0 left-0" onClick={() => setOpen(false)} />}
      <div className={cn(
        {
          "-translate-x-[95%]": !isOpen,
          "translate-0": isOpen
        },
        "lg:translate-0 fixed w-64 h-dvh",
        "top-0 left-0 z-20",
        "transition-[translate,transform] ease-linear",
      )}
      >
        <div onMouseEnter={() => window.innerWidth < 1024 && !isOpen && setOpen(true)}
          className="bg-card w-full h-full max-h-dvh sticky top-0 left-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export function TriggerSidebar() {
  const [isOpen, setOpen] = useAtom(isOpenSidebarAtom);


  return (
    <Button
      size="sm"
      className="lg:hidden"
      onClick={() => setOpen(!isOpen)}
    >
      <PanelLeft />
      <span className="sr-only">Sidebar</span>
    </Button>
  )
}
