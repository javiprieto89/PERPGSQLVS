import { useState, useEffect } from "react";
import { creditCardOperations, creditCardGroupOperations } from "../utils/graphqlClient";

export default function CreditCardCreate({ onClose, onSave, card: initialCard = null }) {
    const [card, setCard] = useState({
        CreditCardGroupID: 0,
        CardName: "",
        Surcharge: 0,
        Installments: 0,
        IsActive: true
    });
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(true);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        loadForm();
    }, []);

    const loadForm = async () => {
        try {
            setLoadingForm(true);
            const data = await creditCardGroupOperations.getAllGroups();
            setGroups(data);
            if (data.length > 0 && !initialCard) {
                setCard(c => ({ ...c, CreditCardGroupID: data[0].CreditCardGroupID }));
            }
        } finally {
            setLoadingForm(false);
        }
    };

    useEffect(() => {
        if (initialCard) {
            setIsEdit(true);
            setCard({
                CreditCardGroupID: initialCard.CreditCardGroupID,
                CardName: initialCard.CardName,
                Surcharge: initialCard.Surcharge || 0,
                Installments: initialCard.Installments || 0,
                IsActive: initialCard.IsActive !== false
            });
        }
    }, [initialCard]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCard(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name.includes('ID') || name === 'Installments') ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let result;
            if (isEdit) {
                result = await creditCardOperations.updateCard(initialCard.CreditCardID, card);
            } else {
                result = await creditCardOperations.createCard(card);
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingForm) {
        return <div className="p-6">Cargando...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Tarjeta' : 'Nueva Tarjeta'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Grupo</label>
                    <select
                        name="CreditCardGroupID"
                        value={card.CreditCardGroupID}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        {groups.map(g => (
                            <option key={g.CreditCardGroupID} value={g.CreditCardGroupID}>{g.GroupName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                        type="text"
                        name="CardName"
                        value={card.CardName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Recargo</label>
                    <input
                        type="number"
                        name="Surcharge"
                        value={card.Surcharge}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        step="0.01"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Cuotas</label>
                    <input
                        type="number"
                        name="Installments"
                        value={card.Installments}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div>
                    <label className="inline-flex items-center mt-2">
                        <input
                            type="checkbox"
                            className="mr-2"
                            name="IsActive"
                            checked={card.IsActive}
                            onChange={handleChange}
                        />
                        <span>Tarjeta activa</span>
                    </label>
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        disabled={loading || !card.CardName.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
