import { cn } from "~/lib/utils";
import { AlertLoading } from "../ui-admin/AlertLoading";
import { Skeleton } from "../ui/skeleton";
import { Fieldset } from "./Fieldset";

export function FormSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <AlertLoading />
      <Fieldset>
        <Skeleton className="h-[16px] w-full rounded-md p-4 my-2" />
        <Skeleton className="h-[58px] w-full rounded-md p-4 my-2" />
      </Fieldset>
      <Fieldset>
        <Skeleton className="h-[16px] w-full rounded-md p-4 my-2" />
        <Skeleton className="h-[58px] w-full rounded-md p-4 my-2" />
      </Fieldset>
    </div>
  )
}