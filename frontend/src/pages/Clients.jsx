import { useEffect, useState } from "react";
import TableFilters from "../components/TableFilters";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import apiFetch from "../utils/apiFetch";
import MyWindowPortal from "../components/MyWindowPortal";
import ClientCreate from "./ClientCreate";

export default function Clients({ token, onLogout }) {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [deletingClient, setDeletingClient] = useState(null);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [popup, setPopup] = useState(null);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [cl, ct, pr, pl, dt] = await Promise.all([
        apiFetch("/clients/"),
        apiFetch("/countries"),
        apiFetch("/provinces/"),
        apiFetch("/pricelists/"),
        apiFetch("/documenttypes/"),
      ]);
      setClients(cl);
      setCountries(ct);
      setProvinces(pr);
      setPriceLists(pl);
      setDocumentTypes(dt);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const openClientCreatePopup = () => {
    setPopup(
      <MyWindowPortal
        title="Nuevo Cliente"
        width={800}
        height={600}
        onClose={() => {
          setPopup(null);
          loadData();
        }}
      >
        <ClientCreate
          onClose={() => {
            setPopup(null);
            loadData();
          }}
        />
      </MyWindowPortal>
    );
  };

  const sanitizeClient = (client) => ({
    documentTypeID: client.documentTypeID,
    documentNumber: client.documentNumber,
    firstName: client.firstName,
    lastName: client.lastName,
    phone: client.phone,
    email: client.email,
    address: client.address,
    city: client.city,
    postalCode: client.postalCode,
    isActive: client.isActive,
    countryID: client.countryID,
    provinceID: client.provinceID,
    priceListID: client.priceListID,
  });

  const handleEditClick = (c) => setEditingClient(c);
  const handleDeleteClick = (c) => setDeletingClient(c);

  const handleUpdate = async () => {
    const cleanData = {
      ...sanitizeClient(editingClient),
      clientID: editingClient.clientID,
    };
    try {
      await apiFetch(`/clients/${editingClient.clientID}`, {
        method: "PUT",
        body: cleanData,
      });
      await loadData();
      setEditingClient(null);
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("Error al actualizar cliente");
    }
  };

  const confirmDelete = () => {
    apiFetch(`/clients/${deletingClient.clientID}`, {
      method: "DELETE",
    })
      .then(() => {
        setClients((prev) =>
          prev.filter((x) => x.clientID !== deletingClient.clientID)
        );
        setDeletingClient(null);
      })
      .catch((e) => setError(e.message));
  };

  const getNameById = (list, id) => {
    const f = list.find((x) => Object.values(x)[0] === id);
    return f?.name || "";
  };

  const renderForm = (client, setClient, onSubmit, label, readOnly) => (
    <div className="space-y-3">
      <label>
        Tipo Documento:
        <select
          value={client.documentTypeID}
          onChange={(e) =>
            setClient({ ...client, documentTypeID: +e.target.value })
          }
          disabled={readOnly}
          className="w-full border px-3 py-2 rounded"
        >
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
          placeholder={k}
          value={client[k] || ""}
          onChange={(e) => setClient({ ...client, [k]: e.target.value })}
          readOnly={readOnly}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <label>
        País:
        <select
          value={client.countryID}
          onChange={(e) => setClient({ ...client, countryID: +e.target.value })}
          disabled={readOnly}
          className="w-full border px-3 py-2 rounded"
        >
          {countries.map((ct) => (
            <option key={ct.countryID} value={ct.countryID}>
              {ct.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Provincia:
        <select
          value={client.provinceID}
          onChange={(e) =>
            setClient({ ...client, provinceID: +e.target.value })
          }
          disabled={readOnly}
          className="w-full border px-3 py-2 rounded"
        >
          {provinces.map((pr) => (
            <option key={pr.provinceID} value={pr.provinceID}>
              {pr.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Lista Precios:
        <select
          value={client.priceListID}
          onChange={(e) =>
            setClient({ ...client, priceListID: +e.target.value })
          }
          disabled={readOnly}
          className="w-full border px-3 py-2 rounded"
        >
          {priceLists.map((pl) => (
            <option key={pl.priceListID} value={pl.priceListID}>
              {pl.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={client.isActive}
          onChange={(e) => setClient({ ...client, isActive: e.target.checked })}
          disabled={readOnly}
        />{" "}
        Activo
      </label>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setEditingClient(null);
            setDeletingClient(null);
          }}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={onSubmit}
          className={`px-4 py-2 rounded ${
            readOnly ? "bg-red-600 text-white" : "bg-blue-600 text-white"
          }`}
        >
          {label}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </button>
          <button
            onClick={openClientCreatePopup}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {showFilters && (
        <TableFilters
          modelName="clients"
          onFilterChange={(results) => setClients(results)}
          token={token}
        />
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full bg-white rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-200 text-left text-xs uppercase text-gray-600">
            <th className="p-3">Nombre</th>
            <th className="p-3">Documento</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">email</th>
            <th className="p-3">Dirección</th>
            <th className="p-3">Ciudad</th>
            <th className="p-3">CP</th>
            <th className="p-3">País</th>
            <th className="p-3">Provincia</th>
            <th className="p-3">Lista Precios</th>
            <th className="p-3">Activo</th>
            <th className="p-3">ID</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.clientID} className="border-t hover:bg-gray-100">
              <td className="p-2">
                {c.firstName} {c.lastName}
              </td>
              <td className="p-2">{c.documentNumber}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2">{c.city}</td>
              <td className="p-2">{c.postalCode}</td>
              <td className="p-2">{getNameById(countries, c.countryID)}</td>
              <td className="p-2">{getNameById(provinces, c.provinceID)}</td>
              <td className="p-2">{getNameById(priceLists, c.priceListID)}</td>
              <td className="p-2">{c.isActive ? "Sí" : "No"}</td>
              <td className="p-2">{c.clientID}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEditClick(c)}
                  className="text-green-600 hover:text-green-800"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(c)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px]">
            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
            {renderForm(
              editingClient,
              setEditingClient,
              handleUpdate,
              "Actualizar",
              false
            )}
          </div>
        </div>
      )}

      {deletingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px]">
            <h2 className="text-xl font-bold mb-4">Eliminar Cliente</h2>
            {renderForm(deletingClient, null, confirmDelete, "Confirmar", true)}
          </div>
        </div>
      )}

      {popup}
    </div>
  );
}
