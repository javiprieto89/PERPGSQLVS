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
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useGetAllCreditCardGroupsQuery, useGetAllCreditCardsQuery } from "~/graphql/_generated/graphql";
import { creditCardOperations } from "~/services/credit-card.service";

const BASE_ROUTE = "/creditcards";

const formSchema = z.object({
  CreditCardID: z.number().optional(),
  CreditCardGroupID: z.string().min(1, "Grupo es requerido"),
  CardName: z.string().min(1, "Nombre es requerido"),
  Surcharge: z.number().min(0, "Recargo debe ser mayor o igual a 0"),
  Installments: z.number().int().min(0, "Cuotas debe ser un número entero positivo"),
  IsActive: z.boolean().default(true),
});

type FormSchema = z.infer<typeof formSchema>;

export function CreditCardForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetAllCreditCardsQuery();
  const { data: groupsData, loading: groupsLoading } = useGetAllCreditCardGroupsQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      CardName: "",
      CreditCardGroupID: "",
      Surcharge: 0,
      Installments: 0,
      IsActive: true,
    },
  });

  useEffect(() => {
    if (id && data?.allCreditCards) {
      const card = data.allCreditCards.find(c => c.CreditCardID === id);
      if (card) {
        form.reset({
          CreditCardID: card.CreditCardID,
          CardName: card.CardName,
          CreditCardGroupID: String(card.CreditCardGroupID || ""),
          Surcharge: card.Surcharge || 0,
          Installments: card.Installments || 0,
          IsActive: card.IsActive,
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        CardName: formData.CardName,
        CreditCardGroupID: Number(formData.CreditCardGroupID),
        Surcharge: formData.Surcharge,
        Installments: formData.Installments,
        IsActive: formData.IsActive,
      };

      if (isEditing && id) {
        await creditCardOperations.updateCard(id, payload);
        toast.success("Tarjeta actualizada correctamente");
      } else {
        await creditCardOperations.createCard(payload);
        toast.success("Tarjeta creada correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar tarjeta"
          : "Error al crear tarjeta"
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
          <Link to={BASE_ROUTE}>Tarjetas</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Tarjeta" : "Nueva Tarjeta"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Label htmlFor="CreditCardGroupID">Grupo*</Label>
              <FormField
                name="CreditCardGroupID"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={groupsLoading ? "Cargando..." : "Seleccione un grupo..."} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {groupsData?.allCreditCardGroups?.map((group) => (
                              <SelectItem key={group.CreditCardGroupID} value={String(group.CreditCardGroupID)}>
                                {group.GroupName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("CardName")}
                label="Nombre*"
                type="text"
                placeholder="Nombre de la tarjeta"
                error={form.formState.errors.CardName?.message}
                required
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
              <Input
                {...form.register("Installments", { valueAsNumber: true })}
                label="Cuotas"
                type="number"
                placeholder="0"
                error={form.formState.errors.Installments?.message}
              />
            </FormBlock>

            <FormBlock>
              <Checkbox
                label="Tarjeta activa"
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
