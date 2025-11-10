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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { BASE_ROUTE, useCheckForm } from "~/features/check/useCheckForm";

export function CheckForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, banks, isEditing, isLoading, isSaving, errors } = useCheckForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Cheques</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Cheque" : "Nuevo Cheque"}
          </h2>
          {data?.CheckID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.CheckID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Emisión:</strong> {new Date(data.IssueDate).toLocaleDateString()}
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
                  <legend className="font-semibold mb-4 text-md">Información del cheque</legend>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="Number"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Número de Cheque*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Número del cheque"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="Amount"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Monto*</FormLabel>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="IssueDate"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Fecha de Emisión*</FormLabel>
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
                          name="DueDate"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Fecha de Vencimiento</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="date"
                                  value={field.value || ""}
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
                        name="BankID"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Banco</FormLabel>
                            <Select
                              onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                              value={field.value?.toString() || ""}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar banco" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">Sin banco</SelectItem>
                                {banks.map((bank) => (
                                  <SelectItem key={bank.BankID} value={bank.BankID.toString()}>
                                    {bank.Name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormBlock>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="DrawerName"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Librador</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value || ""}
                                  placeholder="Nombre del librador"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="HolderName"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Tenedor</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value || ""}
                                  placeholder="Nombre del tenedor"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>
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

export default CheckForm;

