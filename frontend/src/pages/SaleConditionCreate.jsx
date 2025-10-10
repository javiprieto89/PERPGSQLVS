import { useEffect, useState } from "react";
import { creditCardOperations } from "~/services/credit-card.service";
import { saleConditionOperations } from "~/services/sale.service";

export default function SaleConditionCreate({
  onClose,
  onSave,
  saleCondition: initialSC = null,
}) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [surcharge, setSurcharge] = useState(0);
  const [creditCardID, setCreditCardID] = useState("");
  const [cards, setCards] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await creditCardOperations.getAllCards();
        setCards(data);
      } finally {
        setLoadingForm(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (initialSC) {
      setIsEdit(true);
      setName(initialSC.Name || "");
      setDueDate(initialSC.DueDate || "");
      setSurcharge(initialSC.Surcharge || 0);
      setIsActive(initialSC.IsActive !== false);
      setCreditCardID(initialSC.CreditCardID ? initialSC.CreditCardID : "");
    }
  }, [initialSC]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await saleConditionOperations.updateSaleCondition(
          initialSC.SaleConditionID,
          {
            Name: name,
            DueDate: dueDate,
            Surcharge: parseFloat(surcharge),
            IsActive: isActive,
            CreditCardID: creditCardID,
          }
        );
      } else {
        result = await saleConditionOperations.createSaleCondition({
          Name: name,
          DueDate: dueDate,
          Surcharge: parseFloat(surcharge),
          IsActive: isActive,
          CreditCardID: creditCardID,
        });
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando condición:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loadingForm) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Condición" : "Nueva Condición"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border  p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vencimiento</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border  p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Tarjeta de Crédito
          </label>
          <select
            value={creditCardID}
            onChange={(e) =>
              setCreditCardID(
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
            className="w-full border  p-2 rounded"
          >
            <option value="">Seleccione</option>
            {cards.map((card) => (
              <option key={card.CreditCardID} value={card.CreditCardID}>
                {card.CardName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recargo</label>
          <input
            type="number"
            value={surcharge}
            onChange={(e) => setSurcharge(e.target.value)}
            className="w-full border  p-2 rounded"
            step="0.01"
          />
        </div>
        <div>
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span>Condición activa</span>
          </label>
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border  rounded hover: disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || !name.trim() || !dueDate}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
