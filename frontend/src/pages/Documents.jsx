// frontend/src/pages/Documents.jsx
// TODO: recreate Graphql query to reduce the amount of queries
import { useEffect, useState } from "react";
import {
  branchOperations,
  companyOperations,
  documentOperations,
  sysDocumentTypeOperations,
} from "~/graphql/operations";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import DocumentCreate from "./DocumentCreate";

export default function Documents() {
  const [allDocs, setAllDocs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-documents") {
        loadDocuments();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const [docs, comps, brs, types] = await Promise.all([
        documentOperations.getAllDocuments(),
        companyOperations.getAllCompanies(),
        branchOperations.getAllBranches(),
        sysDocumentTypeOperations.getAllSysdocumenttypes(),
      ]);
      setAllDocs(docs);
      setDocuments(docs);
      setCompanies(comps);
      setBranches(brs);
      setDocumentTypes(types);
    } catch (err) {
      console.error("Error cargando documentos:", err);
      setError(err.message);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <DocumentCreate
          companies={companies}
          branches={branches}
          documentTypes={documentTypes}
          onSave={() => {
            popup.opener.postMessage("reload-documents", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Documento"
    );
  };

  const handleFilterChange = (filtered) => setDocuments(filtered);

  const handleEdit = (doc) => {
    openReactWindow(
      (popup) => (
        <DocumentCreate
          document={doc}
          companies={companies}
          branches={branches}
          documentTypes={documentTypes}
          onSave={() => {
            popup.opener.postMessage("reload-documents", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Documento"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar documento?")) return;
    try {
      await documentOperations.deleteDocument(id);
      loadDocuments();
    } catch (err) {
      alert("Error al borrar documento: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadDocuments}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nuevo Documento
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="documents"
            data={allDocs}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const comp = companies.find((c) => c.CompanyID === doc.CompanyID);
            const br = branches.find((b) => b.BranchID === doc.BranchID);
            const type = documentTypes.find(
              (t) => t.DocumentTypeID === doc.DocumentTypeID
            );
            return (
              <div key={doc.DocumentID} className=" rounded shadow p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {doc.Description}
                </h3>
                <p className="text-sm">
                  {type ? type.Name : doc.DocumentTypeID}
                </p>
                <p className="text-sm">
                  {comp ? comp.Name : doc.CompanyID} -{" "}
                  {br ? br.Name : doc.BranchID}
                </p>
                <p className="text-sm mb-1">
                  Número: {doc.DocumentNumber || ""} PV: {doc.PointOfSale || ""}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="mt-2 px-3 py-1  text-sm rounded hover:"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(doc.DocumentID)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
