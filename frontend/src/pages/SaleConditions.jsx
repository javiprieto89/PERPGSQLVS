import { useEffect, useState } from "react";
import { saleConditionOperations, creditCardOperations, creditCardGroupOperations } from "../utils/graphqlClient";
import SaleConditionCreate from "./SaleConditionCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function SaleConditions() {
    const [allSaleConditions, setAllSaleConditions] = useState([]);
    const [saleConditions, setSaleConditions] = useState([]);
    const [cards, setCards] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadSCs(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-saleconditions') {
                loadSCs();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadSCs = async () => {
        try {
            setLoading(true);
            const [scData, cardData, groupData] = await Promise.all([
                saleConditionOperations.getAllSaleConditions(),
                creditCardOperations.getAllCards(),
                creditCardGroupOperations.getAllGroups(),
            ]);
            setAllSaleConditions(scData);
            setSaleConditions(scData);
            setCards(cardData);
            setGroups(groupData);
        } catch (err) {
            console.error("Error cargando condiciones:", err);
            setError(err.message);
            setSaleConditions([]);
        } finally {
            setLoading(false);
        }
    };


    const handleCreate = () => {
        openReactWindow(
            () => (
                <SaleConditionCreate
                    cards={cards}
                    groups={groups}
                    onSave={() => {
                        window.opener.postMessage('reload-saleconditions', '*');
                        window.close();
                    }}
                    onClose={() => window.close()}
                />
            ),
            'Nueva Condición'
        );
    };

    const handleFilterChange = (filtered) => {
        setSaleConditions(filtered);
    };

    const handleEdit = (sc) => {
        openReactWindow(
            () => (
                <SaleConditionCreate
                    saleCondition={sc}
                    cards={cards}
                    groups={groups}
                    onSave={() => {
                        window.opener.postMessage('reload-saleconditions', '*');
                        window.close();
                    }}
                    onClose={() => window.close()}
                />
            ),
            'Editar Condición'
        );
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Condiciones de Venta</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadSCs}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nueva Condición
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="saleconditions"
                        data={allSaleConditions}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {saleConditions.map(sc => {
                        const card = cards.find(c => c.CreditCardID === sc.CreditCardID);
                        const group = card ? groups.find(g => g.CreditCardGroupID === card.CreditCardGroupID) : null;
                        return (
                            <div key={sc.SaleConditionID} className="bg-white rounded shadow p-4">
                                <h3 className="text-lg font-semibold mb-2">{sc.Name}</h3>
                                <p className="text-sm">
                                    Tarjeta: {card ? card.CardName : sc.CreditCardID}
                                    {group ? ` (${group.GroupName})` : ''}
                                </p>
                                <p className="text-sm mb-1">Vencimiento: {sc.DueDate}</p>
                                <p className="text-sm mb-2">Activo: {sc.IsActive ? 'Sí' : 'No'}</p>
                                <button onClick={() => handleEdit(sc)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
