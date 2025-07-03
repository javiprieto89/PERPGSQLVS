import { useEffect, useState } from "react";
import { creditCardGroupOperations } from "../utils/graphqlClient";
import CreditCardGroupCreate from "./CreditCardGroupCreate";
import TableFilters from "../components/TableFilters";

export default function CreditCardGroups() {
    const [allGroups, setAllGroups] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadGroups(); }, []);

    const loadGroups = async () => {
        try {
            setLoading(true);
            const data = await creditCardGroupOperations.getAllGroups();
            setAllGroups(data);
            setGroups(data);
        } catch (err) {
            setError(err.message);
            setGroups([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaved = () => {
        loadGroups();
        setShowModal(false);
        setEditingGroup(null);
    };

    const handleCreate = () => {
        setEditingGroup(null);
        setShowModal(true);
    };

    const handleFilterChange = (filtered) => {
        setGroups(filtered);
    };

    const handleEdit = (group) => {
        setEditingGroup(group);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Grupos de Tarjetas</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadGroups}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nuevo Grupo
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="creditcardgroups"
                        data={allGroups}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(g => (
                        <div key={g.CreditCardGroupID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{g.GroupName}</h3>
                            <button onClick={() => handleEdit(g)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <CreditCardGroupCreate
                            onClose={() => { setShowModal(false); setEditingGroup(null); }}
                            onSave={handleSaved}
                            group={editingGroup}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
