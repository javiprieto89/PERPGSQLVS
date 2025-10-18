// frontend/src/features/useraccess/UserAccessForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import BranchSearchModal from "~/features/branch/BranchSearchModal";
import CompanySearchModal from "~/features/company/CompanySearchModal";
import RoleSearchModal from "~/features/role/RoleSearchModal";
import { userPermissionsOperations } from "~/services/user.service";

interface UserAccessFormProps {
  onSave?: (result: any) => void;
  onCancel?: () => void;
  initialData?: any;
  showTopBar?: boolean;
  title?: string;
}

export function UserAccessForm({
  onSave = () => { },
  onCancel,
  initialData,
  showTopBar = true,
  title,
}: UserAccessFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form fields
  const [userID, setUserID] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [branchID, setBranchID] = useState("");
  const [roleID, setRoleID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Company and branch names for display
  const [companyName, setCompanyName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [userName, setUserName] = useState("");

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
      setUserName(record.UserData?.FullName || "");
      setCompanyName(record.CompanyData?.CompanyName || "");
      setBranchName(record.BranchData?.BranchName || "");
      setRoleName(record.RoleData?.RoleName || "");
    }
  }, [record]);

  const handleSave = async () => {
    if (!userID.trim() || !companyID.trim() || !branchID.trim() || !roleID.trim()) {
      setErrorMessage("Todos los campos son requeridos");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const accessData = {
        UserID: parseInt(userID),
        CompanyID: parseInt(companyID),
        BranchID: parseInt(branchID),
        RoleID: parseInt(roleID),
      };

      let result;
      if (isEditMode) {
        // For update, we need the old data and new data
        const oldData = {
          userID: parseInt(userID),
          companyID: parseInt(companyID),
          branchID: parseInt(branchID),
          roleID: parseInt(roleID),
        };
        result = await userPermissionsOperations.update(oldData, accessData);
      } else {
        result = await userPermissionsOperations.create(accessData);
      }

      onSave(result);

      // Si no hay onCancel (estamos en página), navegar de vuelta
      if (!onCancel) {
        navigate("/rolesusers");
      }
    } catch (error) {
      console.error("Error saving user access:", error);
      setErrorMessage("Error al guardar la asignación");
    } finally {
      setIsLoading(false);
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
  if (isLoading) {
    return <AlertLoading message="Guardando asignación..." />;
  }

  const formTitle = title || (isEditMode ? "Editar Asignación" : "Nueva Asignación");

  return (
    <div className="p-6">
      {showTopBar && (
        <AdminTopBar>
          <h1 className="text-xl font-semibold">{formTitle}</h1>
        </AdminTopBar>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Usuario <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userName || userID}
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
                placeholder="Seleccionar usuario"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUserModal(true)}
              >
                Buscar
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Empresa <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={companyName || companyID}
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
                placeholder="Seleccionar empresa"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCompanyModal(true)}
              >
                Buscar
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Sucursal <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={branchName || branchID}
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
                placeholder="Seleccionar sucursal"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBranchModal(true)}
                disabled={!companyID}
              >
                Buscar
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Rol <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={roleName || roleID}
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
                placeholder="Seleccionar rol"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRoleModal(true)}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      {/* Modals */}
      <CompanySearchModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        onSelect={(company) => {
          setCompanyID(company.CompanyID.toString());
          setCompanyName(company.CompanyName || "");
          setShowCompanyModal(false);
          // Reset branch when company changes
          setBranchID("");
          setBranchName("");
        }}
      />

      <BranchSearchModal
        isOpen={showBranchModal}
        onClose={() => setShowBranchModal(false)}
        companyID={parseInt(companyID) || undefined}
        onSelect={(branch) => {
          setBranchID(branch.BranchID.toString());
          setBranchName(branch.BranchName);
          setShowBranchModal(false);
        }}
      />

      <RoleSearchModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelect={(role) => {
          setRoleID(role.RoleID.toString());
          setRoleName(role.RoleName);
          setShowRoleModal(false);
        }}
      />

      {/* User Modal - TODO: Create UserSearchModal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Buscar Usuario</h3>
            <p className="mb-4">UserSearchModal no está implementado aún.</p>
            <input
              type="number"
              placeholder="ID de Usuario"
              className="border rounded px-3 py-2 w-full mb-4"
              onChange={(e) => setUserID(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUserModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowUserModal(false)}>
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}