import { useEffect, useState } from "react";
import { creditCardGroupOperations } from "~/services/credit-card.service";

export default function CreditCardGroupCreate({
  onClose,
  onSave,
  group: initialGroup = null,
}) {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (initialGroup) {
      setIsEdit(true);
      setGroupName(initialGroup.GroupName || "");
    }
  }, [initialGroup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await creditCardGroupOperations.updateGroup(
          initialGroup.CreditCardGroupID,
          { GroupName: groupName }
        );
      } else {
        result = await creditCardGroupOperations.createGroup({
          GroupName: groupName,
        });
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Grupo" : "Nuevo Grupo"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border  p-2 rounded"
            required
          />
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
            disabled={loading || !groupName.trim()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
