/ frontend/src / pages / FeLastVoucher.jsx
import { useState } from "react";
import { afipOperations } from "../utils/graphqlClient";

export default function FeLastVoucher() {
    const [ptoVta, setPtoVta] = useState("");
    const [cbteTipo, setCbteTipo] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nro = await afipOperations.getUltimoComprobante(
                parseInt(ptoVta),
                parseInt(cbteTipo)
            );
            setResult(nro);
        } catch (err) {
            console.error(err);
            setResult(null);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Último Comprobante</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm">Punto de Venta</label>
                    <input
                        type="number"
                        value={ptoVta}
                        onChange={(e) => setPtoVta(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm">Tipo Comprobante</label>
                    <input
                        type="number"
                        value={cbteTipo}
                        onChange={(e) => setCbteTipo(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Consultar
                </button>
            </form>
            {result !== null && (
                <div className="mt-4">Último número: {result}</div>
            )}
        </div>
    );
}