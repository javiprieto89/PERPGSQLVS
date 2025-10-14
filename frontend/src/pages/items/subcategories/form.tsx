import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { ItemCategoryCombo } from "~/features/itemCategory/ItemCategoryCombo";
import { BASE_ROUTE, useItemSubCategoryForm } from "~/features/itemSubCategory/useItemSubCategoryForm";

export default function ItemSubcategoryCreate() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { originalData, form, handleSubmit, isEditing, isLoading, isSaving, errors } = useItemSubCategoryForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Categorías</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Subcategoría" : "Nueva Subcategoría"}
        </h2>
        {isLoading ? <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} /> : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
              <FormBlock>
                <ItemCategoryCombo
                  {...form.register('ItemCategoryID')}
                  onSelect={(value) => {
                    form.setValue("ItemCategoryID", Number(value), { shouldTouch: true, shouldDirty: true });
                    form.clearErrors("ItemCategoryID");
                  }}
                />
              </FormBlock>
              <FormBlock>
                <Input
                  {...form.register("SubcategoryName")}
                  label="Nombre de la subcategoría"
                  error={form.formState.errors.SubcategoryName?.message}
                  required
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
}
