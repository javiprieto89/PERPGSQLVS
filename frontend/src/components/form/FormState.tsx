import { type ApolloError } from "@apollo/client";
import { type ReactNode } from "react";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { FormSkeleton } from "./FormSkeleton";

interface FormStateProps {
  loading?: boolean;
  errors?: (ApolloError | undefined)[];
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

  return null;
}
