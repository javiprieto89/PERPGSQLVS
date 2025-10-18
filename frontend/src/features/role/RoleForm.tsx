// frontend/src/features/role/RoleForm.tsx
import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router-dom";

import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { BASE_ROUTE, useRoleForm } from "./useRoleForm";

interface RoleFormProps {
  onSave?: (result: any) => void;
  onCancel?: () => void;
  initialData?: any;
  showTopBar?: boolean;
  title?: string;
}

export function RoleForm({
  onSave = () => { },
  onCancel,
  initialData,
  showTopBar = true,
  title,
}: RoleFormProps) {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useRoleForm({
    id,
    initialData
  });

  const onSubmit = async (formData: any) => {
    try {
      const result = await handleSubmit(formData);
      onSave(result);

      // Si tenemos onCancel, estamos en modal, sino navegamos
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      // Error ya manejado en useRoleForm
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Navegar de vuelta si no estamos en modal
      window.history.back();
    }
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  const formTitle = title || (isEditing ? "Editar Rol" : "Nuevo Rol");

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      {showTopBar && (
        <AdminTopBar>
          <FormBreadcrumb isEditing={isEditing}>
            <Link to={BASE_ROUTE}>Roles</Link>
          </FormBreadcrumb>
        </AdminTopBar>
      )}

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {formTitle}
          </h2>
          {data?.RoleID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span>ID: {data?.RoleID}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Rol</span>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormBlock>
              <Fieldset>
                <FormField
                  control={form.control}
                  name="RoleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nombre del Rol <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el nombre del rol"
                          {...field}
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Fieldset>
            </FormBlock>

            <Fieldset className="items-center">
              <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                <Link className="mt-auto" to={BASE_ROUTE} onClick={handleCancel}>
                  Cancelar
                </Link>
                <Submit type="submit" disabled={isLoading || isSaving} isSubmitting={isSaving}>
                  {isEditing ? "Actualizar Rol" : "Crear Rol"}
                </Submit>
              </FormBlock>
            </Fieldset>
          </form>
        </Form>
      </div>
    </>
  );
}