// Sale Condition Form - Modernized with React Hook Form + Zod
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// Components
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";


// GraphQL
import {
  useCreateSaleConditionMutation,
  useGetAllCreditCardsQuery,
  useGetAllSaleConditionsQuery,
  useUpdateSaleConditionMutation
} from "~/graphql/_generated/graphql";

const BASE_ROUTE = "/saleconditions";

// Form Schema
const formSchema = z.object({
  Name: z.string().min(1, "El nombre es requerido"),
  DueDate: z.string().min(1, "La fecha de vencimiento es requerida"),
  Surcharge: z.number().min(0, "El recargo debe ser mayor o igual a 0"),
  CreditCardID: z.number().min(1, "La tarjeta de crédito es requerida"),
  IsActive: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function SaleConditionForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = Boolean(id);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      DueDate: "",
      Surcharge: 0,
      CreditCardID: 0,
      IsActive: true,
    },
  });

  const [loading, setLoading] = useState(false);

  // GraphQL Hooks
  const { data: creditCardsData } = useGetAllCreditCardsQuery();
  const creditCards = creditCardsData?.allCreditcards || [];
  const { refetch } = useGetAllSaleConditionsQuery();
  const [createSaleCondition] = useCreateSaleConditionMutation();
  const [updateSaleCondition] = useUpdateSaleConditionMutation();

  // TODO: Load sale condition data for editing mode
  useEffect(() => {
    if (isEditing && id) {
      console.log("Editing mode for sale condition ID:", id);
    }
  }, [id, isEditing]);

  const handleSubmit = async (formData: FormSchema) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateSaleCondition({
          variables: {
            saleConditionID: id,
            input: {
              Name: formData.Name,
              DueDate: formData.DueDate,
              Surcharge: formData.Surcharge,
              CreditCardID: formData.CreditCardID,
              IsActive: formData.IsActive,
            },
          },
        });
        toast.success("Condición de venta actualizada correctamente");
      } else {
        await createSaleCondition({
          variables: {
            input: {
              Name: formData.Name,
              DueDate: formData.DueDate,
              Surcharge: formData.Surcharge,
              CreditCardID: formData.CreditCardID,
              IsActive: formData.IsActive ?? true,
            },
          },
        });
        toast.success("Condición de venta creada correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(isEditing ? "Error al actualizar condición" : "Error al crear condición");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Condiciones de Venta</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Condición de Venta" : "Nueva Condición de Venta"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Input
                {...form.register("Name")}
                label="Nombre *"
                type="text"
                placeholder="Ingrese el nombre de la condición"
                error={form.formState.errors.Name?.message}
                required
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("DueDate")}
                label="Fecha de Vencimiento *"
                type="date"
                error={form.formState.errors.DueDate?.message}
                required
              />
            </FormBlock>

            <FormBlock>
              <FormField
                control={form.control}
                name="CreditCardID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarjeta de Crédito *</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una tarjeta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {creditCards.map((card) => (
                          <SelectItem key={card.CreditCardID} value={card.CreditCardID.toString()}>
                            {card.CardName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("Surcharge", { valueAsNumber: true })}
                label="Recargo"
                type="number"
                step="0.01"
                placeholder="0.00"
                error={form.formState.errors.Surcharge?.message}
              />
            </FormBlock>

            <FormBlock>
              <FormField
                control={form.control}
                name="IsActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Condición Activa</FormLabel>
                    </div>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="ml-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
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
