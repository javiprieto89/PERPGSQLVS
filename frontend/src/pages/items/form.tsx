import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router";
import { Checkbox } from "~/components/form/Checkbox";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { SelectWithSearch } from "~/components/form/SelectWithSearch";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { BASE_ROUTE, useItemForm } from "~/features/item/useItemForm";
import { useGetItemsFormDataQuery } from "~/graphql/_generated/graphql";

export function ItemForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { originalData, form, handleSubmit, isEditing, isLoading, isSaving, errors } = useItemForm({ id });
  const { data, loading: formDataLoading } = useGetItemsFormDataQuery();
  const brands = data?.brands || [];
  const categories = data?.categories || [];
  const subcategories = data?.subcategories || [];
  const suppliers = data?.suppliers || [];

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Items</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Item" : "Nuevo Item"}
        </h2>
        {isLoading ? <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} /> : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
              <FormBlock>
                <Input
                  label="Código"
                  {...form.register("ItemCode")}
                  type="text"
                  error={form.formState.errors.ItemCode?.message}
                  required
                />
              </FormBlock>
              <FormBlock>
                <Input
                  {...form.register("ItemDescription")}
                  label="Descripción"
                  error={form.formState.errors.ItemDescription?.message}
                />
              </FormBlock>
              <FormBlock>
                <SelectWithSearch
                  label="Marca"
                  {...form.register("BrandID")}
                  placeholder="Seleccione..."
                  defaultValue={String(originalData?.BrandID)}
                  onSelect={(value) => {
                    form.setValue("BrandID", Number(value));
                    form.clearErrors("BrandID");
                  }}
                  accessor="BrandID"
                  display="BrandName"
                  data={brands}
                  loading={formDataLoading}
                  error={form.formState.errors.BrandID?.message}
                />
              </FormBlock>
              <FormBlock>
                <SelectWithSearch
                  label="Categoría"
                  {...form.register("ItemCategoryID")}
                  placeholder="Seleccione..."
                  defaultValue={String(originalData?.ItemCategoryID)}
                  onSelect={(value) => {
                    form.setValue("ItemCategoryID", Number(value));
                    form.clearErrors("ItemCategoryID");
                  }}
                  accessor="ItemCategoryID"
                  display="CategoryName"
                  data={categories}
                  loading={formDataLoading}
                  error={form.formState.errors.ItemCategoryID?.message}
                />
              </FormBlock>
              <FormBlock>
                <SelectWithSearch
                  label="Subcategoría"
                  {...form.register("ItemSubcategoryID")}
                  placeholder="Seleccione..."
                  defaultValue={String(originalData?.ItemSubcategoryID)}
                  onSelect={(value) => {
                    form.setValue("ItemSubcategoryID", Number(value));
                    form.clearErrors("ItemSubcategoryID");
                  }}
                  accessor="ItemSubcategoryID"
                  display="SubcategoryName"
                  data={subcategories}
                  loading={formDataLoading}
                  error={form.formState.errors.ItemSubcategoryID?.message}
                />
              </FormBlock>
              <FormBlock>
                <label className="block text-sm font-medium mb-1">Proveedor</label>
                <SelectWithSearch
                  {...form.register("SupplierID")}
                  onSelect={(value) => {
                    form.setValue("SupplierID", Number(value));
                    form.clearErrors("SupplierID");
                  }}
                  defaultValue={String(originalData?.SupplierID)}
                  accessor="SupplierID"
                  display="FirstName"
                  // {s.FirstName} {s.LastName}
                  data={suppliers}
                  error={form.formState.errors.SupplierID?.message}
                  required
                />
              </FormBlock>
              <FormBlock>
                <Checkbox
                  label="Controlar stock"
                  {...form.register('ControlStock')}
                  error={form.formState.errors.ControlStock?.message}
                />
              </FormBlock>
              <FormBlock>
                <label className="block text-sm font-medium mb-1">
                  Stock de reposición
                </label>
                <Input
                  {...form.register('ReplenishmentStock')}
                  type="number"
                  inputMode="numeric"
                  error={form.formState.errors.ReplenishmentStock?.message}
                />
              </FormBlock>
              <FormBlock>
                <Checkbox
                  label="Activo"
                  {...form.register('IsActive')}
                  error={form.formState.errors.IsActive?.message}
                />
              </FormBlock>
              <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                <Link className="mt-auto" to={BASE_ROUTE}>Cancel</Link>
                <Submit type="submit" disabled={isLoading || isSaving} isSubmitting={isSaving}>
                  Guardar
                </Submit>
              </FormBlock>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};