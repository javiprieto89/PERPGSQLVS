const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/graphql/";

class GraphQLClient {
    constructor() {
        this.endpoint = GRAPHQL_ENDPOINT;
    }

    async query(query, variables = {}) {
        const token = sessionStorage.getItem("token");

        const response = await fetch(this.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const result = await response.json();

        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        return result.data;
    }

    async mutation(mutation, variables = {}) {
        return this.query(mutation, variables);
    }
}

export const graphqlClient = new GraphQLClient();

export const QUERIES = {
    GET_CLIENTS: `
    query GetClients($companyID: Int!) {
      clients(companyID: $companyID) {
        clientID
        documentNumber
        firstName
        lastName
        phone
        email
        address
        city
        postalCode
        isActive
        documentTypeID
        countryID
        provinceID
        priceListID
      }
    }
  `,

    GET_CLIENTS_COUNT: `
    query GetClientsCount($companyID: Int!) {
      clientsCount(companyID: $companyID)
    }
  `,

    GET_DASHBOARD_STATS: `
    query GetDashboardStats($filters: DashboardFilters!) {
      dashboardStats(filters: $filters) {
        totalItems
        activeItems
        lowStockItems
        totalClients
        activeClients
        pendingOrders
        monthlySales
        totalOrders
        completedOrders
      }
    }
  `,

    GET_DOCUMENT_TYPES: `
    query GetDocumentTypes {
      documenttypes {
        documentTypeID
        name
        description
      }
    }
  `,

    GET_COUNTRIES: `
    query GetCountries {
      countries {
        countryID
        name
      }
    }
  `,

    GET_PROVINCES: `
    query GetProvinces {
      provinces {
        provinceID
        name
        countryID
      }
    }
  `,

    GET_PRICE_LISTS: `
    query GetPriceLists($companyID: Int!) {
      pricelists(companyID: $companyID) {
        priceListID
        name
        description
      }
    }
  `,

    GET_SUPPLIERS: `
    query GetSuppliers($companyID: Int!) {
      suppliers(companyID: $companyID) {
        supplierID
        name
        phone
        email
        address
        isActive
      }
    }
  `
};

export const MUTATIONS = {
    CREATE_CLIENT: `
    mutation CreateClient($input: ClientsCreate!) {
      createClient(data: $input) {
        clientID
        firstName
        lastName
        email
        phone
      }
    }
  `,

    UPDATE_CLIENT: `
    mutation UpdateClient($clientID: Int!, $input: ClientsCreate!) {
      updateClient(clientID: $clientID, data: $input) {
        clientID
        firstName
        lastName
        email
        phone
      }
    }
  `,

    DELETE_CLIENT: `
    mutation DeleteClient($clientID: Int!) {
      deleteClient(clientID: $clientID)
    }
  `
};