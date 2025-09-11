import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";

export function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError() as unknown;

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let status: number | string = "";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        message = "Page not found";
        details = error.statusText || "The requested page could not be found.";
        break;

      case 401:
        message = "Unauthorized";
        details = error.statusText || "You are not authorized to view this page.";
        break;

      default:
        message = error.statusText;
        details = error.data || details;
    }
  } else if (error instanceof Error) {
    message = "Application error";
    details = import.meta.env.DEV ? error.message : details;
    status = "";
    if (import.meta.env.DEV) {
      console.error(error.stack);
    }
  }

  const goBack = () => navigate(-1);

  return (
    <div className="layout h-dvh">
      <AdminTopBar />
      <main className="flex items-center justify-center container mx-auto h-3/4">
        <div>
          <h1 className="h1">{status} {message}</h1>
          <p className="sm py-4">{details}</p>
          <button className="button m-auto" onClick={goBack}>Go Back</button>
        </div>
      </main>
    </div>
  );
}