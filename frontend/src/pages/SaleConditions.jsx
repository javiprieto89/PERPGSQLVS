import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Badge } from "~/components/ui/badge";
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
  // TODO: Sale conditions debería traer en 1 sola query AllConditions + Cards + Groups asociados
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
    // TODO: cardData needs to come with useGetAllSaleConditionsQuery
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
        header: "Tarjeta",
        accessorKey: "CreditCardID",
        cell: ({ getValue }) => {
          const card = cards.find((c) => c.CreditCardID === getValue());
          const group = card
            ? groups.find((g) => g.CreditCardGroupID === card.CreditCardGroupID)
            : null;
          return (
            <>
              {card ? card.CardName : getValue()}{" "}
              {group?.GroupName && (
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  {group?.GroupName}
                </Badge>
              )}
            </>
          );
        },
      },
      {
        header: "Vencimiento",
        accessorKey: "DueDate",
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
        accessorKey: "SaleConditionID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            row={row}
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
      <div className="flex items-center justify-between">
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
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
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
      <DataTable columns={columns} data={saleConditions} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
