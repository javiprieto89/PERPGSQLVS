import { useEffect, useState } from "react";
import { creditCardOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CreditCardCreate from "./CreditCardCreate";

export default function CreditCards() {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-creditcards") {
        loadCards();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const data = await creditCardOperations.getAllCards();
      setAllCards(data);
      setCards(data);
    } catch (err) {
      setError(err.message);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <CreditCardCreate
          onSave={() => {
            popup.opener.postMessage("reload-creditcards", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Tarjeta"
    );
  };

  const handleFilterChange = (filtered) => {
    setCards(filtered);
  };

  const handleEdit = (card) => {
    openReactWindow(
      (popup) => (
        <CreditCardCreate
          card={card}
          onSave={() => {
            popup.opener.postMessage("reload-creditcards", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Tarjeta"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar tarjeta?")) return;
    try {
      await creditCardOperations.deleteCard(id);
      loadCards();
    } catch (err) {
      alert("Error al borrar tarjeta: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Tarjetas de Crédito
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadCards}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nueva Tarjeta
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="creditcards"
            data={allCards}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.CreditCardID} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-1">{c.CardName}</h3>
              <p className="text-sm">Grupo: {c.GroupName}</p>
              <p className="text-sm">Recargo: {c.Surcharge}</p>
              <p className="text-sm mb-2">Activo: {c.IsActive ? "Sí" : "No"}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.CreditCardID)}
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
