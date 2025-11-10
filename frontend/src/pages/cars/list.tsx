import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { CarDetails } from "~/features/car/CarDetails";
import { useGetAllCarsQuery, type CarsInDb } from "~/graphql/_generated/graphql";
import { carOperations } from "~/services/car.service";

type DataInDB = CarsInDb;

export default function Cars() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, error, loading, refetch } = useGetAllCarsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allCars || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.CarID}`),
    [navigate]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("¿Borrar registro?")) return;
      try {
        await carOperations.deleteCar(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-cars") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (allData.length > 0 && dataState.length === 0) {
      setDataState(allData as DataInDB[]);
    }
  }, [allData, dataState.length]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CarID",
        className: "first w-3",
      },
      {
        header: "Patente",
        id: "patente",
        accessorKey: "LicensePlate",
      },
      {
        header: "Marca",
        id: "marca",
        accessorKey: "CarBrandData.CarBrandName",
      },
      {
        header: "Modelo",
        id: "modelo",
        accessorKey: "CarModelData.CarModelName",
      },
      {
        header: "Año",
        id: "año",
        accessorKey: "Year",
      },
      {
        header: "Cliente",
        id: "cliente",
        accessorKey: "ClientData.FirstName",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "CarID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original.CarID)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Vehículos" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {allData.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <CreateButton title="Nuevo" onClick={handleCreate} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="cars"
              data={allData || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {dataState.length > 0 && (
          <DataTable
            id="cars"
            columns={columns}
            data={dataState}
            highlightValue={highlight}
            highlightKey="CarID"
            getRowCanExpand={() => true}
            renderSubComponent={({ row }) => <CarDetails car={row.original} />}
          />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
