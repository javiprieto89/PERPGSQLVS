import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { useGetAllServicetypesQuery } from "~/graphql/_generated/graphql";
import { serviceTypeOperations } from "~/services/service-type.service";

const BASE_ROUTE = "/servicetypes";

const formSchema = z.object({
  ServiceTypeID: z.number().optional(),
  Type: z.string().min(1, "Nombre es requerido"),
});

type FormSchema = z.infer<typeof formSchema>;

export function ServiceTypeForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  // const { data, refetch } = useGetAllServiceTypesQuery();
  const { data, refetch } = useGetAllServicetypesQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      Type: "",
    },
  });

  useEffect(() => {
    if (id && data?.allServiceTypes) {
      const serviceType = data.allServiceTypes.find(st => st.ServiceTypeID === id);
      if (serviceType) {
        form.reset({
          ServiceTypeID: serviceType.ServiceTypeID,
          Type: serviceType.Type,
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        Type: formData.Type,
      };

      if (isEditing && id) {
        await serviceTypeOperations.updateServicetype(id, payload);
        toast.success("Tipo de servicio actualizado correctamente");
      } else {
        await serviceTypeOperations.createServicetype(payload);
        toast.success("Tipo de servicio creado correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar tipo de servicio"
          : "Error al crear tipo de servicio"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Tipos de Servicio</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Tipo de Servicio" : "Nuevo Tipo de Servicio"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Input
                {...form.register("Type")}
                label="Nombre*"
                type="text"
                placeholder="Nombre del tipo de servicio"
                error={form.formState.errors.Type?.message}
                required
              />
            </FormBlock>

            <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
              <Link className="mt-auto" to={BASE_ROUTE}>Cancelar</Link>
              <Submit type="submit" disabled={loading} isSubmitting={loading}>
                Guardar
              </Submit>
            </FormBlock>
          </form>
        </Form>
      </div>
    </>
  );
}
