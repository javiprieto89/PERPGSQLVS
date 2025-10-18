// frontend/src/pages/documents/list.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { Building2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import {
  useGetAllCommercialDocumentsQuery,
  type CommercialDocumentsInDb
} from "~/graphql/_generated/graphql";
import { commercialDocumentOperations } from "~/services/document.service";

type DataInDB = CommercialDocumentsInDb;

export function CommercialDocumentsList() {
  const navigate = useNavigate();

  const { data, error, loading, refetch } = useGetAllCommercialDocumentsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allCommercialdocuments || [];
  const companies = data?.allCompany || [];
  const branches = data?.allBranches || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate("form"), [navigate]);

  const handleEdit = useCallback(
    (document: DataInDB) => {
      navigate(`form/${document.DocumentID}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    async (document: DataInDB) => {
      if (!confirm("¿Borrar documento?")) return;
      try {
        await commercialDocumentOperations.deleteDocument(String(document.DocumentID));
        refetch();
      } catch (err) {
        alert("Error al borrar documento: " + (err as Error).message);
      }
    },
    [refetch]
  );

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
        accessorKey: "DocumentID",
        className: "first w-3",
      },
      {
        header: "Descripción",
        accessorKey: "Description",
        cell: ({ getValue }) => getValue() || "Sin descripción",
      },
      {
        header: "Tipo",
        accessorKey: "DocumentTypeID",
        cell: ({ row }) => {
          // TODO: Agregar query para tipos de documento si es necesario
          return row.original.DocumentTypeID;
        },
      },
      {
        header: "Compañía",
        accessorKey: "CompanyID",
        cell: ({ row }) => {
          const company = companies.find(c => c.CompanyID === row.original.CompanyID);
          return company?.CompanyName || row.original.CompanyID;
        },
      },
      {
        header: "Sucursal",
        accessorKey: "BranchID",
        cell: ({ row }) => {
          const branch = branches.find(b => b.BranchID === row.original.BranchID);
          return branch?.BranchName || row.original.BranchID;
        },
      },
      {
        header: "Número",
        accessorKey: "DocumentNumber",
        cell: ({ getValue }) => getValue() || "-",
      },
      {
        header: "PV",
        accessorKey: "PointOfSale",
        cell: ({ getValue }) => getValue() || "-",
      },
      {
        header: "Acciones",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original)}
            >
              Eliminar
            </Button>
          </div>
        ),
      },
    ],
    [companies, branches, handleEdit, handleDelete]
  );

  const defaultColumnVisibility = {
    id: false,
  };

  return (
    <div className="p-6">
      <AdminTopBar>
        <h1 className="text-xl font-semibold">Documentos Comerciales</h1>
      </AdminTopBar>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ShowFilterButton
            onClick={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />
          <RefreshButton onClick={() => refetch()} />
        </div>
        <CreateButton title="Nuevo Documento" onClick={handleCreate} />
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="documents"
            data={allData}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {/* Error */}
      {error && <ApiErrorMessage error={error} />}

      {loading && <AlertLoading />}

      {/* Estado vacío */}
      {!error && !loading && dataState.length === 0 && (
        <div className="bg-card border rounded-2xl text-center py-12">
          <Building2 size="48" className="m-auto" />
          <h3 className="mt-2 text-sm font-medium">No hay documentos</h3>
          <p className="mt-1 text-sm">Comienza creando tu primer documento comercial.</p>
          <div className="mt-6">
            <Button variant="primary" onClick={handleCreate}>
              <Building2 /> Crear Primer Documento
            </Button>
          </div>
        </div>
      )}

      {loading && <AdminTableLoading />}

      {/* Lista de documentos */}
      {!loading && dataState.length > 0 && (
        <>
          <DataTable
            id="commercial-documents"
            defaultColumnVisibility={defaultColumnVisibility}
            columns={columns}
            data={dataState || []}
          />
        </>
      )}
    </div>
  );
}