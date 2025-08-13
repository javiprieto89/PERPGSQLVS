import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { TableActionButton } from "~/components/TableActionButtons";
import { AdminTable, AdminTableLoading } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import { useGetAllSaleConditionsQuery } from "~/graphql/_generated/graphql";
import {
  creditCardGroupOperations,
  creditCardOperations,
  saleConditionOperations,
} from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import SaleConditionCreate from "./SaleConditionCreate";

export default function SaleConditions() {
  const { data, error, loading, refetch } = useGetAllSaleConditionsQuery();
  const [saleConditions, setSaleConditions] = useState([]);
  const [cards, setCards] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-saleconditions") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setSaleConditions(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <SaleConditionCreate
          cards={cards}
          groups={groups}
          onSave={() => {
            popup.opener.postMessage("reload-saleconditions", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva Condición"
    );
  }, [refetch, cards, groups]);

  const handleEdit = useCallback(
    (sc) => {
      openReactWindow(
        (popup) => (
          <SaleConditionCreate
            saleCondition={sc}
            cards={cards}
            groups={groups}
            onSave={() => {
              popup.opener.postMessage("reload-saleconditions", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Condición"
      );
    },
    [refetch, cards, groups]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar condición?")) return;
      try {
        await saleConditionOperations.deleteSaleCondition(id);
        refetch();
      } catch (err) {
        alert("Error al borrar condición: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    // TODO: remove this and improve useGetAllSaleConditionsQuery
    async function load() {
      const [cardData, groupData] = await Promise.all([
        creditCardOperations.getAllCards(),
        creditCardGroupOperations.getAllGroups(),
      ]);
      setSaleConditions(data.allSaleconditions);
      setCards(cardData);
      setGroups(groupData);
    }

    if (data?.allSaleconditions) {
      setSaleConditions(data.allSaleconditions);
      load();
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "SaleConditionID",
        className: "first w-3",
      },
      {
        header: "Condición",
        accessorKey: "Name",
      },
      {
        header: "Vencimiento",
        accessorKey: "DueDate",
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => {
          return (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                props.getValue("IsActive")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-destructive"
              }`}
            >
              {props.getValue("IsActive") ? "Activo" : "Inactivo"}
            </span>
          );
        },
      },
      {
        header: "",
        id: "actions",
        accessorKey: "SaleConditionID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Condiciones de Venta
        </h1>
        <div className="flex space-x-2">
          {data && data.allSaleconditions.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allSaleconditions}
                onSearch={(rows) => setSaleConditions(rows)}
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
            modelName="saleconditions"
            data={data.allSaleconditions}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saleConditions.map((sc) => {
            const card = cards.find((c) => c.CreditCardID === sc.CreditCardID);
            const group = card
              ? groups.find(
                  (g) => g.CreditCardGroupID === card.CreditCardGroupID
                )
              : null;
            return (
              <div key={sc.SaleConditionID} className=" rounded shadow p-4">
                <h3 className="text-lg font-semibold mb-2">{sc.Name}</h3>
                <p className="text-sm">
                  Tarjeta: {card ? card.CardName : sc.CreditCardID}
                  {group ? ` (${group.GroupName})` : ""}
                </p>
                <p className="text-sm mb-1">Vencimiento: {sc.DueDate}</p>
                <p className="text-sm mb-2">
                  Activo: {sc.IsActive ? "Sí" : "No"}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(sc)}
                    className="mt-2 px-3 py-1  text-sm rounded hover:"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(sc.SaleConditionID)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <AdminTable columns={columns} data={saleConditions} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
