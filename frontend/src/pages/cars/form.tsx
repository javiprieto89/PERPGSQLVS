// frontend/src/pages/cars/form.tsx
// Legacy wrapper - use ~/features/car/CarForm for new implementations
import { Link, useParams } from "react-router";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { CarForm as NewCarForm } from "~/features/car/CarForm";

export const BASE_ROUTE = "/cars";

export function CarForm(props: any) {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = Boolean(id);

  return (
    <>
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Clients</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="container p-6">
        <NewCarForm {...props} showTopBar={false} />
      </div>
    </>
  );
}
