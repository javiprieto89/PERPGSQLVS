// frontend/src/features/car/CarForm.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Checkbox } from "~/components/form/Checkbox";
import { Input } from "~/components/form/Input";
import { Select } from "~/components/form/Select";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import CarBrandSearchModal from "~/features/carbrand/CarBrandSearchModal";
import CarModelSearchModal from "~/features/carmodel/CarModelSearchModal";
import ClientSearchModal from "~/features/client/ClientSearchModal";
import { useGetCarFormDataQuery } from "~/graphql/_generated/graphql";
import { useCarForm } from "./useCarForm";

interface CarFormProps {
  initialData?: any;
  onSave?: (result: any) => void;
  onCancel?: () => void;
  showTopBar?: boolean;
  title?: string;
}

export function CarForm({
  initialData = null,
  onSave,
  onCancel,
  showTopBar = true,
  title
}: CarFormProps) {
  const navigate = useNavigate();
  const params = useParams();
  const carId = params.id;

  const { form, handleSubmit, isEditing, loading, loadingData, error } = useCarForm({
    id: carId,
    initialData,
    onSave,
    onCancel,
  });

  const { data: formData, loading: formDataLoading } = useGetCarFormDataQuery();

  const formTitle = title || (isEditing ? "Editar Vehículo" : "Nuevo Vehículo");

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  // Filtrar marcas por compañía seleccionada
  const companyID = form.watch("companyID");
  const carBrandID = form.watch("carBrandID");

  const availableBrands = companyID ? formData?.carBrands.filter(
    (b: any) => b.CompanyID === companyID
  ) : [];

  // Actualizar modelos disponibles cuando cambia la marca
  const availableModels = formData?.carModels ? formData?.carModels.filter(
    (m: any) => m.CarBrandID === parseInt(carBrandID)
  ) : [];



  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Default behavior: navigate back
      navigate("/cars");
    }
  };

  // Función para manejar la selección de cliente desde el modal
  const handleClientSelect = (client: any) => {
    form.setValue("clientID", client.ClientID || client.clientID);
    setShowClientModal(false);
  };

  // Función para manejar la selección de marca desde el modal
  const handleBrandSelect = (brand: any) => {
    form.setValue("carBrandID", brand.CarBrandID);
    form.setValue("carModelID", ""); // Reset model when brand changes
    setShowBrandModal(false);
  };

  // Función para manejar la selección de modelo desde el modal
  const handleModelSelect = (model: any) => {
    form.setValue("carModelID", model.CarModelID);
    form.setValue("carBrandID", model.CarBrandID);
    setShowModelModal(false);
  };

  if (loadingData) {
    return (
      <>
        {showTopBar && (
          <AdminTopBar title={formTitle} quickAccessHidden />
        )}
        <div className="p-6 max-w-2xl mx-auto">
          <AlertLoading message="Cargando formulario..." />
        </div>
      </>
    );
  }

  const formContent = (
    <div className="max-w-2xl mx-auto">
      {!showTopBar && (
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      )}

      {error && <ApiErrorMessage error={{ message: error }} />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Compañía */}
          <div>
            <Select
              {...form.register("companyID")}
              className="w-full"
              required
              label="Compañía"
              error={form.formState.errors.companyID?.message}
            >
              <option value="">Seleccione</option>
              {formData?.companies.map((c: any) => (
                <option key={c.CompanyID} value={c.CompanyID}>
                  {c.CompanyName}
                </option>
              ))}
            </Select>
          </div>

          {/* Marca */}
          <div>
            <label
              htmlFor="carBrandID"
              className="block text-sm font-medium mb-1"
            >
              Marca
            </label>
            <div className="flex items-center space-x-2">
              <Select
                {...form.register("carBrandID")}
                className="flex-1"
                required
                error={form.formState.errors.carBrandID?.message}
              >
                <option value="">Seleccione</option>
                {availableBrands?.map((b: any) => (
                  <option key={b.CarBrandID} value={b.CarBrandID}>
                    {b.BrandName}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => setShowBrandModal(true)}
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

          {/* Modelo */}
          <div>
            <label
              htmlFor="carModelID"
              className="block text-sm font-medium mb-1"
            >
              Modelo
            </label>
            <div className="flex items-center space-x-2">
              <Select
                {...form.register("carModelID")}
                className="flex-1"
                required
                disabled={!carBrandID}
                error={form.formState.errors.carModelID?.message}
              >
                <option value="">Seleccione</option>
                {availableModels?.map((m: any) => (
                  <option key={m.CarModelID} value={m.CarModelID}>
                    {m.ModeloName}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => setShowModelModal(true)}
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

          {/* Cliente */}
          <div>
            <label
              htmlFor="clientID"
              className="block text-sm font-medium mb-1"
            >
              Cliente
            </label>
            <div className="flex items-center space-x-2">
              <Select
                {...form.register("clientID")}
                className="flex-1"
                required
                error={form.formState.errors.clientID?.message}
              >
                <option value="">Seleccione</option>
                {formData?.clients.map((c: any) => (
                  <option key={c.ClientID} value={c.ClientID}>
                    {c.FirstName} {c.LastName}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => setShowClientModal(true)}
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

          {/* Patente */}
          <div>
            <Input
              {...form.register("licensePlate")}
              type="text"
              label="Patente"
              required
              error={form.formState.errors.licensePlate?.message}
            />
          </div>

          {/* Año */}
          <div>
            <Input
              {...form.register("year")}
              type="number"
              label="Año"
            />
          </div>

          {/* Kilometraje último servicio */}
          <div>
            <Input
              {...form.register("lastServiceMileage")}
              type="number"
              label="Kilometraje último servicio"
            />
          </div>

          {/* Deudor */}
          <div>
            <Checkbox
              {...form.register("isDebtor")}
              label="Deudor"
            />
          </div>

          {/* Descuento */}
          <div>
            <Select
              {...form.register("discountID")}
              label="Descuento"
              required
              error={form.formState.errors.discountID?.message}
            >
              <option value="">Seleccione</option>
              {formData?.discounts.map((d: any) => (
                <option key={d.DiscountID} value={d.DiscountID}>
                  {d.DiscountName}
                </option>
              ))}
            </Select>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                loading ||
                !form.formState.isValid
              }
              variant="primary"
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Modales */}
      {showBrandModal && (
        <CarBrandSearchModal
          isOpen={true}
          onClose={() => setShowBrandModal(false)}
          onBrandSelect={handleBrandSelect}
        />
      )}

      {showModelModal && (
        <CarModelSearchModal
          isOpen={true}
          onClose={() => setShowModelModal(false)}
          onModelSelect={handleModelSelect}
          selectedCarBrandID={carBrandID ? parseInt(carBrandID as string) : null}
        />
      )}

      {showClientModal && (
        <ClientSearchModal
          isOpen={true}
          onClose={() => setShowClientModal(false)}
          onClientSelect={handleClientSelect}
        />
      )}
    </div>
  );

  return (
    <>
      {showTopBar && (
        <AdminTopBar title={formTitle} quickAccessHidden />
      )}
      <div className="m-x-auto space-y-4 p-4">
        {formContent}
      </div>
    </>
  );
}