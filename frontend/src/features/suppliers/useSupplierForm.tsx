import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetAllSuppliersDocument,
  useCreateSupplierMutation,
  useGetSuppliersByIdQuery,
  useUpdateSupplierMutation,
  type SuppliersCreate
} from "~/graphql/_generated/graphql";
import { formSchema, supplierHelpers, type SupplierFormSchema } from "./supplierHelpers";

export const BASE_ROUTE = "/suppliers";

interface FormOptions {
  id?: number; // ie: SupplierID
}

export function useSupplierForm({ id }: FormOptions = {}) {
  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetSuppliersByIdQuery({
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetAllSuppliersDocument
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateMutation, { loading: updateLoading, error: updateError }] =
    useUpdateSupplierMutation(refetchConfig);
  const [createMutation, { loading: createLoading, error: createError }] =
    useCreateSupplierMutation(refetchConfig);

  const client = data?.suppliersById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<SupplierFormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!data?.suppliersById) return;
    form.reset(
      supplierHelpers.prepareDataFormSchema(data),
      {
        keepDirty: true,
        keepDirtyValues: true,
        keepFieldsRef: true,
      }
    );
  }, [data?.suppliersById, form]);

  async function handleSubmit(data: SupplierFormSchema) {
    try {
      let highlight = null;
      if (isEditing && data.SupplierID) {
        const { SupplierID, ...rest } = data;
        const result = await updateMutation({
          variables: {
            supplierID: SupplierID,
            input: supplierHelpers.prepareData(rest),
          },
        });
        highlight = SupplierID;
      } else {
        const result = await createMutation({
          variables: {
            input: supplierHelpers.prepareData(data) as SuppliersCreate,
          },
        });
        highlight = result.data?.createSupplier.SupplierID;
      }

      navigate("/suppliers", {
        state: {
          highlight: highlight,
        },
      });
      toast.message(isEditing ? "Actualizado con éxito" : "Creado con éxito");
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Contacte al administrador del sistema");
    }
  }

  return {
    navigate,
    form,
    handleSubmit,
    data: client,
    isEditing,
    isLoading,
    isSaving,
    errors: {
      query: queryError,
      update: updateError,
      create: createError,
    },
  };
}


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       let result;
//       if (isEdit) {
//         result = await supplierOperations.updateSupplier(
//           initialSupplier.SupplierID,
//           supplier
//         );
//       } else {
//         result = await supplierOperations.createSupplier(supplier);
//       }
//       if (onSave) onSave(result);
//       if (onClose) onClose();
//     } catch (err) {
//       console.error("Error guardando proveedor:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [supplier, setSupplier] = useState({
//     docTypeID: "",
//     companyID: "",
//     branchID: "",
//     docNumber: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     isActive: true,
//     countryID: "",
//     provinceID: "",
//   });

//   const [formData, setFormData] = useState({
//     sysDocTypes: [],
//     countries: [],
//     provinces: [],
//     companies: [],
//     branches: [],
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingForm, setLoadingForm] = useState(true);
//   const [isEdit, setIsEdit] = useState(false);
//   const [showCompanyModal, setShowCompanyModal] = useState(false);
//   const [showBranchModal, setShowBranchModal] = useState(false);

//   const loadFormData = useCallback(async () => {
//     try {
//       setLoadingForm(true);
//       const data = await supplierOperations.getSupplierFormData();
//       setFormData(data);
//     } catch (err) {
//       console.error("Error cargando datos del formulario:", err);
//       setError("Error cargando los datos del formulario: " + err.message);
//     } finally {
//       setLoadingForm(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadFormData();
//   }, [loadFormData]);

//   useEffect(() => {
//     if (initialSupplier) {
//       setIsEdit(true);
//       setSupplier({
//         docTypeID: initialSupplier.DocTypeID
//           ? parseInt(initialSupplier.DocTypeID)
//           : "",
//         companyID: initialSupplier.CompanyID
//           ? parseInt(initialSupplier.CompanyID)
//           : "",
//         branchID: initialSupplier.BranchID
//           ? parseInt(initialSupplier.BranchID)
//           : "",
//         docNumber: initialSupplier.DocNumber || "",
//         firstName: initialSupplier.FirstName || "",
//         lastName: initialSupplier.LastName || "",
//         phone: initialSupplier.Phone || "",
//         email: initialSupplier.Email || "",
//         address: initialSupplier.Address || "",
//         city: initialSupplier.City || "",
//         postalCode: initialSupplier.PostalCode || "",
//         isActive: initialSupplier.IsActive !== false,
//         countryID: initialSupplier.CountryID
//           ? parseInt(initialSupplier.CountryID)
//           : "",
//         provinceID: initialSupplier.ProvinceID
//           ? parseInt(initialSupplier.ProvinceID)
//           : "",
//       });
//     }
//   }, [initialSupplier]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let processedValue;
//     if (type === "checkbox") {
//       processedValue = checked;
//     } else if (name.includes("ID")) {
//       processedValue = value === "" ? "" : parseInt(value);
//     } else {
//       processedValue = value;
//     }
//     setSupplier((prev) => ({
//       ...prev,
//       [name]: processedValue,
//     }));
//     if (name === "countryID") {
//       setSupplier((prev) => ({
//         ...prev,
//         provinceID: "",
//       }));
//     }
//     if (name === "companyID") {
//       setSupplier((prev) => ({
//         ...prev,
//         branchID: "",
//       }));
//     }
//   };