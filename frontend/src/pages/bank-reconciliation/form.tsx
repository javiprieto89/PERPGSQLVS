import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router-dom";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { BASE_ROUTE, useBankReconciliationForm } from "../../features/bank-reconciliation/useBankReconciliationForm";

export function BankReconciliationForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useBankReconciliationForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Conciliaciones Bancarias</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Conciliación Bancaria" : "Nueva Conciliación Bancaria"}
          </h2>
          {data?.ReconciliationID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.ReconciliationID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Creado:</strong> {new Date(data.CreatedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} loadingSkeleton={<FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />} />

            {!isLoading && (
              <>
                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">Información de la conciliación</legend>

                  <div className="space-y-4">
                    <FormBlock>
                      <FormField
                        name="StatementDate"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Fecha del Estado*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="date"
                                placeholder="Fecha del estado"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormBlock>

                    <FormBlock>
                      <FormField
                        name="ClosingBalance"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Saldo de Cierre*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                value={field.value?.toString() || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormBlock>

                    <FormBlock>
                      <FormField
                        name="Notes"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Notas</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                value={field.value || ""}
                                placeholder="Notas adicionales sobre la conciliación"
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormBlock>
                  </div>
                </Fieldset>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    disabled={isSaving || !form.formState.isValid}
                  >
                    {isSaving ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}

export default BankReconciliationForm;