import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetAllCreditCardsQuery } from "~/graphql/_generated/graphql";
import { creditCardOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CreditCardCreate from "./CreditCardCreate";

export default function CreditCards() {
  const { data, error, loading, refetch } = useGetAllCreditCardsQuery();
  const [cards, setCards] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered) => {
    setCards(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <CreditCardCreate
          onSave={() => {
            popup.opener.postMessage("reload-creditcards", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva Tarjeta"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (card) => {
      openReactWindow(
        (popup) => (
          <CreditCardCreate
            card={card}
            onSave={() => {
              popup.opener.postMessage("reload-creditcards", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Tarjeta"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar tarjeta?")) return;
      try {
        await creditCardOperations.deleteCard(id);
        refetch();
      } catch (err) {
        alert("Error al borrar tarjeta: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-creditcards") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allCreditcards) {
      setCards(data.allCreditcards);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CreditCardID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "CardName",
      },
      {
        header: "Grupo",
        accessorKey: "GroupName",
      },
      {
        header: "Recargo",
        accessorKey: "Surcharge",
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        accessorKey: "CreditCardID",
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
          Tarjetas de Crédito
        </h1>
        <div className="flex space-x-2">
          {data && data.allCreditcards.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allCreditcards}
                onSearch={(rows) => setCards(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} /> Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="creditcards"
            data={data.allCreditcards}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {cards.length > 0 && <AdminTable columns={columns} data={cards} />}
      {loading && <AdminTableLoading />}
    </div>
  );
}
