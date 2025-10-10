import { type ApolloError } from "@apollo/client";
import { type ReactNode } from "react";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";

interface FormStateProps {
  loading?: boolean;
  errors?: (ApolloError | undefined)[];
  loadingSkeleton?: ReactNode;
}

export function FormState({ loading, errors = [], loadingSkeleton }: FormStateProps) {
  const hasErrors = errors.some(error => error !== undefined);

  if (loading && loadingSkeleton) {
    return <>{loadingSkeleton}</>;
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

  return null;
}
