
export type InputErrorMessage = string | null;

export const ErrorMessage = (({ error }: { error?: InputErrorMessage; name?: string | null; }) => {
  return (
    <>
      {Boolean(error) ? <p className={"text-destructive w-full mb-0 py-1 text-xs"}>{error}</p> : null}
    </>
  )
})
