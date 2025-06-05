// src/pages/Suppliers.jsx
import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState(null);
  const [deletingSupplier, setDeletingSupplier] = useState(null);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const emptySupplier = {
    documentTypeID: 1,
    documentNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    isActive: true,
    countryID: 54,
    provinceID: 1,
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/suppliers/")
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error fetching suppliers")
      )
      .then((data) => {
        setSuppliers(data);
        setFilteredSuppliers(data);
      })
      .catch((err) => setError(err));
    fetch("http://127.0.0.1:8000/countries/")
      .then((res) => res.json())
      .then(setCountries);
    fetch("http://127.0.0.1:8000/provinces/")
      .then((res) => res.json())
      .then(setProvinces);
    fetch("http://127.0.0.1:8000/documenttypes/")
      .then((res) => res.json())
      .then(setDocumentTypes);
  }, []);

  const cities = Array.from(
    new Set(suppliers.map((s) => s.city).filter(Boolean))
  );

  const applyFilter = () => {
    let results = [...suppliers];
    Object.entries(filters).forEach(([field, value]) => {
      if (!value && value !== false) return;
      const val = value.toString().toLowerCase();
      if (field.endsWith("_mode")) return;
      const mode = filters[`${field}_mode`] || "contains";
      results = results.filter((s) => {
        const raw = s[field];
        if (raw === undefined) return false;
        if (field === "isActive") {
          const boolVal = ["true", "sí", "si"].includes(val);
          return raw === boolVal;
        }
        const cell = raw.toString().toLowerCase();
        if (mode === "contains") return cell.includes(val);
        if (mode === "starts") return cell.startsWith(val);
        if (mode === "equals") return cell === val;
        return true;
      });
    });
    setFilteredSuppliers(results);
  };

  const handleEditClick = (s) => setEditingSupplier(s);
  const handleDeleteClick = (s) => setDeletingSupplier(s);

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/suppliers/${editingSupplier.supplierID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingSupplier),
    })
      .then((res) => res.json())
      .then((updated) => {
        setSuppliers((prev) =>
          prev.map((x) => (x.supplierID === updated.supplierID ? updated : x))
        );
        setFilteredSuppliers((prev) =>
          prev.map((x) => (x.supplierID === updated.supplierID ? updated : x))
        );
        setEditingSupplier(null);
      })
      .catch(console.error);
  };

  const handleCreate = () => {
    const { supplierID, ...payload } = newSupplier;
    fetch("http://127.0.0.1:8000/suppliers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((created) => {
        setSuppliers((prev) => [...prev, created]);
        setFilteredSuppliers((prev) => [...prev, created]);
        setNewSupplier(null);
      })
      .catch(console.error);
  };

  const confirmDelete = () => {
    fetch(`http://127.0.0.1:8000/suppliers/${deletingSupplier.supplierID}`, {
      method: "DELETE",
    })
      .then(() => {
        setSuppliers((prev) =>
          prev.filter((x) => x.supplierID !== deletingSupplier.supplierID)
        );
        setFilteredSuppliers((prev) =>
          prev.filter((x) => x.supplierID !== deletingSupplier.supplierID)
        );
        setDeletingSupplier(null);
      })
      .catch(console.error);
  };

  const renderForm = (item, setItem, onSubmit, label, readOnly) => (
    <div className="space-y-3">
      <label className="block">
        Tipo de Documento:
        <select
          className="w-full border px-3 py-2 rounded"
          value={item.documentTypeID}
          onChange={(e) =>
            setItem({ ...item, documentTypeID: parseInt(e.target.value, 10) })
          }
          disabled={readOnly}
        >
          <option value="">-- Tipo Documento --</option>
          {documentTypes.map((dt) => (
            <option key={dt.documentTypeID} value={dt.documentTypeID}>
              {dt.name}
            </option>
          ))}
        </select>
      </label>
      {[
        "documentNumber",
        "firstName",
        "lastName",
        "phone",
        "email",
        "address",
        "city",
        "postalCode",
      ].map((k) => (
        <input
          key={k}
          name={k}
          className="w-full border px-3 py-2 rounded"
          placeholder={k}
          value={item[k] || ""}
          onChange={(e) => setItem({ ...item, [k]: e.target.value })}
          readOnly={readOnly}
        />
      ))}
      <label className="block">
        País:
        <select
          className="w-full border px-3 py-2 rounded"
          value={item.countryID}
          onChange={(e) =>
            setItem({ ...item, countryID: parseInt(e.target.value, 10) })
          }
          disabled={readOnly}
        >
          <option value="">-- País --</option>
          {countries.map((ct) => (
            <option key={ct.countryID} value={ct.countryID}>
              {ct.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        Provincia:
        <select
          className="w-full border px-3 py-2 rounded"
          value={item.provinceID}
          onChange={(e) =>
            setItem({ ...item, provinceID: parseInt(e.target.value, 10) })
          }
          disabled={readOnly}
        >
          <option value="">-- Provincia --</option>
          {provinces.map((pr) => (
            <option key={pr.provinceID} value={pr.provinceID}>
              {pr.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.isActive}
          onChange={(e) => setItem({ ...item, isActive: e.target.checked })}
          disabled={readOnly}
        />{" "}
        Activo
      </label>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setEditingSupplier(null);
            setNewSupplier(null);
            setDeletingSupplier(null);
          }}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          onClick={onSubmit}
          className={`px-4 py-2 rounded ${
            readOnly
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {label}
        </button>
      </div>
    </div>
  );

  const getNameById = (list, id) => {
    const f = list.find((x) => x[Object.keys(x)[0]] === id);
    return f ? f.name || f.name : "";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <div className="flex space-x-2">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setNewSupplier({ ...emptySupplier })}
          >
            <PlusIcon className="h-5 w-5 inline-block mr-2" />
            Nuevo Supplier
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded mb-4 space-y-4">
          {[
            { key: "documentNumber", label: "Documento", type: "text" },
            { key: "firstName", label: "Nombre", type: "text" },
            { key: "lastName", label: "Apellido", type: "text" },
            { key: "phone", label: "Teléfono", type: "text" },
            { key: "email", label: "email", type: "text" },
            { key: "address", label: "Dirección", type: "text" },
            { key: "postalCode", label: "CP", type: "text" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <label className="w-32 font-medium">{label}</label>
              <select
                className="border px-2 py-1 rounded"
                value={filters[`${key}_mode`] || "contains"}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, [`${key}_mode`]: e.target.value }))
                }
              >
                <option value="contains">Contiene</option>
                <option value="starts">Comienza con</option>
                <option value="equals">Es igual a</option>
              </select>
              <input
                type="text"
                className="flex-1 border px-2 py-1 rounded"
                value={filters[key] || ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, [key]: e.target.value }))
                }
                placeholder={`Filtrar ${label.toLowerCase()}`}
              />
            </div>
          ))}
          {[
            {
              key: "city",
              label: "Ciudad",
              options: cities.map((c) => ({ value: c, text: c })),
            },
            {
              key: "countryID",
              label: "País",
              options: countries.map((ct) => ({
                value: ct.countryID,
                text: ct.name,
              })),
            },
            {
              key: "provinceID",
              label: "Provincia",
              options: provinces.map((pr) => ({
                value: pr.provinceID,
                text: pr.name,
              })),
            },
            {
              key: "isActive",
              label: "Activo",
              options: [
                { value: "true", text: "Sí" },
                { value: "false", text: "No" },
              ],
            },
          ].map(({ key, label, options }) => (
            <div key={key} className="flex items-center space-x-2">
              <label className="w-32 font-medium">{label}</label>
              <select
                className="flex-1 border px-2 py-1 rounded"
                value={filters[key] === undefined ? "" : filters[key]}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, [key]: e.target.value }))
                }
              >
                <option value="">-- Todos --</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex space-x-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={applyFilter}
            >
              Buscar
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setFilters({});
                setFilteredSuppliers(suppliers);
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Suppliers Table */}
      <table className="w-full bg-white rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-200 text-left text-xs uppercase text-gray-600">
            <th className="p-3">Documento</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">email</th>
            <th className="p-3">Dirección</th>
            <th className="p-3">Ciudad</th>
            <th className="p-3">CP</th>
            <th className="p-3">País</th>
            <th className="p-3">Provincia</th>
            <th className="p-3">Activo</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((s) => (
            <tr key={s.supplierID} className="border-t hover:bg-gray-100">
              <td className="p-2">{s.documentNumber}</td>
              <td className="p-2">{s.firstName}</td>
              <td className="p-2">{s.lastName}</td>
              <td className="p-2">{s.phone}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">{s.address}</td>
              <td className="p-2">{s.city}</td>
              <td className="p-2">{s.postalCode}</td>
              <td className="p-2">{getNameById(countries, s.countryID)}</td>
              <td className="p-2">{getNameById(provinces, s.provinceID)}</td>
              <td className="p-2">{s.isActive ? "Sí" : "No"}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEditClick(s)}
                  className="text-green-600 hover:text-green-800"
                  title="Editar"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(s)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {editingSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px]">
            <h2 className="text-xl font-bold mb-4">Editar Supplier</h2>
            {renderForm(
              editingSupplier,
              setEditingSupplier,
              handleUpdate,
              "Actualizar",
              false
            )}
          </div>
        </div>
      )}
      {newSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px]">
            <h2 className="text-xl font-bold mb-4">Nuevo Supplier</h2>
            {renderForm(
              newSupplier,
              setNewSupplier,
              handleCreate,
              "Crear",
              false
            )}
          </div>
        </div>
      )}
      {deletingSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px]">
            <h2 className="text-xl font-bold mb-4">Eliminar Supplier</h2>
            {renderForm(
              deletingSupplier,
              null,
              confirmDelete,
              "Confirmar",
              true
            )}
          </div>
        </div>
      )}
    </div>
  );
}
