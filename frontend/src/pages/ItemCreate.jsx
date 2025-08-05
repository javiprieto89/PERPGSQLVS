import { useEffect, useState } from "react";
import {
  brandOperations,
  itemCategoryOperations,
  itemOperations,
  itemSubcategoryOperations,
  supplierOperations,
} from "~/graphql/operations.js";

export default function ItemCreate({
  onClose,
  onSave,
  item: initialItem = null,
}) {
  const [form, setForm] = useState({
    code: "",
    description: "",
    brandID: "",
    categoryID: "",
    subcategoryID: "",
    supplierID: "",
    controlStock: true,
    replenishmentStock: 0,
    isActive: true,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [b, c, s, sup] = await Promise.all([
          brandOperations.getAllBrands(),
          itemCategoryOperations.getAllItemCategories(),
          itemSubcategoryOperations.getAllItemSubcategories(),
          supplierOperations.getAllSuppliers(),
        ]);
        setBrands(b);
        setCategories(c);
        setSubcategories(s);
        setSuppliers(sup);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (initialItem) {
      setIsEdit(true);
      setForm({
        code: initialItem.Code || "",
        description: initialItem.Description || "",
        brandID: initialItem.BrandID || "",
        categoryID: initialItem.ItemCategoryID || "",
        subcategoryID: initialItem.ItemSubcategoryID || "",
        supplierID: initialItem.SupplierID || "",
        controlStock: initialItem.ControlStock !== false,
        replenishmentStock: initialItem.ReplenishmentStock || 0,
        isActive: initialItem.IsActive !== false,
      });
    }
  }, [initialItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        CompanyID: 1,
        BranchID: 1,
        BrandID: parseInt(form.brandID),
        Code: form.code,
        Description: form.description,
        ItemCategoryID: parseInt(form.categoryID),
        ItemSubcategoryID: parseInt(form.subcategoryID),
        SupplierID: parseInt(form.supplierID),
        ControlStock: form.controlStock,
        ReplenishmentStock: parseInt(form.replenishmentStock) || 0,
        IsOffer: false,
        OEM: null,
        WarehouseID: 1,
        IsActive: form.isActive,
      };
      let result;
      if (isEdit) {
        result = await itemOperations.updateItem(initialItem.ItemID, payload);
      } else {
        result = await itemOperations.createItem(payload);
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando ítem:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Ítem" : "Nuevo Ítem"}
      </h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Código</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marca</label>
          <select
            name="brandID"
            value={form.brandID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {brands.map((b) => (
              <option key={b.BrandID} value={b.BrandID}>
                {b.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select
            name="categoryID"
            value={form.categoryID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {categories.map((c) => (
              <option key={c.ItemCategoryID} value={c.ItemCategoryID}>
                {c.CategoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subcategoría</label>
          <select
            name="subcategoryID"
            value={form.subcategoryID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {subcategories.map((s) => (
              <option key={s.ItemSubcategoryID} value={s.ItemSubcategoryID}>
                {s.SubcategoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Proveedor</label>
          <select
            name="supplierID"
            value={form.supplierID}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {suppliers.map((s) => (
              <option key={s.SupplierID} value={s.SupplierID}>
                {s.FirstName} {s.LastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="controlStock"
              checked={form.controlStock}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Controlar stock</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Stock de reposición
          </label>
          <input
            type="number"
            name="replenishmentStock"
            value={form.replenishmentStock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Activo</span>
          </label>
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={
              loading ||
              !form.code ||
              !form.description ||
              !form.brandID ||
              !form.categoryID ||
              !form.subcategoryID ||
              !form.supplierID
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
