import { useEffect } from "react";
import { Label } from "~/components/ui/label";
import { useGetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { getNameField, getQueryName } from "./utils";

function FilterFields({ model = "saleconditions" }: { model: string }) {
  // 1. Obtener los datos para crear los inputs de cada filtro
  const { data, loading, error } = useGetFilterFieldsQuery({ variables: { model } });
  const filterFields = data?.filterFields || [];

  // 2. Cargar opciones para campos de tipo select
  const selectFields = filterFields.filter((f) => f.type === "select");

  console.log({ filterFields, loading, error, selectFields });

  // field.field = "CreditCardID"

  // 2. Cargar opciones para campos de tipo select
  useEffect(() => {
    async function loadOptions() {
      const newOptions: Record<string, []> = {};

      for (const field of selectFields) {
        if (field.relationModel) {
          try {
            // Para modelos dependientes, no cargar inicialmente
            if (field.dependsOn) {
              newOptions[field.field] = [];
            } else {
              const queryName = getQueryName(field.relationModel);
              const nameField = getNameField(field.relationModel as any);

              // Construir la query dinámicamente basada en el modelo
              let query;
              if (field.relationModel === "Client") {
                query = `{ ${queryName} { ${field.relationModel}ID FirstName LastName } }`;
              } else {
                query = `{ ${queryName} { ${field.relationModel}ID ${nameField} } }`;
              }

              console.log("---------------query--------", query)

              // const res = await graphqlClient.query(query);
              // newOptions[field.field] = res[queryName] || [];
              newOptions[field.field] = [];
            }
          } catch (err) {
            console.error(`Error cargando opciones para ${field.field}:`, err);
            newOptions[field.field] = [];
          }
        }
      }
      console.log("ACA EN TEORIA EL SET OPTIONS");
      // setOptions(newOptions);
    }

    if (selectFields.length > 0) {
      loadOptions();
    }
  }, [selectFields]);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2"></div>
          <span className="ml-2 ">Cargando filtros...</span>
        </div>
      ) : filterFields.length === 0 ? (
        <div className="text-center py-8 ">
          No hay filtros disponibles para este modelo
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterFields.map((field) => (
            <div key={`${field.field}`} className="space-y-1">
              <Label>
                {field.label}
                {field.dependsOn && (
                  <span className="text-xs  ml-1">
                    (depende de{" "}
                    {
                      filterFields.find((f) => f.field === field.dependsOn)
                        ?.label
                    }
                    )
                  </span>
                )}
              </Label>
              {/* <RenderInput
                field={field}
                operator={`${field.field}_op}` || "contains"}
                onChange={(e) => handleOperatorChange(field.field, e.target.value)}
              /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}