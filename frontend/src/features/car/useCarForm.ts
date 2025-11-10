import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { carOperations } from "~/services/car.service";

export const BASE_ROUTE = "/cars";

const carFormSchema = z.object({
  companyID: z.string().min(1, "Compañía es requerida"),
  carBrandID: z.string().min(1, "Marca es requerida"),
  carModelID: z.string().min(1, "Modelo es requerido"),
  clientID: z.string().min(1, "Cliente es requerido"),
  licensePlate: z.string().min(1, "Patente es requerida"),
  year: z.string().optional(),
  lastServiceMileage: z.string().optional(),
  isDebtor: z.boolean(),
  discountID: z.string().min(1, "Descuento es requerido"),
});

export type CarFormData = z.infer<typeof carFormSchema>;

interface UseCarFormProps {
  id?: string;
  initialData?: any;
  onSave?: (result: any) => void;
  onCancel?: () => void;
}

export function useCarForm({
  id,
  initialData,
  onSave,
  onCancel,
}: UseCarFormProps = {}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(id || initialData);

  const form = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    mode: "onBlur",
    defaultValues: {
      companyID: "",
      carBrandID: "",
      carModelID: "",
      clientID: "",
      licensePlate: "",
      year: "",
      lastServiceMileage: "",
      isDebtor: false,
      discountID: "",
    },
  });

  // Load car data by ID
  const loadCarData = useCallback(async () => {
    if (!id) return;

    try {
      setLoadingData(true);
      const carData = await carOperations.getCarById(id);
      if (carData) {
        form.reset({
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
      console.error("Error loading car data:", err);
      toast.error("Error cargando los datos del vehículo");
    } finally {
      setLoadingData(false);
    }
  }, [id, form]);

  // Load data from ID
  useEffect(() => {
    if (id) {
      loadCarData();
    }
  }, [loadCarData, id]);

  // Load initial data
  useEffect(() => {
    if (initialData) {
      form.reset({
        companyID: initialData.CompanyID?.toString() || "",
        carBrandID: initialData.CarBrandID?.toString() || "",
        carModelID: initialData.CarModelID?.toString() || "",
        clientID: initialData.ClientID?.toString() || "",
        licensePlate: initialData.LicensePlate || "",
        year: initialData.Year?.toString() || "",
        lastServiceMileage: initialData.LastServiceMileage?.toString() || "",
        isDebtor: initialData.IsDebtor || false,
        discountID: initialData.DiscountID?.toString() || "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (formData: CarFormData) => {
    setLoading(true);
    setError("");

    try {
      // Transform form data to API format
      const carData = {
        ...(formData.companyID && { CompanyID: parseInt(formData.companyID) }),
        CarModelID: parseInt(formData.carModelID),
        ClientID: parseInt(formData.clientID),
        LicensePlate: formData.licensePlate,
        Year: formData.year ? parseInt(formData.year) : null,
        LastServiceMileage: formData.lastServiceMileage
          ? parseInt(formData.lastServiceMileage)
          : null,
        IsDebtor: formData.isDebtor,
        DiscountID: parseInt(formData.discountID),
      };

      let result;
      if (isEditing) {
        const carId = id || (initialData && initialData.CarID);
        result = await carOperations.updateCar(carId, carData as any);
        toast.success("Vehículo actualizado correctamente");
      } else {
        result = await carOperations.createCar(carData as any);
        toast.success("Vehículo creado correctamente");
      }

      if (onSave) {
        onSave(result);
      } else {
        navigate(BASE_ROUTE, {
          state: { highlight: result?.CarID },
        });
      }

      return result;
    } catch (error) {
      console.error("Error:", error);
      setError((error as Error).message);
      toast.error(
        isEditing ? "Error al actualizar vehículo" : "Error al crear vehículo"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    isEditing,
    handleSubmit,
    loading,
    loadingData,
    error,
    navigate,
  };
}
