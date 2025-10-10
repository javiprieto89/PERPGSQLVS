// frontend/src/pages/PriceListCreate.jsx
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { pricelistOperations } from "~/services/price-list.service";

export default function PriceListCreate({
  onClose,
  onSave,
  pricelist: data = null,
}) {
  console.log("data", JSON.stringify(data));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setIsEdit(true);
      setName(data.PriceListData.Name || "");
      setDescription(data.PriceListData.Description || "");
      setIsActive(data.IsActive !== false);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        Name: name,
        Description: description,
        IsActive: isActive,
      };
      let result;
      if (isEdit) {
        result = await pricelistOperations.updatePricelist(
          data.PriceListID,
          payload
        );
      } else {
        result = await pricelistOperations.createPricelist(payload);
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando lista:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Lista" : "Nueva Lista"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-1">Nombre</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Descripción</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label className="inline-flex items-center">
            <Input
              type="checkbox"
              className="mr-2"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span>Activo</span>
          </Label>
        </div>
        <div className="flex justify-between space-x-4 pt-4 border-t">
          <Button
            variant="link"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading || !name.trim()}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
