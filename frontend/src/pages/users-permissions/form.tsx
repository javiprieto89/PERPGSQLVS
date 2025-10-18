// frontend/src/features/userpermissions/UserPermissionsForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";

import BranchSearchModal from "~/features/branch/BranchSearchModal";
import CompanySearchModal from "~/features/company/CompanySearchModal";
import RoleSearchModal from "~/features/role/RoleSearchModal";
import { useGetUserpermissionsFormDataQuery } from "~/graphql/_generated/graphql";
import { userPermissionsOperations } from "~/services/user.service";
import { AuthHelper } from "~/utils/authHelper";

interface UserPermissionsFormProps {
  onSave?: (result: any) => void;
  onCancel?: () => void;
  initialData?: any;
  showTopBar?: boolean;
  title?: string;
}

export function UserPermissionsForm({
  onSave = () => { },
  onCancel,
  initialData,
  showTopBar = true,
  title,
}: UserPermissionsFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  // GraphQL query for form data
  const { data: formData, loading: queryLoading, error: queryError } = useGetUserpermissionsFormDataQuery({
    fetchPolicy: "network-only",
    variables: {
      companyID: AuthHelper.getSelectedAccess()?.CompanyID || 0,
    },
    skip: !AuthHelper.getSelectedAccess()?.CompanyID,
  });

  // State for form fields
  const [userID, setUserID] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [branchID, setBranchID] = useState("");
  const [roleID, setRoleID] = useState("");

  // Search states
  const [userSearch, setUserSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");

  // Modal states
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Form states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data from GraphQL
  const users = formData?.allUsers || [];
  const companies = formData?.allCompany || [];
  const roles = formData?.allRoles || [];
  const branches = formData?.branchesByCompany || [];

  // Determinar si estamos en modo edición
  const isEditMode = !!(id || initialData);
  const record = initialData;

  // Parse composite ID for edit mode
  useEffect(() => {
    if (id && id !== "new") {
      // Parse composite ID: userID-companyID-branchID-roleID
      const parts = id.split("-");
      if (parts.length === 4) {
        setUserID(parts[0]);
        setCompanyID(parts[1]);
        setBranchID(parts[2]);
        setRoleID(parts[3]);
      }
    }
  }, [id]);

  // Llenar form cuando hay datos iniciales
  useEffect(() => {
    if (record) {
      setUserID(record.UserID?.toString() || "");
      setCompanyID(record.CompanyID?.toString() || "");
      setBranchID(record.BranchID?.toString() || "");
      setRoleID(record.RoleID?.toString() || "");
    }
  }, [record]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userID.trim() || !companyID.trim() || !branchID.trim() || !roleID.trim()) {
      setError("Todos los campos son requeridos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accessData = {
        UserID: parseInt(userID),
        CompanyID: parseInt(companyID),
        BranchID: parseInt(branchID),
        RoleID: parseInt(roleID),
      };

      let result;
      if (isEditMode) {
        // For edit mode, we need old and new data
        const oldData = record || {
          UserID: parseInt(userID),
          CompanyID: parseInt(companyID),
          BranchID: parseInt(branchID),
          RoleID: parseInt(roleID),
        };

        result = await userPermissionsOperations.update(
          {
            oldUserID: oldData.UserID,
            oldCompanyID: oldData.CompanyID,
            oldBranchID: oldData.BranchID,
            oldRoleID: oldData.RoleID,
          },
          accessData
        );
      } else {
        result = await userPermissionsOperations.create(accessData);
      }

      onSave(result);

      // Si no hay onCancel (estamos en página), navegar de vuelta
      if (!onCancel) {
        navigate("/rolesusers");
      }
    } catch (err: any) {
      console.error("Error saving user permissions:", err);
      setError(err?.message || "Error al guardar la asignación");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/rolesusers");
    }
  };

  // Loading state
  if (queryLoading) {
    return <AlertLoading message="Cargando datos del formulario..." />;
  }

  // Error state
  if (queryError) {
    return <ApiErrorMessage error={queryError} />;
  }

  const formTitle = title || (isEditMode ? "Editar Asignación" : "Nueva Asignación");

  return (
    <div className="p-6">
      {showTopBar && (
        <AdminTopBar>
          <h1 className="text-xl font-semibold">{formTitle}</h1>
        </AdminTopBar>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Usuario <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 items-center">
              <select
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Seleccione un usuario</option>
                {users
                  .filter((u) =>
                    String(u.FullName || "").toLowerCase().includes(userSearch.toLowerCase())
                  )
                  .map((u) => (
                    <option key={u.UserID} value={u.UserID}>
                      {u.FullName}
                    </option>
                  ))}
              </select>
              <div className="relative w-32">
                <input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Buscar"
                  className="border border-gray-300 rounded px-3 py-2 pl-8 w-full"
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Compañía */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Compañía <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 items-center">
              <select
                value={companyID}
                onChange={(e) => {
                  setCompanyID(e.target.value);
                  // Reset branch when company changes
                  setBranchID("");
                }}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Seleccione una compañía</option>
                {companies
                  .filter((c) =>
                    String(c.CompanyName || "").toLowerCase().includes(companySearch.toLowerCase())
                  )
                  .map((c) => (
                    <option key={c.CompanyID} value={c.CompanyID}>
                      {c.CompanyName}
                    </option>
                  ))}
              </select>
              <div className="relative w-32">
                <input
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  placeholder="Buscar"
                  className="border border-gray-300 rounded px-3 py-2 pl-8 w-full"
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCompanyModal(true)}
              >
                Modal
              </Button>
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sucursal <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 items-center">
              <select
                value={branchID}
                onChange={(e) => setBranchID(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                required
                disabled={!companyID}
              >
                <option value="">Seleccione una sucursal</option>
                {branches
                  .filter((b) =>
                    String(b.BranchName || "").toLowerCase().includes(branchSearch.toLowerCase())
                  )
                  .map((b) => (
                    <option key={b.BranchID} value={b.BranchID}>
                      {b.BranchName}
                    </option>
                  ))}
              </select>
              <div className="relative w-32">
                <input
                  value={branchSearch}
                  onChange={(e) => setBranchSearch(e.target.value)}
                  placeholder="Buscar"
                  className="border border-gray-300 rounded px-3 py-2 pl-8 w-full"
                  disabled={!companyID}
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBranchModal(true)}
                disabled={!companyID}
              >
                Modal
              </Button>
            </div>
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Rol <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 items-center">
              <select
                value={roleID}
                onChange={(e) => setRoleID(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Seleccione un rol</option>
                {roles
                  .filter((r) =>
                    String(r.RoleName || "").toLowerCase().includes(roleSearch.toLowerCase())
                  )
                  .map((r) => (
                    <option key={r.RoleID} value={r.RoleID}>
                      {r.RoleName}
                    </option>
                  ))}
              </select>
              <div className="relative w-32">
                <input
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  placeholder="Buscar"
                  className="border border-gray-300 rounded px-3 py-2 pl-8 w-full"
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRoleModal(true)}
              >
                Modal
              </Button>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>

      {/* Modals */}
      <CompanySearchModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        onSelect={(company) => {
          setCompanyID(company.CompanyID.toString());
          setShowCompanyModal(false);
          // Reset branch when company changes
          setBranchID("");
        }}
      />

      <BranchSearchModal
        isOpen={showBranchModal}
        onClose={() => setShowBranchModal(false)}
        companyID={parseInt(companyID) || undefined}
        onSelect={(branch) => {
          setBranchID(branch.BranchID.toString());
          setShowBranchModal(false);
        }}
      />

      <RoleSearchModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelect={(role) => {
          setRoleID(role.RoleID.toString());
          setShowRoleModal(false);
        }}
      />
    </div>
  );
}