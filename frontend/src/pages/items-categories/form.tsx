import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { BASE_ROUTE, useItemCategoryForm } from "~/features/itemCategory/useItemCategoryForm";

export function ItemCategoryForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { originalData, form, handleSubmit, isEditing, isLoading, isSaving, errors } = useItemCategoryForm({ id });

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
          {isEditing ? "Editar Categoría" : "Nueva Categoría"}
        </h2>
        {isLoading ? <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} /> : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
              <FormBlock>
                <Input
                  label="Nombre de la categoría"
                  {...form.register("CategoryName")}
                  type="text"
                  error={form.formState.errors.CategoryName?.message}
                  placeholder="Ingrese el nombre de la categoría"
                  required
                />
              </FormBlock>
              <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                <Link className="mt-auto" to={BASE_ROUTE}>Cancelar</Link>
                <Submit type="submit" disabled={isLoading || isSaving} isSubmitting={isSaving}>
                  {isEditing ? "Actualizar" : "Crear"}
                </Submit>
              </FormBlock>
            </form>
          </Form>
        )}
      </div>
    </>
  );
}

// Export default for backward compatibility
export default ItemCategoryForm;