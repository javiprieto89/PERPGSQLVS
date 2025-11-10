import { Link, useNavigate, useParams } from "react-router-dom";

import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { ClientForm } from "~/features/client/ClientForm";
import { BASE_ROUTE } from "~/features/client/useClientForm";

export function ClientsForm() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const handleOnSave = () => {
    navigate(BASE_ROUTE, {
      state: {
        highlight: id,
      },
    });
  }

  const handleCancel = () => {
    navigate(BASE_ROUTE);
  }

  return (
    <>
      <AdminTopBar>
        <FormBreadcrumb isEditing={!!id}>
          <Link to={BASE_ROUTE}>Clients</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6 lg:max-w-[800px]">
        <ClientForm id={id} onCancel={handleCancel} onSave={handleOnSave} />
      </div>
    </>
  )
}
