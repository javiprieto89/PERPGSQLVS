import { useMutation } from "@apollo/client";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form } from "~/components/ui/form";
import { CompanyCombo } from "~/features/company/CompanyCombo";
import type { CarBrandsCreate } from "~/graphql/_generated/graphql";
import {
  CreateCarBrandDocument,
  GetAllCarBrandsDocument,
  GetCarBrandByIdDocument,
  UpdateCarBrandDocument,
  useGetAllCarBrandsQuery,
  useGetCarBrandByIdQuery,
} from "~/graphql/_generated/graphql";
import { AuthHelper } from "~/utils/authHelper";

const BASE_ROUTE = "/carbrands";

const formSchema = z.object({
  CarBrandID: z.number().optional(),
  Name: z.string().min(1, "Nombre es requerido"),
  CompanyID: z.number().nullable().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function CarBrandForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = Boolean(id);

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetCarBrandByIdQuery({
    variables: { id: id!, companyId: AuthHelper.getSelectedAccess()?.CompanyID as number },
    skip: !id || !AuthHelper.getSelectedAccess()?.CompanyID,
    fetchPolicy: "no-cache",
  });

  const { data: allBrandsQuery } = useGetAllCarBrandsQuery({
    fetchPolicy: "cache-and-network",
  });

  const brands = allBrandsQuery?.allCarbrands || [];

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      Name: "",
      CompanyID: null,
    },
  });

  // Apollo mutation for creating car brand
  const [createCarBrand, { error: createError, loading: createLoading }] = useMutation(
    CreateCarBrandDocument,
    {
      refetchQueries: [{ query: GetAllCarBrandsDocument }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        toast.success("Marca de auto creada correctamente");
        navigate(BASE_ROUTE);
      },
      onError: (error) => {
        console.error("Error creating car brand:", error);
        toast.error("Error al crear marca de auto");
      },
    }
  );

  // Apollo mutation for updating car brand
  const [updateCarBrand, { error: updateError, loading: updateLoading }] = useMutation(
    UpdateCarBrandDocument,
    {
      refetchQueries: [
        { query: GetAllCarBrandsDocument },
        { query: GetCarBrandByIdDocument, variables: { id: id!, companyId: AuthHelper.getSelectedAccess()?.CompanyID as number } },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        toast.success("Marca de auto actualizada correctamente");
        navigate(BASE_ROUTE, { state: { highlight: id } });
      },
      onError: (error) => {
        console.error("Error updating car brand:", error);
        toast.error("Error al actualizar marca de auto");
      },
    }
  );

  // Prepare errors object for FormState
  const errors = {
    query: queryError,
    update: updateError,
    create: createError,
  };

  useEffect(() => {
    if (id && brands) {
      const carBrand = brands.find(cb => cb.CarBrandID === id);
      if (carBrand) {
        form.reset({
          CarBrandID: carBrand.CarBrandID,
          Name: carBrand.CarBrandName,
          CompanyID: carBrand.CompanyID || null,
        });
      }
    }
  }, [id, brands, form]);

  async function handleSubmit(formData: FormSchema) {
    const payload: CarBrandsCreate = {
      CarBrandName: formData.Name,
      CompanyID: formData.CompanyID ?? AuthHelper.getSelectedAccess()?.CompanyID as number,
    };

    if (isEditing && id) {
      await updateCarBrand({
        variables: {
          carBrandID: Number(id),
          input: payload,
          companyId: AuthHelper.getSelectedAccess()?.CompanyID as number,
        },
      });
    } else {
      await createCarBrand({
        variables: {
          carBrand: payload,
        },
      });
    }
  }

  const isLoading = queryLoading || createLoading || updateLoading;

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Marcas de Auto</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Marca de Auto" : "Nueva Marca de Auto"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} loadingSkeleton={<FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />} />
            {!isLoading && (
              <>
                <FormBlock>
                  <CompanyCombo
                    {...form.register("CompanyID")}
                    defaultValue={String(form.getValues("CompanyID") || 0)}
                    onSelect={(value) => {
                      form.setValue("CompanyID", value ? Number(value) : null, { shouldTouch: true, shouldDirty: true });
                      form.clearErrors("CompanyID");
                    }}
                  />
                </FormBlock>

                <FormBlock>
                  <Input
                    {...form.register("Name")}
                    label="Nombre*"
                    type="text"
                    placeholder="Nombre de la marca"
                    error={form.formState.errors.Name?.message}
                    required
                  />
                </FormBlock>

                <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                  <Link className="mt-auto" to={BASE_ROUTE}>Cancelar</Link>
                  <Submit type="submit" disabled={isLoading} isSubmitting={isLoading}>
                    Guardar
                  </Submit>
                </FormBlock>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
