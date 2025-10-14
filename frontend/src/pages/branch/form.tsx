import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { BASE_ROUTE, useBranchForm } from "~/features/branch/useBranchForm";
import { CompanyCombo } from "~/features/company/CompanyCombo";

export function BranchForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, isEditing, isLoading, isSaving, errors } = useBranchForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>branches</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Sucursal" : "Nueva Sucursal"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} loadingSkeleton={<FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />} />
            <FormBlock>
              <Label className="block text-sm font-medium mb-1">Compañía</Label>
              <CompanyCombo {...form.register('CompanyID')}
                onSelect={(value) => {
                  form.setValue("CompanyID", value, { shouldTouch: true, shouldDirty: true });
                  form.clearErrors("CompanyID");
                }}
              />
            </FormBlock>
            <FormBlock className='w-full'>
              <Input
                {...form.register("BranchName")}
                label="Nombre"
                type="text"
                required
              />
            </FormBlock>
            <FormBlock>
              <Input {...form.register("Address")}
                label="Dirección"
                type="text"
              />
            </FormBlock>
            <FormBlock>
              <Input
                {...form.register("Phone")}
                label="Teléfono"
                type="text"
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
      </div>
    </>
  );
}
