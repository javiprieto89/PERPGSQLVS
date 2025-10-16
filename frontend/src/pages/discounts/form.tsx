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
import { useGetAllDiscountsQuery } from "~/graphql/_generated/graphql";
import { discountOperations } from "~/services/discount.service";

const BASE_ROUTE = "/discounts";

const formSchema = z.object({
  DiscountID: z.number().optional(),
  DiscountName: z.string().min(1, "Nombre es requerido"),
  Percentage: z.number().min(0, "Porcentaje debe ser mayor o igual a 0").max(100, "Porcentaje debe ser menor o igual a 100"),
});

type FormSchema = z.infer<typeof formSchema>;

export function DiscountForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetAllDiscountsQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      DiscountName: "",
      Percentage: 0,
    },
  });

  useEffect(() => {
    if (id && data?.allDiscounts) {
      const discount = data.allDiscounts.find(d => d.DiscountID === id);
      if (discount) {
        form.reset({
          DiscountID: discount.DiscountID,
          DiscountName: discount.DiscountName,
          Percentage: discount.Percentage || 0,
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        DiscountName: formData.DiscountName,
        Percentage: formData.Percentage,
      };

      if (isEditing && id) {
        await discountOperations.updateDiscount(String(id), payload);
        toast.success("Descuento actualizado correctamente");
      } else {
        await discountOperations.createDiscount(payload);
        toast.success("Descuento creado correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar descuento"
          : "Error al crear descuento"
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
          <Link to={BASE_ROUTE}>Descuentos</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Descuento" : "Nuevo Descuento"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Input
                {...form.register("DiscountName")}
                label="Nombre*"
                type="text"
                placeholder="Nombre del descuento"
                error={form.formState.errors.DiscountName?.message}
                required
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("Percentage", { valueAsNumber: true })}
                label="Porcentaje*"
                type="number"
                step="0.01"
                placeholder="0.00"
                error={form.formState.errors.Percentage?.message}
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
