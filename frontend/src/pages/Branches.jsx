// frontend/src/pages/Branches.jsx
import {
  EllipsisVertical,
  Pencil,
  Plus,
  RefreshCcw,
  Trash,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTable } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useGetAllBranchesQuery } from "~/graphql/_generated/graphql";
import { branchOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import BranchCreate from "./BranchCreate";

export default function Branches() {
  const { data, error, loading, refetch } = useGetAllBranchesQuery();
  const [branches, setBranches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <BranchCreate
          onSave={() => {
            popup.opener.postMessage("reload-branches", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Sucursal"
    );
  };

  const handleFilterChange = (filtered) => setBranches(filtered);

  const handleEdit = useCallback((br) => {
    openReactWindow(
      (popup) => (
        <BranchCreate
          branch={br}
          onSave={() => {
            popup.opener.postMessage("reload-branches", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Sucursal"
    );
  }, []);

  const handleDelete = useCallback(
    async (id, companyID) => {
      if (!confirm("¿Borrar sucursal?")) return;
      try {
        await branchOperations.deleteBranch(companyID, id);
        refetch();
      } catch (err) {
        alert("Error al borrar sucursal: " + err.message);
      }
    },
    [refetch]
  );

  const handleRefetch = async () => {
    await refetch();
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-branches") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setBranches(data.allBranches);
    }
  }, [data, setBranches]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "BranchID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "Name",
      },
      {
        header: "Empresa ID",
        accessorKey: "CompanyID",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyData.Name",
      },
      {
        header: "Teléfono",
        accessorKey: "Phone",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ItemCategoryID",
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => handleEdit(row)}
                className="hidden md:inline px-3 py-2 text-sm rounded"
              >
                <Pencil />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(row.BranchID, row.CompanyID)}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [handleDelete, handleEdit]
  );

  console.log("branches", branches);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Sucursales</h1>
        <div className="flex space-x-2">
          {data && data.allBranches.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allBranches}
                onSearch={(rows) => setBranches(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <Button onClick={handleRefetch}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus />
            Nueva Sucursal
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="branches"
            data={data ? data.allBranches : []} // ← lista original sin filtrar
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <AdminTable
          getRowCanExpand={() => true}
          renderSubComponent={({ row }) => (
            <ClientDetails client={row.original} />
          )}
          columns={columns}
          data={branches || []}
        />
      )}
    </div>
  );
}
