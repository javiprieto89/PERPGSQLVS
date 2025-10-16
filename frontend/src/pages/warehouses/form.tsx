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
import { TextArea } from "~/components/form/TextArea";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { useGetWarehousesQuery } from "~/graphql/_generated/graphql";
import { warehouseOperations } from "~/services/warehouse.service";

const BASE_ROUTE = "/warehouses";

const formSchema = z.object({
  WarehouseID: z.number().optional(),
  Name: z.string().min(1, "Nombre es requerido"),
  Addres: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function WarehouseForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  // const { data, refetch } = useGetAllWarehousesQuery();
  const { data, refetch } = useGetWarehousesQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      Name: "",
      Addres: "",
    },
  });

  useEffect(() => {
    if (id && data?.allWarehouses) {
      const warehouse = data.allWarehouses.find(w => w.WarehouseID === id);
      if (warehouse) {
        form.reset({
          WarehouseID: warehouse.WarehouseID,
          Name: warehouse.Name,
          Addres: warehouse.Addres || "",
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        Name: formData.Name,
        Addres: formData.Addres,
      };

      if (isEditing && id) {
        await warehouseOperations.updateWarehouse(id, payload);
        toast.success("Depósito actualizado correctamente");
      } else {
        await warehouseOperations.createWarehouse(payload);
        toast.success("Depósito creado correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar depósito"
          : "Error al crear depósito"
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
          <Link to={BASE_ROUTE}>Depósitos</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Depósito" : "Nuevo Depósito"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Input
                {...form.register("Name")}
                label="Nombre*"
                type="text"
                placeholder="Nombre del depósito"
                error={form.formState.errors.Name?.message}
                required
              />
            </FormBlock>

            <FormBlock>
              <TextArea
                {...form.register("Addres")}
                label="Dirección"
                placeholder="Dirección del depósito"
                error={form.formState.errors.Addres?.message}
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
