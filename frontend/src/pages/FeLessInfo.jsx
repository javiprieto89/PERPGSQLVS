// frontend/src/pages/FeLessInfo.jsx
import { useEffect, useState } from "react";
import { afipOperations } from "../graphql/afipOperations";

export default function FeLessInfo() {
  const [form, setForm] = useState({
    PtoVta: "",
    CbteTipo: "",
    CbteNro: "",
    ImpTotal: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Cargar datos de prueba al inicio
  useEffect(() => {
    loadTestData();
    testConnection();
  }, []);

  const loadTestData = async (useAlternative = false) => {
    try {
      const testData = useAlternative
        ? await afipOperations.getAlternativeTestData()
        : await afipOperations.getTestVoucherData();

      setForm({
        CbteTipo: testData.CbteTipo.toString(),
        PtoVta: testData.PtoVta.toString(),
        CbteNro: testData.CbteNro.toString(),
      });
    } catch (error) {
      console.error("Error cargando datos de prueba:", error);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const data = await afipOperations.informacionRapidaComprobante(form);
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Función removida - se usa loadTestData directamente

  const getStatusColor = (success) => {
    return success ? "text-green-600" : "text-destructive";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Información de Comprobante AFIP
      </h1>

      {/* Estado de conexión */}
      <div className="mb-6 p-4 border rounded-lg ">
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
            <p className="text-sm text-muted-foreground">
              {connectionStatus.message}
            </p>
            <button
              onClick={testConnection}
              className="mt-2 px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary"
            >
              Probar Conexión
            </button>
          </div>
        ) : (
          <p className="text-foreground/80">Verificando conexión...</p>
        )}
      </div>

      {/* Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo Comprobante
                </label>
                <select
                  name="CbteTipo"
                  value={form.CbteTipo}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="6">6 - Factura B</option>
                  <option value="11">11 - Factura C</option>
                  <option value="1">1 - Factura A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número Comprobante
                </label>
                <input
                  name="CbteNro"
                  type="number"
                  value={form.CbteNro}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder="1"
                  required
                />
              </div>
            </div>

            {/*                           <div>*/}
            {/*        <label className="block text-sm font-medium mb-1">Importe Total</label>*/}
            {/*        <input*/}
            {/*            name="ImpTotal"*/}
            {/*            type="number"*/}
            {/*            step="0.01"*/}
            {/*            value={form.ImpTotal}*/}
            {/*            onChange={handleChange}*/}
            {/*            className="border p-2 rounded w-full"*/}
            {/*            placeholder="121.00"*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <label className="block text-sm font-medium mb-1">Código Autorización (CAE)</label>*/}
            {/*    <input*/}
            {/*        name="CodAutorizacion"*/}
            {/*        value={form.CodAutorizacion}*/}
            {/*        onChange={handleChange}*/}
            {/*        className="border p-2 rounded w-full"*/}
            {/*        placeholder="68244567890123"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
            {/*    <div>*/}
            {/*        <label className="block text-sm font-medium mb-1">Tipo Doc. Receptor</label>*/}
            {/*        <select*/}
            {/*            name="DocTipoReceptor"*/}
            {/*            value={form.DocTipoReceptor}*/}
            {/*            onChange={handleChange}*/}
            {/*            className="border p-2 rounded w-full"*/}
            {/*            required*/}
            {/*        >*/}
            {/*            <option value="">Seleccionar</option>*/}
            {/*            <option value="96">96 - DNI</option>*/}
            {/*            <option value="80">80 - CUIT</option>*/}
            {/*            <option value="86">86 - CUIL</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label className="block text-sm font-medium mb-1">Núm. Doc. Receptor</label>*/}
            {/*        <input*/}
            {/*            name="DocNroReceptor"*/}
            {/*            value={form.DocNroReceptor}*/}
            {/*            onChange={handleChange}*/}
            {/*            className="border p-2 rounded w-full"*/}
            {/*            placeholder="12345678"*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:"
            >
              {loading ? "Consultando..." : "Consultar Comprobante"}
            </button>
          </form>
        </div>

        {/* Resultado */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Respuesta de AFIP</h2>
          <div className="border rounded-lg p-4  h-96 overflow-auto">
            {result ? (
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-foreground/80">No hay resultados aún</p>
            )}
          </div>
        </div>
      </div>

      {/* Información de ayuda */}
      <div className="mt-8 p-4 bg-accent border-l-4 border-blue-400">
        <h3 className="font-semibold text-foreground mb-2">
          Información de Prueba
        </h3>
        <ul className="text-sm text-foreground/80 space-y-1">
          <li>
            • <strong>Datos Válidos (A):</strong> Factura A con CUIT 20111111112
            (garantiza respuesta válida)
          </li>
          <li>
            • <strong>Datos Válidos (B):</strong> Factura B con CUIT 20111111112
            (garantiza respuesta válida)
          </li>
          <li>• Estos datos están validados según afipsdk.com para testing</li>
          <li>• La fecha debe estar en formato YYYYMMDD</li>
          <li>• El CAE debe ser un código de autorización válido</li>
        </ul>
      </div>
    </div>
  );
}
