// frontend/src/pages/FeInfo.jsx
import { useState } from "react";
import { afipOperations } from "../utils/graphqlClient";

export default function FeInfo() {
    const [form, setForm] = useState({
        CuitEmisor: "",
        PtoVta: "",
        CbteTipo: "",
        CbteNro: "",
        CbteFch: "",
        ImpTotal: "",
        CodAutorizacion: "",
        DocTipoReceptor: "",
        DocNroReceptor: "",
    });
    const [result, setResult] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await afipOperations.informacionComprobante({
                CbteModo: "CAE",
                CuitEmisor: parseInt(form.CuitEmisor),
                PtoVta: parseInt(form.PtoVta),
                CbteTipo: parseInt(form.CbteTipo),
                CbteNro: parseInt(form.CbteNro),
                CbteFch: parseInt(form.CbteFch),
                ImpTotal: parseFloat(form.ImpTotal),
                CodAutorizacion: form.CodAutorizacion,
                DocTipoReceptor: form.DocTipoReceptor,
                DocNroReceptor: form.DocNroReceptor,
            });
            setResult(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Información Comprobante</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.entries(form).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm mb-1">{key}</label>
                        <input
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Consultar
                </button>
            </form>
            {result && (
                <pre className="mt-4 whitespace-pre-wrap">{result}</pre>
            )}
        </div>
    );
}