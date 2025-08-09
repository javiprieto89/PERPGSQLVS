class GraphQLClient {
    constructor() {
        this.endpoint = import.meta.env.VITE_GRAPHQL_API;
    }

    async query(query, variables = {}, fetchOptions = {}) {
        const token = sessionStorage.getItem("token");

        console.log("GraphQL Request:", {
            endpoint: this.endpoint,
            query: query.substring(0, 100) + "...",
            variables,
            hasToken: !!token
        });

        try {
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
                ...fetchOptions,
            });

            console.log("Response Status:", response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("HTTP Error Response:", errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const responseText = await response.text();
                console.error("Invalid Content-Type:", contentType);
                throw new Error(`Expected JSON but got ${contentType}. Response: ${responseText.substring(0, 500)}...`);
            }

            const responseText = await response.text();
            let result;

            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                throw new Error(`Failed to parse JSON: ${parseError.message}`);
            }

            console.log("GraphQL Response:", result);

            if (result.errors && result.errors.length > 0) {
                console.error("GraphQL Errors:", result.errors);
                const error = new Error(`GraphQL Error: ${result.errors[0].message}`);
                error.response = result;
                throw error;
            }

            return result.data;

        } catch (error) {
            console.error("GraphQL Client Error:", error);

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error(`No se pudo conectar al servidor GraphQL en ${this.endpoint}. Verifica que el servidor esté ejecutándose.`);
            }

            throw error;
        }
    }

    async mutation(mutation, variables = {}, fetchOptions = {}) {
        return this.query(mutation, variables, fetchOptions);
    }

    async checkConnection() {
        try {
            const response = await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query { __typename }`
                }),
            });

            console.log("Connection check:", response.status);
            return response.status === 200;
        } catch (error) {
            console.error("Connection check failed:", error);
            return false;
        }
    }
}

export const graphqlClient = new GraphQLClient();
