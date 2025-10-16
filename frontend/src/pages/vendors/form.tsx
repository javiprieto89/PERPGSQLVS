import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Checkbox } from "~/components/form/Checkbox";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { useGetAllVendorsQuery } from "~/graphql/_generated/graphql";
import { vendorOperations } from "~/services/vendor.service";

const BASE_ROUTE = "/vendors";

const formSchema = z.object({
  VendorID: z.number().optional(),
  VendorName: z.string().min(1, "Nombre es requerido"),
  Commission: z.number().nullable().optional(),
  IsActive: z.boolean().default(true),
});

type FormSchema = z.infer<typeof formSchema>;

export function VendorForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetAllVendorsQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      VendorName: "",
      Commission: null,
      IsActive: true,
    },
  });

  useEffect(() => {
    if (id && data?.allVendors) {
      const vendor = data.allVendors.find(v => v.VendorID === id);
      if (vendor) {
        form.reset({
          VendorID: vendor.VendorID,
          VendorName: vendor.VendorName,
          Commission: vendor.Commission,
          IsActive: vendor.IsActive,
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        VendorName: formData.VendorName,
        Commission: formData.Commission,
        IsActive: formData.IsActive,
      };

      if (isEditing && id) {
        await vendorOperations.updateVendor(id, payload);
        toast.success("Vendedor actualizado correctamente");
      } else {
        await vendorOperations.createVendor(payload);
        toast.success("Vendedor creado correctamente");
      }
      
      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar vendedor"
          : "Error al crear vendedor"
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
          <Link to={BASE_ROUTE}>Vendedores</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Vendedor" : "Nuevo Vendedor"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Input
                {...form.register("VendorName")}
                label="Nombre"
                type="text"
                error={form.formState.errors.VendorName?.message}
                required
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("Commission", { valueAsNumber: true })}
                label="Comisión (%)"
                type="number"
                step="0.01"
                error={form.formState.errors.Commission?.message}
              />
            </FormBlock>

            <FormBlock>
              <Checkbox
                label="Activo"
                {...form.register("IsActive")}
                error={form.formState.errors.IsActive?.message}
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
