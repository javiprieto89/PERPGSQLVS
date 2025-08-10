import { LoaderCircle, Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTableLoading } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { useGetAllBrandsQuery } from "~/graphql/_generated/graphql";
import { brandOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import BrandCreate from "./BrandCreate";

export default function Brands() {
  const { data, error, loading, refetch } = useGetAllBrandsQuery();
  const [brands, setBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <BrandCreate
          onSave={() => {
            popup.opener.postMessage("reload-brands", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Marca"
    );
  };

  const handleFilterChange = (filtered) => {
    setBrands(filtered);
  };

  const handleEdit = useCallback(
    (brand) => {
      openReactWindow(
        (popup) => (
          <BrandCreate
            brand={brand}
            onSave={() => {
              popup.opener.postMessage("reload-brands", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Marca"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar marca?")) return;
      try {
        await brandOperations.deleteBrand(id);
        refetch();
      } catch (err) {
        alert("Error al borrar marca: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-brands") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allBrands) {
      setBrands(data.allBrands);
    }
  }, [data]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Marcas</h1>
        <div className="flex space-x-2">
          {data && data.allItemsubcategories.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allBrands}
                onSearch={(rows) => setBrands(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <Button onClick={() => refetch()}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="brands"
            data={data?.allBrands || []}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && (
        <Alert className="my-4">
          <LoaderCircle className="animate-spin" />
          <AlertDescription>Cargando...</AlertDescription>
        </Alert>
      )}
      {loading && <AdminTableLoading />}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((br) => (
            <div key={br.BrandID} className=" rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{br.Name}</h3>
              <p className="text-sm mb-2">
                Activo: {br.IsActive ? "Sí" : "No"}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(br)}
                  className="mt-2 px-3 py-1  text-sm rounded hover:"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(br.BrandID)}
                  className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
