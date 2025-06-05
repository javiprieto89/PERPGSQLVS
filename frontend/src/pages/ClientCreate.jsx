import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";

export default function ClientCreate() {
  const [client, setClient] = useState({
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
    countryID: 1,
    provinceID: 1,
    priceListID: 1,
  });

  const [documentTypes, setDocumentTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [dt, ct, pr, pl] = await Promise.all([
          apiFetch("/documenttypes"),
          apiFetch("/countries"),
          apiFetch("/provinces"),
          apiFetch("/pricelists"),
        ]);
        setDocumentTypes(dt);
        setCountries(ct);
        setProvinces(pr);
        setPriceLists(pl);

        setClient((prev) => ({
          ...prev,
          documentTypeID: dt[0]?.documentTypeID || 1,
          countryID: ct[0]?.countryID || 1,
          provinceID: pr[0]?.provinceID || 1,
          priceListID: pl[0]?.priceListID || 1,
        }));
      } catch (e) {
        setError("Error al cargar datos");
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/clients/", {
        method: "POST",
        body: client,
      });
      window.close(); // ✅ Cierra la ventana popup
    } catch (e) {
      console.error(e);
      setError("Error al guardar el cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Nuevo Cliente</h2>
      {error && <p className="text-red-600">{error}</p>}

      <select
        name="documentTypeID"
        value={client.documentTypeID}
        onChange={handleChange}
        className="w-full border p-2"
      >
        {documentTypes.map((dt) => (
          <option key={dt.documentTypeID} value={dt.documentTypeID}>
            {dt.name}
          </option>
        ))}
      </select>

      {[
        { name: "documentNumber", placeholder: "Número de Documento" },
        { name: "firstName", placeholder: "Nombre" },
        { name: "lastName", placeholder: "Apellido" },
        { name: "phone", placeholder: "Teléfono" },
        { name: "email", placeholder: "email" },
        { name: "address", placeholder: "Dirección" },
        { name: "city", placeholder: "Ciudad" },
        { name: "postalCode", placeholder: "Código Postal" },
      ].map((field) => (
        <input
          key={field.name}
          name={field.name}
          value={client[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="w-full border p-2"
        />
      ))}

      <select
        name="countryID"
        value={client.countryID}
        onChange={handleChange}
        className="w-full border p-2"
      >
        {countries.map((ct) => (
          <option key={ct.countryID} value={ct.countryID}>
            {ct.name}
          </option>
        ))}
      </select>

      <select
        name="provinceID"
        value={client.provinceID}
        onChange={handleChange}
        className="w-full border p-2"
      >
        {provinces.map((pr) => (
          <option key={pr.provinceID} value={pr.provinceID}>
            {pr.name}
          </option>
        ))}
      </select>

      <select
        name="priceListID"
        value={client.priceListID}
        onChange={handleChange}
        className="w-full border p-2"
      >
        {priceLists.map((pl) => (
          <option key={pl.priceListID} value={pl.priceListID}>
            {pl.name}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={client.isActive}
          onChange={handleChange}
        />
        Activo
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => window.close()}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Cliente
        </button>
      </div>
    </form>
  );
}
