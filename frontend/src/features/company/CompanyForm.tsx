// frontend/src/features/company/CompanyForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetCompanyByIdQuery } from "~/graphql/_generated/graphql";
import { companyOperations } from "~/services/company.service";

interface CompanyFormProps {
  onSave?: (result: any) => void;
  onCancel?: () => void;
  initialData?: any;
  showTopBar?: boolean;
  title?: string;
}

export function CompanyForm({
  onSave = () => { },
  onCancel,
  initialData,
  showTopBar = true,
  title,
}: CompanyFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuit, setCuit] = useState("");
  const [grossIncome, setGrossIncome] = useState("");
  const [startDate, setStartDate] = useState("");
  const [logo, setLogo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Query para obtener datos si hay ID (edit mode)
  const { data: companyData, loading: queryLoading, error: queryError } = useGetCompanyByIdQuery({
    variables: { id: id ? parseInt(id) : 0 },
    skip: !id,
  });

  // Determinar si estamos en modo edición
  const isEditMode = !!(id || initialData);
  const company = initialData || companyData?.companyById;

  // Llenar form cuando hay datos
  useEffect(() => {
    if (company) {
      setName(company.Name || "");
      setAddress(company.Address || "");
      setCuit(company.CUIT || "");
      setGrossIncome(company.GrossIncome || "");
      setStartDate(company.StartDate || "");
      setLogo(company.Logo || "");
      setPhone(company.Phone || "");
      setEmail(company.Email || "");
    }
  }, [company]);

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMessage("El nombre es requerido");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const companyData = {
        Name: name,
        Address: address,
        CUIT: cuit,
        GrossIncome: grossIncome,
        StartDate: startDate,
        Logo: logo,
        Phone: phone,
        Email: email,
      };

      let result;
      if (isEditMode) {
        const companyId = id ? id : company?.CompanyID?.toString();
        result = await companyOperations.updateCompany(companyId!, companyData);
      } else {
        result = await companyOperations.createCompany(companyData);
      }

      onSave(result);

      // Si no hay onCancel (estamos en página), navegar de vuelta
      if (!onCancel) {
        navigate("/company");
      }
    } catch (error) {
      console.error("Error saving company:", error);
      setErrorMessage("Error al guardar la empresa");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/company");
    }
  };

  // Loading state
  if (queryLoading && id) {
    return <AlertLoading message="Cargando empresa..." />;
  }

  // Error state
  if (queryError) {
    return <ApiErrorMessage error={queryError} />;
  }

  const formTitle = title || (isEditMode ? "Editar Empresa" : "Nueva Empresa");

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
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Nombre de la empresa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CUIT</label>
            <input
              type="text"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="XX-XXXXXXXX-X"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Dirección completa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="email@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ingresos Brutos</label>
            <input
              type="text"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Número de ingresos brutos"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Logo (Base64)</label>
            <textarea
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              placeholder="Código base64 del logo"
            />
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
    </div>
  );
}