// frontend/src/pages/CompanyData.tsx - Company List Page
import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { useGetAllCompaniesQuery, type CompanyInDb } from "~/graphql/_generated/graphql";
import { companyOperations } from "~/services/company.service";

//  {company: Record<String, string>; onEdit: () => void; onDelete: () => void}
function CompanyDetail({ company, onEdit, onDelete }: { company: CompanyInDb; onEdit: () => void; onDelete: () => void }) {
  return (
    <div key={company.CompanyID} className=" rounded shadow p-4">
      {company.Logo && (
        <img
          src={`data:image/*;base64,${company.Logo}`}
          alt="Logo"
          className="h-16 mb-2 object-contain"
        />
      )}
      <h3 className="text-lg font-semibold mb-1">{company.CompanyName}</h3>
      <p className="text-sm mb-1">{company.Address}</p>
      {company.CUIT && <p className="text-sm mb-1">CUIT: {company.CUIT}</p>}
      {company.Grossincome && (
        <p className="text-sm mb-1">Ingresos brutos: {company.Grossincome}</p>
      )}
      {company.Startdate && (
        <p className="text-sm mb-1">Inicio: {company.Startdate.slice(0, 10)}</p>
      )}
      <div className="flex space-x-2 mt-2">
        <Button onClick={onEdit} className="px-3 py-1  text-sm rounded hover:">
          Editar
        </Button>
        <Button onClick={onDelete} variant="destructive">
          Eliminar
        </Button>
      </div>
    </div>
  );
}

type DataInDB = CompanyInDb

export function CompanyList() {
  const navigate = useNavigate();
  const { data, error, loading, refetch } = useGetAllCompaniesQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    navigate("/companies/form");
  };

  const handleFilterChange = (filtered: any) => setCompanies(filtered);

  const handleEdit = useCallback(
    (company: any) => {
      navigate(`/companies/form/${company.CompanyID}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      if (!confirm("¿Borrar empresa?")) return;
      try {
        await companyOperations.deleteCompany(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar empresa: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allCompany) {
      setCompanies(data.allCompany);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CompanyID",
        className: "first w-3",
      },
      {
        header: "Logo",
        accessorKey: "Logo",
        cell: ({ getValue }) => (
          <img
            src={`data:image/*;base64,${getValue()}`}
            alt="Logo"
            className="h-10 w-10 mb-2 object-cover"
          />
        ),
      },
      {
        header: "Empresa",
        id: "Empresa",
        accessorKey: "CompanyName",
      },
      {
        header: "CUIT",
        accessorKey: "CUIT",
      },
      {
        header: "Inicio",
        accessorKey: "Startdate",
        cell: ({ getValue }) => (getValue<string>() || "").slice(0, 10),
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "CompanyID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(getValue<string>())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Empresas" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allCompany.length > 0 && (
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
          <TableFilters
            modelName="companydata"
            data={data?.allCompany || []}
            onFilterChange={handleFilterChange}
          />
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {companies.length > 0 && (
          <DataTable
            id="companies"
            getRowCanExpand={() => true}
            columns={columns}
            data={companies}
            renderSubComponent={({ row }) => (
              <CompanyDetail
                company={row.original}
                onEdit={() => handleEdit(row.original)}
                onDelete={() => handleDelete(row.original.CompanyID)}
              />
            )}
          />
        )}
        {loading && companies.length === 0 && <AdminTableLoading />}
      </div>
    </section>
  );
}
