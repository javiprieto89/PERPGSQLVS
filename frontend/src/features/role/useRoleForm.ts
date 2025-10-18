// frontend/src/features/role/useRoleForm.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useGetRoleByIdQuery } from "~/graphql/_generated/graphql";
import { roleOperations } from "~/services/role.service";

export const BASE_ROUTE = "/roles";

const formSchema = z.object({
  RoleName: z.string().min(1, "El nombre del rol es requerido"),
});

type FormSchema = z.infer<typeof formSchema>;

interface UseRoleFormOptions {
  id?: number; // RoleID
  initialData?: any;
}

export function useRoleForm({ id, initialData }: UseRoleFormOptions = {}) {
  const navigate = useNavigate();
  const isEditing = !!id || !!initialData;

  // Query para cargar datos del rol si estamos editando
  const {
    data: roleData,
    loading: isLoading,
    error: queryError,
  } = useGetRoleByIdQuery({
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      RoleName: "",
    },
  });

  // Cargar datos del rol cuando llegan del GraphQL o desde initialData
  useEffect(() => {
    const data = roleData?.rolesById || initialData;
    if (data) {
      form.reset({
        RoleName: data.RoleName || "",
      });
    }
  }, [roleData, initialData, form]);

  const handleSubmit = async (data: FormSchema) => {
    try {
      let result;
      if (isEditing) {
        const roleId = id || initialData?.RoleID;
        result = await roleOperations.updateRole(roleId, data);
        toast.success("Rol actualizado exitosamente");
      } else {
        result = await roleOperations.createRole(data);
        toast.success("Rol creado exitosamente");
      }

      navigate(BASE_ROUTE);
      return result;
    } catch (error: any) {
      toast.error(error?.message || "Error al guardar el rol");
      throw error;
    }
  };

  return {
    form,
    handleSubmit,
    data: roleData?.rolesById || initialData,
    isEditing,
    isLoading,
    isSaving: form.formState.isSubmitting,
    errors: form.formState.errors,
    queryError,
  };
}
