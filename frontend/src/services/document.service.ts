import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CommercialDocumentsCreate,
  CommercialDocumentsInDb,
  CommercialDocumentsUpdate,
  SysDocTypesInDb,
  SysDocumentTypesInDb,
} from "~/graphql/_generated/graphql";

export const documentOperations = {
  async getAllDocuments(): Promise<CommercialDocumentsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_DOCUMENTS);
      return data.allDocuments || [];
    } catch (error) {
      console.error("Error obteniendo documentos:", error);
      throw error;
    }
  },

  async getDocumentById(id: string): Promise<CommercialDocumentsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_DOCUMENT_BY_ID, {
        id,
      });
      return data.documentsById;
    } catch (error) {
      console.error("Error obteniendo documento:", error);
      throw error;
    }
  },

  async createDocument(
    dataInput: CommercialDocumentsCreate
  ): Promise<CommercialDocumentsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_DOCUMENT, {
        input: dataInput,
      });
      return data.createDocument;
    } catch (error) {
      console.error("Error creando documento:", error);
      throw error;
    }
  },

  async updateDocument(
    id: string,
    dataInput: CommercialDocumentsUpdate
  ): Promise<CommercialDocumentsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_DOCUMENT, {
        documentID: id,
        input: dataInput,
      });
      return data.updateDocument;
    } catch (error) {
      console.error("Error actualizando documento:", error);
      throw error;
    }
  },

  async deleteDocument(id: string): Promise<CommercialDocumentsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_DOCUMENT, {
        documentID: id,
      });
      return data.deleteDocument;
    } catch (error) {
      console.error("Error eliminando documento:", error);
      throw error;
    }
  },
};

export const sysDocTypeOperations = {
  async getAllSysdoctypes(): Promise<SysDocTypesInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_SYSDOC_TYPES);
    return data.allSysdoctypes || [];
  },
};

export const sysDocumentTypeOperations = {
  async getAllSysdocumenttypes(): Promise<SysDocumentTypesInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_SYSDOCUMENT_TYPES);
    return data.allSysdocumenttypes || [];
  },
};
