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
import { BASE_ROUTE, useCheckMovementForm } from "~/features/check-movement/useCheckMovementForm";

export function CheckMovementForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useCheckMovementForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Movimientos de Cheque</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Movimiento de Cheque" : "Nuevo Movimiento de Cheque"}
          </h2>
          {data?.CheckMovementID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.CheckMovementID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Fecha:</strong> {new Date(data.EventDate).toLocaleDateString()}
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
                  <legend className="font-semibold mb-4 text-md">Información del movimiento</legend>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="CompanyID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Empresa*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de empresa"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                  disabled={isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="CheckID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Cheque*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del cheque"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="EventDate"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Fecha del Evento*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="date"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="EventType"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Tipo de Evento*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Tipo de evento"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormBlock>
                        <FormField
                          name="BankAccountID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Cuenta Bancaria</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID cuenta bancaria"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
                          name="BranchID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Sucursal</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID sucursal"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
                          name="TransactionID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Transacción</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID transacción"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

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
                                placeholder="Observaciones del movimiento"
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

export default CheckMovementForm;