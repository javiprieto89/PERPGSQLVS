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
import { Checkbox } from "~/components/ui/checkbox";
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
import { BASE_ROUTE, useBankAccountForm } from "~/features/bank-account/useBankAccountForm";

export function BankAccountForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, banks, isEditing, isLoading, isSaving, errors } = useBankAccountForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Cuentas Bancarias</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Cuenta Bancaria" : "Nueva Cuenta Bancaria"}
          </h2>
          {data?.BankAccountID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.BankAccountID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Cuenta:</strong> {data.AccountNumber}
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
                  <legend className="font-semibold mb-4 text-md">Información de la cuenta bancaria</legend>

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
                          name="BankID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Banco*</FormLabel>
                              <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value?.toString() || ""}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar banco" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="AccountNumber"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Número de Cuenta*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Número de cuenta bancaria"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="CurrencyID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Moneda*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de moneda"
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

                    <FormBlock>
                      <FormField
                        name="Alias"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Alias</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="Alias o nombre descriptivo"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormBlock>

                    <FormBlock>
                      <FormField
                        name="IsActive"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Cuenta Activa
                              </FormLabel>
                            </div>
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

export default BankAccountForm;

