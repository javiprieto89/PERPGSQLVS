import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router-dom";

import { ErrorMessage } from "~/components/form/ErrorMessage";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { BASE_ROUTE, usePricelistForm } from "~/features/pricelist/usePricelistForm";
import { useGetPriceListFormDataQuery } from "~/graphql/_generated/graphql";

/**
 * Modern PriceList Form Component
 * 
 * Features:
 * - React Hook Form with Zod validation
 * - Automatic form state management
 * - Loading states and error handling
 * - Responsive layout
 * - Edit and create modes
 * - Toast notifications
 * - Breadcrumb navigation
 */
export function PriceListForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } =
    usePricelistForm({ id });

  const { data: formData, loading: formDataLoading } =
    useGetPriceListFormDataQuery();

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Listas de Precios</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Lista de Precios" : "Nueva Lista de Precios"}
          </h2>
          {data?.PriceListID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span>ID: {data?.PriceListID}</span>
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Estado:</strong> {data.IsActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 md:max-w-[700px] lg:max-w-[800px]"
          >
            <FormState
              errors={[errors.query, errors.update, errors.create]}
              loading={isLoading}
              loadingSkeleton={
                <FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />
              }
            />

            {!isLoading && (
              <>
                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">
                    Información de la Organización
                  </legend>

                  <FormBlock>
                    <Label
                      data-error={!!form.formState.errors.CompanyID?.message}
                      htmlFor="CompanyID"
                    >
                      Compañía*
                    </Label>
                    <Select
                      {...form.register("CompanyID")}
                      onValueChange={(id: string) => {
                        form.setValue("CompanyID", id, {
                          shouldTouch: true,
                          shouldDirty: true,
                        });
                        form.clearErrors("CompanyID");
                      }}
                      defaultValue={String(data?.CompanyID || "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            formDataLoading
                              ? "Cargando..."
                              : formData?.companies?.length === 0
                                ? "Sin opciones"
                                : "Seleccione una compañía..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {formData?.companies?.map((row) => (
                            <SelectItem
                              key={`CompanyID-${row.CompanyID}`}
                              value={String(row.CompanyID)}
                            >
                              {row.CompanyName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      error={form.formState.errors.CompanyID?.message}
                    />
                  </FormBlock>
                </Fieldset>

                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">
                    Información de la Lista de Precios
                  </legend>

                  <FormBlock className="mb-4">
                    <Input
                      {...form.register("PriceListName")}
                      placeholder="Ej: Lista General, Lista Mayorista, etc."
                      label="Nombre de la Lista*"
                      error={form.formState.errors.PriceListName?.message}
                      maxLength={100}
                    />
                    <FormDescription className="mt-2">
                      Nombre descriptivo para identificar la lista de precios
                    </FormDescription>
                  </FormBlock>

                  <FormBlock>
                    <Label htmlFor="PriceListDescription">Descripción</Label>
                    <FormField
                      control={form.control}
                      name="PriceListDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción detallada de la lista de precios (opcional)"
                              className="min-h-[100px]"
                              maxLength={500}
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Información adicional sobre esta lista de precios
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormBlock>
                </Fieldset>

                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">Estado</legend>
                  <FormBlock className="space-y-2">
                    <FormField
                      control={form.control}
                      name="IsActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Lista de precios activa</FormLabel>
                            <FormDescription>
                              Las listas inactivas no estarán disponibles para
                              asignar a clientes
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </FormBlock>
                </Fieldset>

                <Fieldset className="items-center">
                  <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                    <Link className="mt-auto" to={BASE_ROUTE}>
                      Cancelar
                    </Link>
                    <Submit
                      type="submit"
                      disabled={isLoading || isSaving}
                      isSubmitting={isSaving}
                    >
                      {isEditing ? "Actualizar" : "Crear"} Lista de Precios
                    </Submit>
                  </FormBlock>
                </Fieldset>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
