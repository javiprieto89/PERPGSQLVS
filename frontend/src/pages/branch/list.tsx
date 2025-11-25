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
import { useGetBranchesByCompanyQuery, type BranchesInDb } from "~/graphql/_generated/graphql";
import { branchOperations } from "~/services/branch.service";
import { AuthStorage } from "~/utils/auth.storage";

type DataInDB = BranchesInDb;

export default function Branches() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  // const { data, error, loading, refetch } = useGetAllBranchesQuery({
  //   notifyOnNetworkStatusChange: true,
  // });
  const { data, error, loading, refetch } = useGetBranchesByCompanyQuery({
    variables: {
      companyID: Number(AuthStorage.getSelectedAccess()?.CompanyID)
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.branchesByCompany || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), []);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.BranchID}`),
    []
  );

  const handleDelete = useCallback(
    async (id: number, CompanyID?: number) => {
      if (!CompanyID || !id) return
      if (!confirm("¿Borrar sucursal?")) return;
      try {
        await branchOperations.deleteBranch(CompanyID, id);
        refetch();
      } catch (err) {
        alert("Error al borrar sucursal: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-branches") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (allData.length > 0 && dataState.length === 0) {
      setDataState(allData);
    }
  }, [allData]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "BranchID",
        className: "first w-3",
      },
      {
        header: "Sucursal",
        accessorKey: "BranchName",
      },
      {
        header: "Empresa ID",
        accessorKey: "CompanyID",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyData.CompanyName",
      },
      {
        header: "Teléfono",
        accessorKey: "Phone",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ItemCategoryID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original.BranchID, row.original?.CompanyData?.CompanyID)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Sucursales" quickAccessHidden>
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
          <CreateButton title="Nueva Sucursal" onClick={handleCreate} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="branches"
              data={allData || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable
            id="branches"
            columns={columns}
            data={dataState || []}
            highlightValue={highlight}
            highlightKey="BranchID"
          />
        )}
      </div>
    </section>
  );
}
