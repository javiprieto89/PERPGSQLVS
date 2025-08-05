// frontend/src/pages/FeLastVoucher.jsx
import { useEffect, useState } from "react";
import { afipOperations } from "../graphql/afipOperations";

export default function FeLastVoucher() {
  const [ptoVta, setPtoVta] = useState("1");
  const [cbteTipo, setCbteTipo] = useState("6");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const status = await afipOperations.testConnection();
      setConnectionStatus(status);
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: "Error de conexión",
        details: error.message,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const nro = await afipOperations.getUltimoComprobante(
        parseInt(ptoVta),
        parseInt(cbteTipo)
      );
      setResult(nro);
    } catch (err) {
      console.error("Error:", err);
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (success) => {
    return success ? "text-green-600" : "text-red-600";
  };

  const tiposComprobante = [
    { value: "1", label: "1 - Factura A" },
    { value: "6", label: "6 - Factura B" },
    { value: "11", label: "11 - Factura C" },
    { value: "51", label: "51 - Factura M" },
    { value: "3", label: "3 - Nota de Crédito A" },
    { value: "8", label: "8 - Nota de Crédito B" },
    { value: "13", label: "13 - Nota de Crédito C" },
    { value: "2", label: "2 - Nota de Débito A" },
    { value: "7", label: "7 - Nota de Débito B" },
    { value: "12", label: "12 - Nota de Débito C" },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Último Comprobante Autorizado</h1>

      {/* Estado de conexión */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-2">Estado de Conexión AFIP</h2>
        {connectionStatus ? (
          <div>
            <p
              className={`font-medium ${getStatusColor(
                connectionStatus.success
              )}`}
            >
              {connectionStatus.success
                ? "✅ Conectado"
                : "❌ Error de conexión"}
            </p>
            <p className="text-sm text-gray-600">{connectionStatus.message}</p>
            <button
              onClick={testConnection}
              className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Probar Conexión
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Verificando conexión...</p>
        )}
      </div>

      {/* Formulario */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Punto de Venta
            </label>
            <input
              type="number"
              value={ptoVta}
              onChange={(e) => setPtoVta(e.target.value)}
              className="border p-3 rounded w-full"
              placeholder="Ej: 1"
              min="1"
              max="9999"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Número del punto de venta (1-9999)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tipo de Comprobante
            </label>
            <select
              value={cbteTipo}
              onChange={(e) => setCbteTipo(e.target.value)}
              className="border p-3 rounded w-full"
              required
            >
              {tiposComprobante.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Seleccione el tipo de comprobante a consultar
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !connectionStatus?.success}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 font-medium"
          >
            {loading ? "Consultando..." : "Consultar Último Número"}
          </button>
        </form>
      </div>

      {/* Resultado */}
      {result !== null && (
        <div className="mt-6 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Resultado</h2>

          {typeof result === "number" ? (
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">{result}</div>
              <p className="text-sm text-gray-600">
                Último número de comprobante autorizado para:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • <strong>Punto de Venta:</strong> {ptoVta}
                </li>
                <li>
                  • <strong>Tipo:</strong>{" "}
                  {tiposComprobante.find((t) => t.value === cbteTipo)?.label}
                </li>
              </ul>

              {result === 0 && (
                <div className="mt-3 p-3 bg-yellow-100 border border-yellow-400 rounded">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ No se encontraron comprobantes autorizados para este
                    punto de venta y tipo.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-red-100 border border-red-400 rounded">
              <p className="text-red-800 text-sm">❌ {result}</p>
            </div>
          )}
        </div>
      )}

      {/* Información de ayuda */}
      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400">
        <h3 className="font-semibold text-blue-800 mb-2">Información</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Esta consulta usa el servicio WSFE de AFIP</li>
          <li>• Se obtiene automáticamente un token del WSAA</li>
          <li>
            • Los números de comprobante son consecutivos por punto de venta y
            tipo
          </li>
          <li>• Si devuelve 0, significa que no hay comprobantes previos</li>
        </ul>
      </div>
    </div>
  );
}
