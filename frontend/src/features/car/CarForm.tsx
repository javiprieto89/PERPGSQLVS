// frontend/src/features/car/CarForm.tsx
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import CarBrandSearchModal from "~/features/carbrand/CarBrandSearchModal";
import CarModelSearchModal from "~/features/carmodel/CarModelSearchModal";
import ClientSearchModal from "~/features/client/ClientSearchModal";
import { carOperations } from "~/services/car.service";

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
  const location = useLocation();

  // Si no se proporciona initialData, intentar cargar desde params y service
  const carId = params.id;
  const isEdit = Boolean(carId || initialData);
  const formTitle = title || (isEdit ? "Editar Vehículo" : "Nuevo Vehículo");

  const [car, setCar] = useState({
    companyID: "",
    carBrandID: "",
    carModelID: "",
    clientID: "",
    licensePlate: "",
    year: "",
    lastServiceMileage: "",
    isDebtor: false,
    discountID: "",
  });

  const [formData, setFormData] = useState<any>({
    companies: [],
    carBrands: [],
    carModels: [],
    clients: [],
    discounts: [],
  });

  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [error, setError] = useState("");

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const loadFormData = useCallback(async () => {
    try {
      setLoadingForm(true);
      const data = await carOperations.getCarFormData();
      setFormData(data);
    } catch (err) {
      console.error("Error cargando datos del formulario:", err);
      setError("Error cargando los datos del formulario: " + (err as Error).message);
    } finally {
      setLoadingForm(false);
    }
  }, []);

  const loadCarData = useCallback(async () => {
    if (!carId) return;

    try {
      setLoadingForm(true);
      const carData = await carOperations.getCarById(carId);
      if (carData) {
        setCar({
          companyID: (carData as any).CompanyID?.toString() || "",
          carBrandID: (carData as any).CarBrandID?.toString() || "",
          carModelID: carData.CarModelID?.toString() || "",
          clientID: carData.ClientID?.toString() || "",
          licensePlate: carData.LicensePlate || "",
          year: carData.Year?.toString() || "",
          lastServiceMileage: carData.LastServiceMileage?.toString() || "",
          isDebtor: carData.IsDebtor || false,
          discountID: carData.DiscountID?.toString() || "",
        });
      }
    } catch (err) {
      console.error("Error cargando datos del vehículo:", err);
      setError("Error cargando los datos del vehículo: " + (err as Error).message);
    } finally {
      setLoadingForm(false);
    }
  }, [carId]);

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  useEffect(() => {
    if (carId) {
      loadCarData();
    }
  }, [loadCarData, carId]);

  useEffect(() => {
    if (initialData) {
      setCar({
        companyID: initialData.CompanyID || "",
        carBrandID: initialData.CarBrandID || "",
        carModelID: initialData.CarModelID || "",
        clientID: initialData.ClientID || "",
        licensePlate: initialData.LicensePlate || "",
        year: initialData.Year || "",
        lastServiceMileage: initialData.LastServiceMileage || "",
        isDebtor: initialData.IsDebtor || false,
        discountID: initialData.DiscountID || "",
      });
    }
  }, [initialData]);

  // Filtrar marcas por compañía seleccionada
  const availableBrands = formData.carBrands.filter(
    (b: any) =>
      !car.companyID ||
      b.CompanyID == null ||
      b.CompanyID === parseInt(car.companyID)
  );

  // Actualizar modelos disponibles cuando cambia la marca
  const availableModels = formData.carModels.filter(
    (m: any) => m.CarBrandID === parseInt(car.carBrandID)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let processed: any = type === "checkbox" ? checked : value;
    if (
      name.includes("ID") ||
      name === "year" ||
      name === "lastServiceMileage"
    ) {
      processed = value === "" ? "" : parseInt(value);
    }

    setCar((prev) => {
      const updated = { ...prev, [name]: processed };
      if (name === "companyID") {
        updated.carBrandID = "";
        updated.carModelID = "";
      } else if (name === "carBrandID") {
        updated.carModelID = "";
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const carData = {
        ...(car.companyID && { CompanyID: parseInt(car.companyID as string) }),
        CarModelID: parseInt(car.carModelID as string),
        ClientID: parseInt(car.clientID as string),
        LicensePlate: car.licensePlate,
        Year: car.year ? parseInt(car.year as string) : null,
        LastServiceMileage: car.lastServiceMileage
          ? parseInt(car.lastServiceMileage as string)
          : null,
        IsDebtor: car.isDebtor,
        DiscountID: parseInt(car.discountID as string),
      };

      let result;
      if (isEdit) {
        const id = carId || (initialData && initialData.CarID);
        result = await carOperations.updateCar(id, carData as any);
      } else {
        result = await carOperations.createCar(carData as any);
      }

      if (onSave) {
        onSave(result);
      } else {
        // Default behavior: navigate back to list
        navigate("/cars", {
          state: { highlight: result?.CarID },
          replace: true
        });
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
    setCar((prev) => ({
      ...prev,
      clientID: client.ClientID || client.clientID,
    }));
    setShowClientModal(false);
  };

  // Función para manejar la selección de marca desde el modal
  const handleBrandSelect = (brand: any) => {
    setCar((prev) => ({
      ...prev,
      carBrandID: brand.CarBrandID,
      carModelID: "", // Reset model when brand changes
    }));
    setShowBrandModal(false);
  };

  // Función para manejar la selección de modelo desde el modal
  const handleModelSelect = (model: any) => {
    setCar((prev) => ({
      ...prev,
      carModelID: model.CarModelID,
      carBrandID: model.CarBrandID,
    }));
    setShowModelModal(false);
  };

  if (loadingForm) {
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
    <div className="p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      {!showTopBar && (
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      )}

      {error && <ApiErrorMessage error={{ message: error }} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Compañía */}
        <div>
          <label
            htmlFor="companyID"
            className="block text-sm font-medium mb-1"
          >
            Compañía
          </label>
          <select
            id="companyID"
            name="companyID"
            value={car.companyID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {formData.companies.map((c: any) => (
              <option key={c.CompanyID} value={c.CompanyID}>
                {c.Name}
              </option>
            ))}
          </select>
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
            <select
              id="carBrandID"
              name="carBrandID"
              value={car.carBrandID}
              onChange={handleChange}
              className="flex-1 border p-2 rounded"
              required
            >
              <option value="">Seleccione</option>
              {availableBrands.map((b: any) => (
                <option key={b.CarBrandID} value={b.CarBrandID}>
                  {b.Name}
                </option>
              ))}
            </select>
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
            <select
              id="carModelID"
              name="carModelID"
              value={car.carModelID}
              onChange={handleChange}
              className="flex-1 border p-2 rounded"
              required
              disabled={!car.carBrandID}
            >
              <option value="">Seleccione</option>
              {availableModels.map((m: any) => (
                <option key={m.CarModelID} value={m.CarModelID}>
                  {m.Model}
                </option>
              ))}
            </select>
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
            <select
              id="clientID"
              name="clientID"
              value={car.clientID}
              onChange={handleChange}
              className="flex-1 border p-2 rounded"
              required
            >
              <option value="">Seleccione</option>
              {formData.clients.map((c: any) => (
                <option key={c.ClientID} value={c.ClientID}>
                  {c.FirstName} {c.LastName}
                </option>
              ))}
            </select>
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
          <label
            htmlFor="licensePlate"
            className="block text-sm font-medium mb-1"
          >
            Patente
          </label>
          <input
            id="licensePlate"
            type="text"
            name="licensePlate"
            value={car.licensePlate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Año */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-1">
            Año
          </label>
          <input
            id="year"
            type="number"
            name="year"
            value={car.year}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Kilometraje último servicio */}
        <div>
          <label
            htmlFor="lastServiceMileage"
            className="block text-sm font-medium mb-1"
          >
            Kilometraje último servicio
          </label>
          <input
            id="lastServiceMileage"
            type="number"
            name="lastServiceMileage"
            value={car.lastServiceMileage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Deudor */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isDebtor"
              checked={car.isDebtor}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Deudor</span>
          </label>
        </div>

        {/* Descuento */}
        <div>
          <label className="block text-sm font-medium mb-1">Descuento</label>
          <select
            name="discountID"
            value={car.discountID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {formData.discounts.map((d: any) => (
              <option key={d.DiscountID} value={d.DiscountID}>
                {d.DiscountName}
              </option>
            ))}
          </select>
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
              !car.licensePlate ||
              !car.carBrandID ||
              !car.carModelID ||
              !car.clientID ||
              !car.discountID
            }
            variant="primary"
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>

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
          selectedCarBrandID={car.carBrandID ? parseInt(car.carBrandID as string) : null}
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