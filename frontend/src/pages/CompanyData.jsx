// frontend/src/pages/CompanyData.jsx
import { Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetAllCompaniesQuery } from "~/graphql/_generated/graphql";
import { companyOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CompanyCreate from "./CompanyCreate";

//  {company: Record<String, string>; onEdit: () => void; onDelete: () => void}
function CompanyDetail({ company, onEdit, onDelete }) {
  return (
    <div key={company.CompanyID} className=" rounded shadow p-4">
      {company.Logo && (
        <img
          src={`data:image/*;base64,${company.Logo}`}
          alt="Logo"
          className="h-16 mb-2 object-contain"
        />
      )}
      <h3 className="text-lg font-semibold mb-1">{company.Name}</h3>
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

export default function CompanyData() {
  const { data, error, loading, refetch } = useGetAllCompaniesQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [companies, setCompanies] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-companies") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <CompanyCreate
          onSave={() => {
            popup.opener.postMessage("reload-companies", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Empresa"
    );
  };

  const handleFilterChange = (filtered) => setCompanies(filtered);

  const handleEdit = useCallback(
    (c) => {
      openReactWindow(
        (popup) => (
          <CompanyCreate
            company={c}
            onSave={() => {
              popup.opener.postMessage("reload-companies", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Empresa"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar empresa?")) return;
      try {
        await companyOperations.deleteCompany(id);
        refetch();
      } catch (err) {
        alert("Error al borrar empresa: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allCompanydata) {
      setCompanies(data.allCompanydata);
    }
  }, [data]);

  const columns = useMemo(
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
            className="h-16 mb-2 object-contain"
          />
        ),
      },
      {
        header: "Empresa",
        accessorKey: "Name",
      },
      {
        header: "CUIT",
        accessorKey: "CUIT",
      },
      {
        header: "Inicio",
        accessorKey: "Startdate",
        cell: ({ getValue }) => getValue().slice(0, 10),
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        accessorKey: "CompanyID",
        cell: ({ row, getValue }) => (
          <div className="flex gap-2">
            {row.getCanExpand() && (
              <Button
                variant={row.getIsExpanded() ? "primary" : "outline"}
                onClick={row.getToggleExpandedHandler()}
              >
                <Eye />
              </Button>
            )}
            <TableActionButton
              onDelete={() => handleDelete(getValue())}
              onEdit={() => handleEdit(row.original)}
            />
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Empresas</h1>
        <div className="flex space-x-2">
          {data && data.allCompanydata.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allCompanydata}
                onSearch={(rows) => setCompanies(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <TableFilters
          modelName="companydata"
          data={data.allCompanydata || []}
          onFilterChange={handleFilterChange}
        />
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {companies.length > 0 && (
        <AdminTable
          getRowCanExpand={() => true}
          columns={columns}
          data={companies}
          renderSubComponent={({ row }) => (
            <CompanyDetail
              company={row.original}
              onEdit={() => handleEdit(row.original)}
              onDelete={() => handleDelete(row.CompanyID)}
            />
          )}
        />
      )}
      {loading && companies.length === 0 && <AdminTableLoading />}
    </div>
  );
}
