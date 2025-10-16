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
import { useGetAllCreditCardGroupsQuery } from "~/graphql/_generated/graphql";
import { creditCardGroupOperations } from "~/services/credit-card.service";

const BASE_ROUTE = "/creditcardgroups";

const formSchema = z.object({
  CreditCardGroupID: z.number().optional(),
  GroupName: z.string().min(1, "Nombre es requerido"),
});

type FormSchema = z.infer<typeof formSchema>;

export function CreditCardGroupForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetAllCreditCardGroupsQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      GroupName: "",
    },
  });

  useEffect(() => {
    if (id && data?.allCreditCardGroups) {
      const group = data.allCreditCardGroups.find(g => g.CreditCardGroupID === id);
      if (group) {
        form.reset({
          CreditCardGroupID: group.CreditCardGroupID,
          GroupName: group.GroupName,
        });
      }
    }
  }, [id, data, form]);

  async function handleSubmit(formData: FormSchema) {
    setLoading(true);
    try {
      const payload = {
        GroupName: formData.GroupName,
      };

      if (isEditing && id) {
        await creditCardGroupOperations.updateGroup(id, payload);
        toast.success("Grupo actualizado correctamente");
      } else {
        await creditCardGroupOperations.createGroup(payload);
        toast.success("Grupo creado correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        isEditing
          ? "Error al actualizar grupo"
          : "Error al crear grupo"
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
          <Link to={BASE_ROUTE}>Grupos de Tarjetas</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Grupo" : "Nuevo Grupo"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <Input
                {...form.register("GroupName")}
                label="Nombre*"
                type="text"
                placeholder="Nombre del grupo"
                error={form.formState.errors.GroupName?.message}
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
