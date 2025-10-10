
export type FieldError = string | undefined;

export const ErrorMessage = (({ error }: { error?: FieldError; }) => {
  if (!error) return <></>;
  return <p data-slot="error-message" className={"text-destructive w-full mb-0 py-1 text-xs"}>{error}</p>
})
