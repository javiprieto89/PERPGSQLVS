// Car Model Form - Modernized with React Hook Form + Zod
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// Components
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

// GraphQL
import {
  useCreateCarModelMutation,
  useGetAllCarBrandsQuery,
  useGetAllCarModelsQuery,
  useUpdateCarModelMutation
} from "~/graphql/_generated/graphql";

const BASE_ROUTE = "/carmodels";

// Form Schema
const formSchema = z.object({
  CarBrandID: z.number().min(1, "La marca es requerida"),
  CarModelName: z.string().min(1, "El modelo es requerido"),
});

type FormSchema = z.infer<typeof formSchema>;

export function CarModelForm() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? Number(params.id) : undefined;
  const isEditing = Boolean(id);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CarBrandID: 0,
      CarModelName: "",
    },
  });

  const [loading, setLoading] = useState(false);

  // GraphQL Hooks
  const { data: brandsData } = useGetAllCarBrandsQuery();
  const brands = brandsData?.allCarbrands || [];
  const { refetch } = useGetAllCarModelsQuery();
  const [createCarModel] = useCreateCarModelMutation();
  const [updateCarModel] = useUpdateCarModelMutation();

  // TODO: Load model data for editing mode
  useEffect(() => {
    if (isEditing && id) {
      // Since GraphQL schema requires additional params, handle differently
      console.log("Editing mode for model ID:", id);
    }
  }, [id, isEditing]);

  const handleSubmit = async (formData: FormSchema) => {
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateCarModel({
          variables: {
            carModelID: id,
            input: {
              CarModelName: formData.CarModelName,
              CarBrandID: formData.CarBrandID,
            },
            carBrandId: formData.CarBrandID,
            companyId: 1, // TODO: Get from auth context
          },
        });
        toast.success("Modelo actualizado correctamente");
      } else {
        await createCarModel({
          variables: {
            input: {
              CarBrandID: formData.CarBrandID,
              CarModelName: formData.CarModelName,
              CompanyID: 1, // TODO: Get from auth context
            },
          },
        });
        toast.success("Modelo creado correctamente");
      }

      await refetch();
      navigate(BASE_ROUTE, { state: { highlight: id } });
    } catch (err) {
      console.error("Error:", err);
      toast.error(isEditing ? "Error al actualizar modelo" : "Error al crear modelo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}
      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Modelos de Auto</Link>
        </FormBreadcrumb>
      </AdminTopBar>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Editar Modelo de Auto" : "Nuevo Modelo de Auto"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormBlock>
              <FormField
                control={form.control}
                name="CarBrandID"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Marca de Auto *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.CarBrandID} value={brand.CarBrandID.toString()}>
                            {brand.CarBrandName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormBlock>

            <FormBlock>
              <Input
                {...form.register("CarModelName")}
                label="Modelo *"
                type="text"
                placeholder="Ingrese el nombre del modelo"
                error={form.formState.errors.CarModelName?.message}
                required
              />
            </FormBlock>

            <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
              <Link className="mt-auto" to={BASE_ROUTE}>Cancelar</Link>
              <Submit type="submit" disabled={loading} isSubmitting={loading}>
                Guardar
              </Submit>
            </FormBlock>
          </form>
        </Form>
      </div>
    </>
  );
}