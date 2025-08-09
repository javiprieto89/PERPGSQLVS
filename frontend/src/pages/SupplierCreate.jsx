import { useCallback, useEffect, useState } from "react";
import { supplierOperations } from "~/graphql/operations";
import BranchSearchModal from "../components/BranchSearchModal";
import CompanySearchModal from "../components/CompanySearchModal";

export default function SupplierCreate({
  onClose,
  onSave,
  supplier: initialSupplier = null,
}) {
  const [supplier, setSupplier] = useState({
    docTypeID: "",
    companyID: "",
    branchID: "",
    docNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    isActive: true,
    countryID: "",
    provinceID: "",
  });

  const [formData, setFormData] = useState({
    sysDocTypes: [],
    countries: [],
    provinces: [],
    companies: [],
    branches: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);

  const loadFormData = useCallback(async () => {
    try {
      setLoadingForm(true);
      const data = await supplierOperations.getSupplierFormData();
      setFormData(data);
    } catch (err) {
      console.error("Error cargando datos del formulario:", err);
      setError("Error cargando los datos del formulario: " + err.message);
    } finally {
      setLoadingForm(false);
    }
  }, [isEdit]);

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  useEffect(() => {
    if (initialSupplier) {
      setIsEdit(true);
      setSupplier({
        docTypeID: initialSupplier.DocTypeID
          ? parseInt(initialSupplier.DocTypeID)
          : "",
        companyID: initialSupplier.CompanyID
          ? parseInt(initialSupplier.CompanyID)
          : "",
        branchID: initialSupplier.BranchID
          ? parseInt(initialSupplier.BranchID)
          : "",
        docNumber: initialSupplier.DocNumber || "",
        firstName: initialSupplier.FirstName || "",
        lastName: initialSupplier.LastName || "",
        phone: initialSupplier.Phone || "",
        email: initialSupplier.Email || "",
        address: initialSupplier.Address || "",
        city: initialSupplier.City || "",
        postalCode: initialSupplier.PostalCode || "",
        isActive: initialSupplier.IsActive !== false,
        countryID: initialSupplier.CountryID
          ? parseInt(initialSupplier.CountryID)
          : "",
        provinceID: initialSupplier.ProvinceID
          ? parseInt(initialSupplier.ProvinceID)
          : "",
      });
    }
  }, [initialSupplier]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue;
    if (type === "checkbox") {
      processedValue = checked;
    } else if (name.includes("ID")) {
      processedValue = value === "" ? "" : parseInt(value);
    } else {
      processedValue = value;
    }
    setSupplier((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    if (name === "countryID") {
      setSupplier((prev) => ({
        ...prev,
        provinceID: "",
      }));
    }
    if (name === "companyID") {
      setSupplier((prev) => ({
        ...prev,
        branchID: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await supplierOperations.updateSupplier(
          initialSupplier.SupplierID,
          supplier
        );
      } else {
        result = await supplierOperations.createSupplier(supplier);
      }
      if (onSave) onSave(result);
      if (onClose) onClose();
    } catch (err) {
      console.error("Error guardando proveedor:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const availableProvinces = formData.provinces.filter(
    (p) => p.CountryID === supplier.countryID
  );
  const availableBranches = formData.branches.filter(
    (b) => b.CompanyID === parseInt(supplier.companyID)
  );

  if (loadingForm) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 text-primary mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-muted-foreground">Cargando formulario...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Editar Proveedor" : "Nuevo Proveedor"}
      </h2>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-destructive">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Información del Documento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Documento *
              </label>
              <select
                name="docTypeID"
                value={supplier.docTypeID}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Seleccione</option>
                {formData.sysDocTypes.map((dt) => (
                  <option key={dt.DocTypeID} value={dt.DocTypeID}>
                    {dt.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Número de Documento
              </label>
              <input
                type="text"
                name="docNumber"
                placeholder="Ingrese el número de documento"
                value={supplier.docNumber}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={50}
              />
            </div>
          </div>
        </div>
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Organización</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Compañía</label>
              <div className="flex items-center space-x-2">
                <select
                  name="companyID"
                  value={supplier.companyID}
                  onChange={handleChange}
                  className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  {formData.companies.map((c) => (
                    <option key={c.CompanyID} value={c.CompanyID}>
                      {c.Name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowCompanyModal(true)}
                  className="text-foreground/80 hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            <div>
              <label className="block text-sm font-medium mb-2">Sucursal</label>
              <div className="flex items-center space-x-2">
                <select
                  name="branchID"
                  value={supplier.branchID}
                  onChange={handleChange}
                  className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!supplier.companyID}
                >
                  <option value="">Todos</option>
                  {availableBranches.length > 0 &&
                    availableBranches.map((b) => (
                      <option key={b.BranchID} value={b.BranchID}>
                        {b.Name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowBranchModal(true)}
                  className="text-foreground/80 hover:text-foreground"
                  disabled={!supplier.companyID}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
        </div>
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre *</label>
              <input
                type="text"
                name="firstName"
                placeholder="Nombre del proveedor"
                value={supplier.firstName}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Apellido</label>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido del proveedor"
                value={supplier.lastName}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={100}
              />
            </div>
          </div>
        </div>
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Información de Contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@ejemplo.com"
                value={supplier.email}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Teléfono</label>
              <input
                type="tel"
                name="phone"
                placeholder="Número de teléfono"
                value={supplier.phone}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={20}
              />
            </div>
          </div>
        </div>
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Información de Ubicación
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                placeholder="Dirección completa"
                value={supplier.address}
                onChange={handleChange}
                className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={200}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">País *</label>
                <select
                  name="countryID"
                  value={supplier.countryID}
                  onChange={handleChange}
                  className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleccione</option>
                  {formData.countries.map((c) => (
                    <option key={c.CountryID} value={c.CountryID}>
                      {c.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Provincia *
                </label>
                <select
                  name="provinceID"
                  value={supplier.provinceID}
                  onChange={handleChange}
                  className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleccione</option>
                  {availableProvinces.length > 0 ? (
                    availableProvinces.map((p) => (
                      <option key={p.ProvinceID} value={p.ProvinceID}>
                        {p.Name}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay provincias disponibles</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={supplier.city}
                  onChange={handleChange}
                  className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={100}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Código postal"
                  value={supplier.postalCode}
                  onChange={handleChange}
                  className="w-full border  p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={20}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" p-4 rounded-lg">
          <div className="mt-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isActive"
                checked={supplier.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-primary   rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Proveedor activo</span>
            </label>
            <p className="text-xs text-foreground/80 mt-1">
              Los proveedores inactivos no aparecerán en las búsquedas por
              defecto
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 border  rounded-lg hover: disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || !supplier.firstName.trim()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEdit ? "Actualizando..." : "Guardando..."}
              </>
            ) : isEdit ? (
              "Actualizar Proveedor"
            ) : (
              "Guardar Proveedor"
            )}
          </button>
        </div>
      </form>
      {showCompanyModal && (
        <CompanySearchModal
          isOpen={true}
          onClose={() => setShowCompanyModal(false)}
          onSelect={(c) => {
            setSupplier((prev) => ({
              ...prev,
              companyID: c.CompanyID,
              branchID: "",
            }));
            setShowCompanyModal(false);
          }}
        />
      )}
      {showBranchModal && (
        <BranchSearchModal
          isOpen={true}
          companyID={supplier.companyID || null}
          onClose={() => setShowBranchModal(false)}
          onSelect={(b) => {
            setSupplier((prev) => ({
              ...prev,
              branchID: b.BranchID,
              companyID: prev.companyID || b.CompanyID,
            }));
            setShowBranchModal(false);
          }}
        />
      )}
    </div>
  );
}
