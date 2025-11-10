import { Link, useNavigate, useParams } from "react-router";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { BranchForm } from "~/features/branch/BranchForm";
import { BASE_ROUTE } from "~/features/branch/useBranchForm";

export function BranchFormPage() {
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
          <Link to={BASE_ROUTE}>branches</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="container p-6 lg:max-w-[800px]">
        <BranchForm id={id} onCancel={handleCancel} onSave={handleOnSave} />
      </div>
    </>
  );
}
