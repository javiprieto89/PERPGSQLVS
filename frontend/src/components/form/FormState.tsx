import { type ApolloError } from "@apollo/client";
import { type ReactNode } from "react";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { ErrorMessage } from "./ErrorMessage";
import { FormSkeleton } from "./FormSkeleton";

interface FormStateProps {
  loading?: boolean;
  errors?: (ApolloError | Error | null | undefined)[];
  loadingSkeleton?: ReactNode;
}

export function FormState({ loading, errors = [], loadingSkeleton }: FormStateProps) {
  const hasErrors = errors.some(error => error !== undefined);

  if (loading && loadingSkeleton) {
    return <>{loadingSkeleton ? loadingSkeleton : <FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />}</>;
  }

  if (loading) {
    return <AlertLoading />;
  }

  if (hasErrors) {
    return (
      <>
        {errors.map((error, index) =>
          error ? <ApiErrorMessage key={index} error={error} /> : null
        )}
      </>
    );
  }

  return errors.map((error, index) =>
    error ? <ErrorMessage key={index} error={error.message} /> : null
  );
}
