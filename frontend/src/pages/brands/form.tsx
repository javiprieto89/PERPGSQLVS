import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Checkbox } from "~/components/form/Checkbox";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { CompanyCombo } from "~/features/company/CompanyCombo";
import { useGetAllBrandsQuery } from "~/graphql/_generated/graphql";
import { brandOperations } from "~/services/brand.service";

const BASE_ROUTE = "/brands";

const formSchema = z.object({
  BrandID: z.number().optional(),
  BrandName: z.string().min(1, "Nombre es requerido"),
  CompanyID: z.number().min(1, "Compañía es requerida"),
  IsActive: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export function BrandForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetAllBrandsQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      BrandName: "",
      CompanyID: 0,
      IsActive: true,
    },
  });

  useEffect(() => {
    if (id && data?.allBrands) {
      const brand = data.allBrands.find(b => b.BrandID === id);
      if (brand) {
        form.reset({
          BrandID: brand.BrandID,
          BrandName: brand.BrandName,
          CompanyID: brand.CompanyData?.CompanyID,
          IsActive: Boolean(brand.IsActive),
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        BrandName: formData.BrandName,
        CompanyID: formData.CompanyID,
        IsActive: formData.IsActive,
      };

      if (isEditing && id) {
        await brandOperations.updateBrand(String(id), payload);
        toast.success("Marca actualizada correctamente");
      } else {
        await brandOperations.createBrand(payload);
        toast.success("Marca creada correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar marca"
          : "Error al crear marca"
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
          <Link to={BASE_ROUTE}>Marcas</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Marca" : "Nueva Marca"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <CompanyCombo
                {...form.register("CompanyID")}
                defaultValue={String(form.getValues("CompanyID") || 0)}
                onSelect={(value) => {
                  form.setValue("CompanyID", Number(value), { shouldTouch: true, shouldDirty: true });
                  form.clearErrors("CompanyID");
                }}
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("BrandName")}
                label="Nombre"
                type="text"
                error={form.formState.errors.BrandName?.message}
                required
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
