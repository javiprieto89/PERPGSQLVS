import { graphqlClient } from "~/graphql/graphql-client";

import {
  CreateDocumentDocument,
  DeleteDocumentDocument,
  GetAllCommercialDocumentsDocument,
  GetDocumentTypesDocument,
  UpdateDocumentDocument,
  type CommercialDocumentsCreate,
  type CommercialDocumentsUpdate,
  type CreateDocumentMutation,
  type DeleteDocumentMutation,
  type GetAllCommercialDocumentsQuery,
  type GetDocumentTypesQuery,
  type UpdateDocumentMutation,
} from "~/graphql/_generated/graphql";

export const commercialDocumentOperations = {
  async getAllDocuments() {
    try {
      const data = await graphqlClient.query<GetAllCommercialDocumentsQuery>(
        GetAllCommercialDocumentsDocument
      );
      return data.allCommercialdocuments || [];
    } catch (error) {
      console.error("Error obteniendo documentos:", error);
      throw error;
    }
  },

  async getDocumentById(id: string) {
    try {
      // const data = await graphqlClient.query<GetCommercialDocumentByIdQuery>(
      //   GetCommercialDocumentByIdDocument,
      //   {
      //     id,
      //   }
      // );
      // return data.documentsById;
      console.log("Fetching document by ID - placeholder");
      return null;
    } catch (error) {
      console.error("Error obteniendo documento:", error);
      throw error;
    }
  },

  async getAllSysDocumentTypes() {
    try {
      const data = await graphqlClient.query<GetDocumentTypesQuery>(
        GetDocumentTypesDocument
      );
      return data.sysIdentityDocTypes;
    } catch (error) {
      console.error("Error obteniendo documento:", error);
      throw error;
    }
  },

  async createDocument(dataInput: CommercialDocumentsCreate) {
    try {
      const data = await graphqlClient.mutation<CreateDocumentMutation>(
        CreateDocumentDocument,
        {
          input: dataInput,
        }
      );
      return data.createDocument;
    } catch (error) {
      console.error("Error creando documento:", error);
      throw error;
    }
  },

  async updateDocument(id: string, dataInput: CommercialDocumentsUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateDocumentMutation>(
        UpdateDocumentDocument,
        {
          documentID: id,
          input: dataInput,
        }
      );
      return data.updateDocument;
    } catch (error) {
      console.error("Error actualizando documento:", error);
      throw error;
    }
  },

  async deleteDocument(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteDocumentMutation>(
        DeleteDocumentDocument,
        {
          documentID: id,
        }
      );
      return data.deleteDocument;
    } catch (error) {
      console.error("Error eliminando documento:", error);
      throw error;
    }
  },
};
