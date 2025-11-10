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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { BASE_ROUTE, useBankForm } from "../../features/bank/useBankForm";

export function BankForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useBankForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Bancos</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Banco" : "Nuevo Banco"}
          </h2>
          {data?.BankID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.BankID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Creado:</strong> {new Date().toLocaleDateString()}
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
                  <legend className="font-semibold mb-4 text-md">Información del banco</legend>

                  <div className="space-y-4">
                    <FormBlock>
                      <FormField
                        name="Name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Nombre*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Nombre del banco"
                                error={form.formState.errors.Name?.message}
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
                                Banco activo
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

