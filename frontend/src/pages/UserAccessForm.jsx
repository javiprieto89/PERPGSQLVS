// frontend/src/pages/UserAccessForm.jsx
import { useEffect, useState } from "react";

import { graphqlClient } from "~/graphql/graphqlClient.js";
import { userAccessOperations } from "~/graphql/operations.js";

import CompanySearchModal from "~/features/company/CompanySearchModal";
import BranchSearchModal from "../components/BranchSearchModal";
import RoleSearchModal from "../components/RoleSearchModal";

export default function UserAccessForm({
  onClose,
  onSave,
  record: initialRecord = null,
}) {
  // TODO: UserAccessForm needs to be refactored, create only one query
  const [userID, setUserID] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [branchID, setBranchID] = useState("");
  const [roleID, setRoleID] = useState("");
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    if (initialRecord) {
      setIsEdit(true);
      setUserID(initialRecord.UserID);
      setCompanyID(initialRecord.CompanyID);
      setBranchID(initialRecord.BranchID);
      setRoleID(initialRecord.RoleID);
    }
  }, [initialRecord]);

  useEffect(() => {
    async function loadFormOptions() {
      try {
        const userRes = await graphqlClient.query(
          `query { allUsers { UserID FullName } }`
        );
        setUsers(userRes.allUsers || []);
        const companyRes = await graphqlClient.query(
          `query { allCompany { CompanyID Name } }`
        );
        setCompanies(companyRes.allCompany || []);
        const roleRes = await graphqlClient.query(
          `query { allRoles { RoleID RoleName } }`
        );
        setRoles(roleRes.allRoles || []);
      } catch (err) {
        console.error("Error cargando combos:", err);
      }
    }
    loadFormOptions();
  }, []);

  useEffect(() => {
    async function loadBranches() {
      if (!companyID) {
        setBranches([]);
        return;
      }
      try {
        const res = await graphqlClient.query(
          `query { branchesByCompany(companyID: ${companyID}) { BranchID Name } }`
        );
        setBranches(res.branchesByCompany || []);
      } catch (err) {
        console.error("Error cargando sucursales:", err);
      }
    }
    loadBranches();
  }, [companyID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await userAccessOperations.update(
          {
            oldUserID: initialRecord.UserID,
            oldCompanyID: initialRecord.CompanyID,
            oldBranchID: initialRecord.BranchID,
            oldRoleID: initialRecord.RoleID,
          },
          {
            UserID: parseInt(userID),
            CompanyID: parseInt(companyID),
            BranchID: parseInt(branchID),
            RoleID: parseInt(roleID),
          }
        );
      } else {
        result = await userAccessOperations.create({
          UserID: parseInt(userID),
          CompanyID: parseInt(companyID),
          BranchID: parseInt(branchID),
          RoleID: parseInt(roleID),
        });
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando asignación:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Asignación" : "Nueva Asignación"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Usuario</label>
          <div className="flex space-x-2 items-center">
            <select
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Seleccione</option>
              {users
                .filter((u) =>
                  u.FullName.toLowerCase().includes(userSearch.toLowerCase())
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
                className="border p-2 rounded pl-7 w-full"
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
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
        <div>
          <label className="block text-sm font-medium mb-1">Compañía</label>
          <div className="flex space-x-2 items-center">
            <select
              value={companyID}
              onChange={(e) => setCompanyID(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Seleccione</option>
              {companies
                .filter((c) =>
                  c.Name.toLowerCase().includes(companySearch.toLowerCase())
                )
                .map((c) => (
                  <option key={c.CompanyID} value={c.CompanyID}>
                    {c.Name}
                  </option>
                ))}
            </select>
            <div className="relative w-32">
              <input
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                placeholder="Buscar"
                className="border p-2 rounded pl-7 w-full"
              />
              <button
                type="button"
                onClick={() => setShowCompanyModal(true)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
              >
                <svg
                  className="h-4 w-4"
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
              </button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sucursal</label>
          <div className="flex space-x-2 items-center">
            <select
              value={branchID}
              onChange={(e) => setBranchID(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Seleccione</option>
              {branches
                .filter((b) =>
                  b.Name.toLowerCase().includes(branchSearch.toLowerCase())
                )
                .map((b) => (
                  <option key={b.BranchID} value={b.BranchID}>
                    {b.Name}
                  </option>
                ))}
            </select>
            <div className="relative w-32">
              <input
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                placeholder="Buscar"
                className="border p-2 rounded pl-7 w-full"
              />
              <button
                type="button"
                onClick={() => setShowBranchModal(true)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
              >
                <svg
                  className="h-4 w-4"
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
              </button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rol</label>
          <div className="flex space-x-2 items-center">
            <select
              value={roleID}
              onChange={(e) => setRoleID(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Seleccione</option>
              {roles
                .filter((r) =>
                  r.RoleName.toLowerCase().includes(roleSearch.toLowerCase())
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
                className="border p-2 rounded pl-7 w-full"
              />
              <button
                type="button"
                onClick={() => setShowRoleModal(true)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
              >
                <svg
                  className="h-4 w-4"
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
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border  rounded hover: disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
      {showCompanyModal && (
        <CompanySearchModal
          isOpen={true}
          onClose={() => setShowCompanyModal(false)}
          onSelect={(c) => {
            setCompanyID(c.CompanyID);
            setShowCompanyModal(false);
          }}
        />
      )}
      {showBranchModal && (
        <BranchSearchModal
          isOpen={true}
          companyID={companyID}
          onClose={() => setShowBranchModal(false)}
          onSelect={(b) => {
            setBranchID(b.BranchID);
            if (!companyID) setCompanyID(b.CompanyID);
            setShowBranchModal(false);
          }}
        />
      )}
      {showRoleModal && (
        <RoleSearchModal
          isOpen={true}
          onClose={() => setShowRoleModal(false)}
          onSelect={(r) => {
            setRoleID(r.RoleID);
            setShowRoleModal(false);
          }}
        />
      )}
    </div>
  );
}
