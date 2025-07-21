// frontend/src/utils/graphql/afipOperations.js

import { graphqlClient } from "./baseClient.js";

// Queries de AFIP
const AFIP_QUERIES = {
    ULTIMO_COMPROBANTE: `
        query UltimoComprobante($ptoVta: Int!, $cbteTipo: Int!) {
            ultimoComprobante(ptoVta: $ptoVta, cbteTipo: $cbteTipo)
        }
    `,

    INFORMACION_COMPROBANTE: `
        query InformacionComprobante($data: VoucherRequest!) {
            informacionComprobante(data: $data) {
                raw
            }
        }
    `,

    INFORMACION_RAPIDA_COMPROBANTE: `
        query InformacionRapidaComprobante($data: VoucherRequestBasic!) {
            informacionRapidaComprobante(data: $data) {
                raw
            }
        }
    `,

    TEST_CONNECTION: `
        query TestAfipConnection {
            testAfipConnection {
                success
                message
                details
            }
        }
    `,

    GET_TEST_DATA: `
        query GetTestVoucherData {
            getTestVoucherData
        }
    `,

    GET_ALTERNATIVE_TEST_DATA: `
        query GetAlternativeTestData {
            getAlternativeTestData
        }
    `
};

export const afipOperations = {
    /**
     * Obtiene el último número de comprobante autorizado
     */
    async getUltimoComprobante(ptoVta, cbteTipo) {
        try {
            const data = await graphqlClient.query(AFIP_QUERIES.ULTIMO_COMPROBANTE, {
                ptoVta: parseInt(ptoVta),
                cbteTipo: parseInt(cbteTipo)
            });
            return data.ultimoComprobante;
        } catch (error) {
            console.error("Error obteniendo último comprobante:", error);
            throw error;
        }
    },

    /**
     * Consulta información de un comprobante específico
     */
    async informacionComprobante(voucherData) {
        try {
            // Preparar datos asegurando tipos correctos - CUIT como string
            const data = {
                CbteModo: voucherData.CbteModo || "CAE",
                CuitEmisor: voucherData.CuitEmisor.toString(), // Mantener como string
                PtoVta: parseInt(voucherData.PtoVta),
                CbteTipo: parseInt(voucherData.CbteTipo),
                CbteNro: parseInt(voucherData.CbteNro),
                CbteFch: parseInt(voucherData.CbteFch),
                ImpTotal: parseFloat(voucherData.ImpTotal),
                CodAutorizacion: voucherData.CodAutorizacion,
                DocTipoReceptor: voucherData.DocTipoReceptor,
                DocNroReceptor: voucherData.DocNroReceptor,
            };

            const result = await graphqlClient.query(AFIP_QUERIES.INFORMACION_COMPROBANTE, {
                data
            });

            return result.informacionComprobante.raw;
        } catch (error) {
            console.error("Error consultando comprobante:", error);
            throw error;
        }
    },

    /**
     * Consulta información de un comprobante específico
     */
    async informacionRapidaComprobante(voucherData) {
        try {
            // Preparar datos asegurando tipos correctos - CUIT como string
            const data = {                                                
                CbteNro: parseInt(voucherData.CbteNro),  
                PtoVta: parseFloat(voucherData.PtoVta),                
                CbteTipo: parseInt(voucherData.CbteTipo),               
            };

            const result = await graphqlClient.query(AFIP_QUERIES.INFORMACION_RAPIDA_COMPROBANTE, {
                data
            });

            return result.informacionRapidaComprobante.raw;
        } catch (error) {
            console.error("Error consultando comprobante:", error);
            throw error;
        }
    },

    /**
     * Prueba la conexión con AFIP
     */
    async testConnection() {
        try {
            const data = await graphqlClient.query(AFIP_QUERIES.TEST_CONNECTION);
            return data.testAfipConnection;
        } catch (error) {
            console.error("Error probando conexión AFIP:", error);
            throw error;
        }
    },

    /**
     * Obtiene datos de prueba para consultas
     */
    async getTestVoucherData() {
        try {
            const data = await graphqlClient.query(AFIP_QUERIES.GET_TEST_DATA);
            return JSON.parse(data.getTestVoucherData);
        } catch (error) {
            console.error("Error obteniendo datos de prueba:", error);
            throw error;
        }
    },

    /**
     * Obtiene datos alternativos de prueba (Factura B)
     */
    async getAlternativeTestData() {
        try {
            const data = await graphqlClient.query(AFIP_QUERIES.GET_ALTERNATIVE_TEST_DATA);
            return JSON.parse(data.getAlternativeTestData);
        } catch (error) {
            console.error("Error obteniendo datos alternativos:", error);
            throw error;
        }
    }
};