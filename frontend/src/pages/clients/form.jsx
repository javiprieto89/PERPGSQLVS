import { useCallback, useEffect, useState } from "react";

import { clientOperations } from "~/graphql/operations";

import BranchSearchModal from "~/components/BranchSearchModal";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Input } from "~/components/ui/input";
import CompanySearchModal from "~/features/company/CompanySearchModal";

export function ClientsForm({
  onClose,
  onSave,
  client: initialClient = null, // Para edición
}) {
  const [client, setClient] = useState({
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
    priceListID: "",
    vendorID: "",
  });

  const [formData, setFormData] = useState({
    sysDocTypes: [],
    countries: [],
    provinces: [],
    priceLists: [],
    vendors: [],
    companies: [],
    branches: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);

  // Cargar datos del formulario al montar el componente
  // Función para cargar datos del formulario (usa useCallback)
  const loadFormData = useCallback(async () => {
    try {
      setLoadingForm(true);
      console.log("Cargando datos del formulario...");

      const data = await clientOperations.getClientFormData();
      console.log("Datos del formulario cargados:", data);

      setFormData(data);
    } catch (error) {
      console.error("Error cargando datos del formulario:", error);
      setError("Error cargando los datos del formulario: " + error.message);
    } finally {
      setLoadingForm(false);
    }
  }, []);

  // Cargar datos del formulario al montar el componente
  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  // Configurar si es edición o creación
  useEffect(() => {
    if (initialClient) {
      setIsEdit(true);
      setClient({
        docTypeID: initialClient.DocTypeID
          ? parseInt(initialClient.DocTypeID)
          : "",
        companyID: initialClient.CompanyID
          ? parseInt(initialClient.CompanyID)
          : "",
        branchID: initialClient.BranchID
          ? parseInt(initialClient.BranchID)
          : "",
        docNumber: initialClient.DocNumber || "",
        firstName: initialClient.FirstName || "",
        lastName: initialClient.LastName || "",
        phone: initialClient.Phone || "",
        email: initialClient.Email || "",
        address: initialClient.Address || "",
        city: initialClient.City || "",
        postalCode: initialClient.PostalCode || "",
        isActive: initialClient.IsActive !== false,
        countryID: initialClient.CountryID
          ? parseInt(initialClient.CountryID)
          : "",
        provinceID: initialClient.ProvinceID
          ? parseInt(initialClient.ProvinceID)
          : "",
        priceListID: initialClient.PriceListID
          ? parseInt(initialClient.PriceListID)
          : "",
        vendorID: initialClient.VendorID
          ? parseInt(initialClient.VendorID)
          : "",
      });
    }
  }, [initialClient]);

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

    setClient((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Si cambia el país, actualizar la provincia
    if (name === "countryID") {
      const countryProvinces = formData.provinces.filter(
        (p) => p.CountryID === parseInt(value)
      );
      setClient((prev) => ({
        ...prev,
        countryID: value === "" ? "" : parseInt(value),
        provinceID:
          countryProvinces.length > 0 ? countryProvinces[0].ProvinceID : "",
      }));
    }

    if (name === "companyID") {
      setClient((prev) => ({ ...prev, branchID: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Datos del cliente a enviar:", client);

      let result;
      if (isEdit) {
        // Actualizar cliente existente
        result = await clientOperations.updateClient(
          initialClient.ClientID,
          client
        );
        console.log("Cliente actualizado:", result);
      } else {
        // Crear nuevo cliente
        result = await clientOperations.createClient(client);
        console.log("Cliente creado:", result);
      }

      // Llamar callback de éxito
      if (onSave) {
        onSave(result);
      }

      // Cerrar modal/formulario
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar provincias por país seleccionado
  const availableProvinces = formData.provinces.filter(
    (p) => p.CountryID === parseInt(client.countryID)
  );
  const availableBranches = formData.branches.filter(
    (b) => b.CompanyID === parseInt(client.companyID)
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
        {isEdit ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información del documento */}
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
                value={client.docTypeID}
                onChange={handleChange}
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
              <Input
                type="text"
                name="docNumber"
                placeholder="Ingrese el número de documento"
                value={client.docNumber}
                onChange={handleChange}
                maxLength={50}
              />
            </div>
          </div>
        </div>
        {/* Organización */}
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Organización</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Compañía</label>
              <div className="flex items-center space-x-2">
                <select
                  name="companyID"
                  value={client.companyID}
                  onChange={handleChange}
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
                  value={client.branchID}
                  onChange={handleChange}
                  disabled={!client.companyID}
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
                  disabled={!client.companyID}
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
        {/* Información personal */}
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre *</label>
              <Input
                type="text"
                name="firstName"
                placeholder="Nombre del cliente"
                value={client.firstName}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Apellido</label>
              <Input
                type="text"
                name="lastName"
                placeholder="Apellido del cliente"
                value={client.lastName}
                onChange={handleChange}
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Información de Contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="email@ejemplo.com"
                value={client.email}
                onChange={handleChange}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Teléfono</label>
              <Input
                type="tel"
                name="phone"
                placeholder="Número de teléfono"
                value={client.phone}
                onChange={handleChange}
                maxLength={20}
              />
            </div>
          </div>
        </div>

        {/* Información de ubicación */}
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Información de Ubicación
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Dirección
              </label>
              <Input
                type="text"
                name="address"
                placeholder="Dirección completa"
                value={client.address}
                onChange={handleChange}
                maxLength={200}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">País *</label>
                <select
                  name="countryID"
                  value={client.countryID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  {formData.countries.map((country) => (
                    <option key={country.CountryID} value={country.CountryID}>
                      {country.Name}
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
                  value={client.provinceID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  {availableProvinces.length > 0 ? (
                    availableProvinces.map((province) => (
                      <option
                        key={province.ProvinceID}
                        value={province.ProvinceID}
                      >
                        {province.Name}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay provincias disponibles</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ciudad</label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={client.city}
                  onChange={handleChange}
                  maxLength={100}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código Postal
                </label>
                <Input
                  type="text"
                  name="postalCode"
                  placeholder="Código postal"
                  value={client.postalCode}
                  onChange={handleChange}
                  maxLength={20}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Configuración comercial */}
        <div className=" p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Configuración Comercial
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Lista de Precios *
              </label>
              <select
                name="priceListID"
                value={client.priceListID}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                {formData.priceLists.map((priceList) => (
                  <option
                    key={priceList.PriceListID}
                    value={priceList.PriceListID}
                  >
                    {priceList.Name}{" "}
                    {priceList.Description && `- ${priceList.Description}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Vendedor *
              </label>
              <select
                name="vendorID"
                value={client.vendorID}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                {formData.vendors.map((vendor) => (
                  <option key={vendor.VendorID} value={vendor.VendorID}>
                    {vendor.VendorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-3">
              <Input
                type="checkbox"
                name="isActive"
                checked={client.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-primary   rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Cliente activo</span>
            </label>
            <p className="text-xs text-foreground/80 mt-1">
              Los clientes inactivos no aparecerán en las búsquedas por defecto
            </p>
          </div>
        </div>

        {/* Resumen de datos (solo en edición) */}
        {isEdit && (
          <div className="bg-accent p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Información del Cliente
            </h3>
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>ID:</strong> {initialClient?.ClientID}
              </p>
              <p>
                <strong>Creado:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {client.isActive ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>
        )}

        {/* Botones de acción */}
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
            disabled={loading || !client.firstName.trim()}
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
              "Actualizar Cliente"
            ) : (
              "Guardar Cliente"
            )}
          </button>
        </div>
      </form>
      {showCompanyModal && (
        <CompanySearchModal
          isOpen={true}
          onClose={() => setShowCompanyModal(false)}
          onSelect={(c) => {
            setClient((prev) => ({
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
          companyID={client.companyID || null}
          onClose={() => setShowBranchModal(false)}
          onSelect={(b) => {
            setClient((prev) => ({
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
