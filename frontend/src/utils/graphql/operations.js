// frontend/src/utils/graphql/operations.js
import { graphqlClient } from "./baseClient.js";
import { QUERIES } from "./queries.js";
import { MUTATIONS } from "./mutations.js";
import { clientHelpers, supplierHelpers, orderHelpers } from "./helpers.js";
// ===== FUNCIONES DE CLIENTES =====
export const clientOperations = {
    // Obtener todos los clientes
    async getAllClients() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CLIENTS);
            return data.allClients || [];
        } catch (error) {
            console.error("Error obteniendo clientes:", error);
            throw error;
        }
    },

    // Obtener cliente por ID
    async getClientById(clientId) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CLIENT_BY_ID, { id: clientId });
            return data.clientsById;
        } catch (error) {
            console.error("Error obteniendo cliente:", error);
            throw error;
        }
    },

    // Crear nuevo cliente
    async createClient(clientData) {
        try {
            // Validar datos
            const errors = clientHelpers.validateClientData(clientData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }

            // Preparar datos
            const preparedData = clientHelpers.prepareClientData(clientData);

            // Crear cliente
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CLIENT, {
                input: preparedData
            });

            return data.createClient;
        } catch (error) {
            console.error("Error creando cliente:", error);
            throw error;
        }
    },

    // Actualizar cliente
    async updateClient(clientId, clientData) {
        try {
            // Validar datos
            const errors = clientHelpers.validateClientData(clientData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }

            // Preparar datos
            const preparedData = clientHelpers.prepareClientData(clientData);

            // Actualizar cliente
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CLIENT, {
                clientID: clientId,
                input: preparedData
            });

            return data.updateClient;
        } catch (error) {
            console.error("Error actualizando cliente:", error);
            throw error;
        }
    },

    // Eliminar cliente
    async deleteClient(clientId) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CLIENT, {
                clientID: clientId
            });

            return data.deleteClient;
        } catch (error) {
            console.error("Error eliminando cliente:", error);
            throw error;
        }
    },

    // Cambiar estado activo/inactivo
    async toggleClientStatus(clientId, isActive) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.TOGGLE_CLIENT_STATUS, {
                clientID: clientId,
                isActive: isActive
            });

            return data.updateClient;
        } catch (error) {
            console.error("Error cambiando estado del cliente:", error);
            throw error;
        }
    },

    // Obtener datos para formulario de cliente
    async getClientFormData() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CLIENT_FORM_DATA);
            return {
                documentTypes: data.docTypes || [],
                countries: data.countries || [],
                provinces: data.provinces || [],
                priceLists: data.priceLists?.filter(pl => pl.IsActive) || [],
                vendors: data.vendors?.filter(v => v.IsActive) || []
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario:", error);
            throw error;
        }
    }
};

// ===== FUNCIONES DE PROVEEDORES =====
export const supplierOperations = {
    async getAllSuppliers() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_SUPPLIERS);
            return data.allSuppliers || [];
        } catch (error) {
            console.error("Error obteniendo proveedores:", error);
            throw error;
        }
    },

    async createSupplier(supplierData) {
        try {
            const errors = supplierHelpers.validateSupplierData(supplierData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }
            const prepared = supplierHelpers.prepareSupplierData(supplierData);
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_SUPPLIER, {
                input: prepared
            });
            return data.createSupplier;
        } catch (error) {
            console.error("Error creando proveedor:", error);
            throw error;
        }
    },

    async updateSupplier(id, supplierData) {
        try {
            const errors = supplierHelpers.validateSupplierData(supplierData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }
            const prepared = supplierHelpers.prepareSupplierData(supplierData);
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_SUPPLIER, {
                supplierID: id,
                input: prepared
            });
            return data.updateSupplier;
        } catch (error) {
            console.error("Error actualizando proveedor:", error);
            throw error;
        }
    },

    async deleteSupplier(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_SUPPLIER, {
                supplierID: id
            });
            return data.deleteSupplier;
        } catch (error) {
            console.error("Error eliminando proveedor:", error);
            throw error;
        }
    },

    async toggleSupplierStatus(id, isActive) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.TOGGLE_SUPPLIER_STATUS, {
                supplierID: id,
                isActive
            });
            return data.updateSupplier;
        } catch (error) {
            console.error("Error cambiando estado del proveedor:", error);
            throw error;
        }
    },

    // Obtener datos para formulario de proveedor
    async getSupplierFormData() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_SUPPLIER_FORM_DATA);
            return {
                documentTypes: data.docTypes || [],
                countries: data.countries || [],
                provinces: data.provinces || []
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario:", error);
            throw error;
        }
    }
};

export const vendorOperations = {
    async getAllVendors() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_VENDORS);
            return data.allVendors || [];
        } catch (error) {
            console.error("Error obteniendo vendedores:", error);
            throw error;
        }
    }
};

export const userOperations = {
    async getAllUsers() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_USERS);
            return data.allUsers || [];
        } catch (error) {
            console.error("Error obteniendo usuarios:", error);
            throw error;
        }
    },

    async getUserById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_USER_BY_ID, { id });
            return data.usersById;
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            throw error;
        }
    },

    async createUser(userData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_USER_RECORD, { input: userData });
            return data.createUserRecord;
        } catch (error) {
            console.error("Error creando usuario:", error);
            throw error;
        }
    },

    async updateUser(id, userData) {
        try {
            // El esquema UserUpdate exige incluir el ID dentro del input
            const data = await graphqlClient.mutation(
                MUTATIONS.UPDATE_USER_RECORD,
                { userID: id, input: { UserID: id, ...userData } }
            );
            return data.updateUserRecord;
        } catch (error) {
            console.error("Error actualizando usuario:", error);
            throw error;
        }
    },

    async deleteUser(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_USER_RECORD, { userID: id });
            return data.deleteUserRecord;
        } catch (error) {
            console.error("Error eliminando usuario:", error);
            throw error;
        }
    }
};

export const roleOperations = {
    async getAllRoles() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ROLES);
            return data.allRoles || [];
        } catch (error) {
            console.error("Error obteniendo roles:", error);
            throw error;
        }
    },

    async getRoleById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ROLE_BY_ID, { id });
            return data.rolesById;
        } catch (error) {
            console.error("Error obteniendo rol:", error);
            throw error;
        }
    },

    async createRole(roleData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ROLE, { input: roleData });
            return data.createRole;
        } catch (error) {
            console.error("Error creando rol:", error);
            throw error;
        }
    },

    async updateRole(id, roleData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ROLE, { roleID: id, input: roleData });
            return data.updateRole;
        } catch (error) {
            console.error("Error actualizando rol:", error);
            throw error;
        }
    },

    async deleteRole(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ROLE, { roleID: id });
            return data.deleteRole;
        } catch (error) {
            console.error("Error eliminando rol:", error);
            throw error;
        }
    }
};

export const userAccessOperations = {
    async getAllUserAccess() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_USERACCESS);
            return data.allUseraccess || [];
        } catch (error) {
            console.error("Error obteniendo roles y usuarios:", error);
            throw error;
        }
    },

    async getById(userID, companyID, branchID, roleID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_USERACCESS_BY_ID, {
                userID,
                companyID,
                branchID,
                roleID
            });
            return data.useraccessById;
        } catch (error) {
            console.error("Error obteniendo asignación:", error);
            throw error;
        }
    },

    async create(data) {
        try {
            const res = await graphqlClient.mutation(MUTATIONS.CREATE_USERACCESS, { input: data });
            return res.createUseraccess;
        } catch (error) {
            console.error("Error creando asignación:", error);
            throw error;
        }
    },

    async update(oldKeys, newData) {
        try {
            const res = await graphqlClient.mutation(MUTATIONS.UPDATE_USERACCESS, {
                ...oldKeys,
                newData
            });
            return res.updateUseraccess;
        } catch (error) {
            console.error("Error actualizando asignación:", error);
            throw error;
        }
    },

    async delete(keys) {
        try {
            const res = await graphqlClient.mutation(MUTATIONS.DELETE_USERACCESS, keys);
            return res.deleteUseraccess;
        } catch (error) {
            console.error("Error eliminando asignación:", error);
            throw error;
        }
    }
};




// ===== FUNCIONES DE MARCAS =====
export const brandOperations = {
    async getAllBrands() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_BRANDS);
            return data.allBrands || [];
        } catch (error) {
            console.error("Error obteniendo marcas:", error);
            throw error;
        }
    },

    async getBrandById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_BRAND_BY_ID, { id });
            return data.brandsById;
        } catch (error) {
            console.error("Error obteniendo marca:", error);
            throw error;
        }
    },

    async createBrand(brandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_BRAND, {
                input: brandData
            });
            return data.createBrand;
        } catch (error) {
            console.error("Error creando marca:", error);
            throw error;
        }
    },

    async updateBrand(id, brandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_BRAND, {
                brandID: id,
                input: brandData
            });
            return data.updateBrand;
        } catch (error) {
            console.error("Error actualizando marca:", error);
            throw error;
        }
    },

    async deleteBrand(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_BRAND, { brandID: id });
            return data.deleteBrand;
        } catch (error) {
            console.error("Error eliminando marca:", error);
            throw error;
        }
    }
};

export const carBrandOperations = {
    async getAllCarBrands() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CARBRANDS);
            return data.allCarbrands || [];
        } catch (error) {
            console.error("Error obteniendo marcas de auto:", error);
            throw error;
        }
    },

    async getCarBrandById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CARBRAND_BY_ID, { id });
            return data.carbrandsById;
        } catch (error) {
            console.error("Error obteniendo marca de auto:", error);
            throw error;
        }
    },

    async createCarBrand(carBrandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CARBRAND, {
                input: carBrandData
            });
            return data.createCarbrand;
        } catch (error) {
            console.error("Error creando marca de auto:", error);
            throw error;
        }
    },

    async updateCarBrand(id, carBrandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CARBRAND, {
                carBrandID: id,
                input: carBrandData
            });
            return data.updateCarbrand;
        } catch (error) {
            console.error("Error actualizando marca de auto:", error);
            throw error;
        }
    },

    async deleteCarBrand(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CARBRAND, {
                carBrandID: id
            });
            return data.deleteCarbrand;
        } catch (error) {
            console.error("Error eliminando marca de auto:", error);
            throw error;
        }
    }
};

export const carModelOperations = {
    async getAllCarModels() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CARMODELS);
            return data.allCarmodels || [];
        } catch (error) {
            console.error("Error obteniendo modelos de auto:", error);
            throw error;
        }
    },

    async getCarModelById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CARMODEL_BY_ID, { id });
            return data.carmodelsById;
        } catch (error) {
            console.error("Error obteniendo modelo de auto:", error);
            throw error;
        }
    },

    async getCarModelsByBrand(brandID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CARMODELS_BY_BRAND, { brandID: parseInt(brandID) });
            return data.carmodelsByBrand || [];
        } catch (error) {
            console.error("Error obteniendo modelos de auto por marca:", error);
            throw error;
        }
    },

    async createCarModel(carmodelData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CARMODEL, {
                input: carmodelData
            });
            return data.createCarmodel;
        } catch (error) {
            console.error("Error creando modelo de auto:", error);
            throw error;
        }
    },

    async updateCarModel(id, carmodelData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CARMODEL, {
                carModelID: id,
                input: carmodelData
            });
            return data.updateCarmodel;
        } catch (error) {
            console.error("Error actualizando modelo de auto:", error);
            throw error;
        }
    },

    async deleteCarModel(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CARMODEL, {
                carModelID: id
            });
            return data.deleteCarmodel;
        } catch (error) {
            console.error("Error eliminando modelo de auto:", error);
            throw error;
        }
    }
};

function sanitizeCarPayload(data) {
    const allowed = [
        'CarModelID',
        'ClientID',
        'LicensePlate',
        'Year',
        'LastServiceMileage',
        'IsDebtor',
        'DiscountID'
    ];
    const payload = {};
    for (const field of allowed) {
        if (data[field] !== undefined) {
            payload[field] = data[field];
        }
    }
    return payload;
}

export const carOperations = {
    async getAllCars() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CARS);
            return data.allCars || [];
        } catch (error) {
            console.error("Error obteniendo autos:", error);
            throw error;
        }
    },

    async getCarFormData() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CAR_FORM_DATA);
            return {
                carBrands: data.carBrands || [],
                carModels: data.carModels || [],
                clients: data.clients || [],
                discounts: data.discounts || []
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario de autos:", error);
            throw error;
        }
    },

    async getCarById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CAR_BY_ID, { id });
            return data.carsById;
        } catch (error) {
            console.error("Error obteniendo auto:", error);
            throw error;
        }
    },

    async createCar(carData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CAR, { input: sanitizeCarPayload(carData) });
            return data.createCar;
        } catch (error) {
            console.error("Error creando auto:", error);
            throw error;
        }
    },

    async updateCar(id, carData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CAR, {
                carID: id,
                input: sanitizeCarPayload(carData)
            });
            return data.updateCar;
        } catch (error) {
            console.error("Error actualizando auto:", error);
            throw error;
        }
    },

    async deleteCar(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CAR, { carID: id });
            return data.deleteCar;
        } catch (error) {
            console.error("Error eliminando auto:", error);
            throw error;
        }
    }
};

export const discountOperations = {
    async getAllDiscounts() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_DISCOUNTS);
            return data.allDiscounts || [];
        } catch (error) {
            console.error("Error obteniendo descuentos:", error);
            throw error;
        }
    }
};

export const saleConditionOperations = {
    async getAllSaleConditions() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_SALECONDITIONS);
            return data.allSaleconditions || [];
        } catch (error) {
            console.error("Error obteniendo condiciones de venta:", error);
            throw error;
        }
    },

    async getSaleConditionById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_SALECONDITION_BY_ID, { id });
            return data.saleconditionsById;
        } catch (error) {
            console.error("Error obteniendo condición de venta:", error);
            throw error;
        }
    },

    async createSaleCondition(scData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_SALECONDITION, {
                input: scData
            });
            return data.createSalecondition;
        } catch (error) {
            console.error("Error creando condición de venta:", error);
            throw error;
        }
    },

    async updateSaleCondition(id, scData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_SALECONDITION, {
                saleConditionID: id,
                input: scData
            });
            return data.updateSalecondition;
        } catch (error) {
            console.error("Error actualizando condición de venta:", error);
            throw error;
        }
    },

    async deleteSaleCondition(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_SALECONDITION, {
                saleConditionID: id
            });
            return data.deleteSalecondition;
        } catch (error) {
            console.error("Error eliminando condición de venta:", error);
            throw error;
        }
    }
};

export const creditCardGroupOperations = {
    async getAllGroups() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_CREDITCARDGROUPS);
        return data.allCreditcardgroups || [];
    },

    async getGroupById(id) {
        const data = await graphqlClient.query(QUERIES.GET_CREDITCARDGROUP_BY_ID, { id });
        return data.creditcardgroupById;
    },

    async createGroup(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_CREDITCARDGROUP, {
            input
        });
        return data.createCreditcardgroup;
    },

    async updateGroup(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CREDITCARDGROUP, {
            id,
            input
        });
        return data.updateCreditcardgroup;
    },

    async deleteGroup(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_CREDITCARDGROUP, { id });
        return data.deleteCreditcardgroup;
    }
};

export const creditCardOperations = {
    async getAllCards() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_CREDITCARDS);
        return data.allCreditcards || [];
    },

    async getCardById(id) {
        const data = await graphqlClient.query(QUERIES.GET_CREDITCARD_BY_ID, { id });
        return data.creditcardById;
    },

    async createCard(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_CREDITCARD, { input });
        return data.createCreditcard;
    },

    async updateCard(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CREDITCARD, { id, input });
        return data.updateCreditcard;
    },

    async deleteCard(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_CREDITCARD, { id });
        return data.deleteCreditcard;
    }
};

export const itemCategoryOperations = {
    async getAllItemCategories() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMCATEGORIES);
            return data.allItemcategories || [];
        } catch (error) {
            console.error("Error obteniendo categorías:", error);
            throw error;
        }
    },

    async getItemCategoryById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEMCATEGORY_BY_ID, { id });
            return data.itemcategoriesById;
        } catch (error) {
            console.error("Error obteniendo categoría:", error);
            throw error;
        }
    },

    async createItemCategory(categoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEMCATEGORY, {
                input: categoryData
            });
            return data.createItemcategory;
        } catch (error) {
            console.error("Error creando categoría:", error);
            throw error;
        }
    },

    async updateItemCategory(id, categoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEMCATEGORY, {
                categoryID: id,
                input: categoryData
            });
            return data.updateItemcategory;
        } catch (error) {
            console.error("Error actualizando categoría:", error);
            throw error;
        }
    },

    async deleteItemCategory(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEMCATEGORY, {
                categoryID: id
            });
            return data.deleteItemcategory;
        } catch (error) {
            console.error("Error eliminando categoría:", error);
            throw error;
        }
    }
};

export const itemSubcategoryOperations = {
    async getAllItemSubcategories() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMSUBCATEGORIES);
            return data.allItemsubcategories || [];
        } catch (error) {
            console.error("Error obteniendo subcategorías:", error);
            throw error;
        }
    },

    async getItemSubcategoryById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEMSUBCATEGORY_BY_ID, { id });
            return data.itemsubcategoriesById;
        } catch (error) {
            console.error("Error obteniendo subcategoría:", error);
            throw error;
        }
    },

    // NUEVA FUNCIÓN AGREGADA
    async getItemSubcategoriesByCategory(categoryID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEMSUBCATEGORIES_BY_CATEGORY, {
                categoryID: parseInt(categoryID)
            });
            return data.itemsubcategoriesByCategory || [];
        } catch (error) {
            console.error("Error obteniendo subcategorías por categoría:", error);
            throw error;
        }
    },

    async createItemSubcategory(subcategoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEMSUBCATEGORY, {
                input: subcategoryData
            });
            return data.createItemsubcategory;
        } catch (error) {
            console.error("Error creando subcategoría:", error);
            throw error;
        }
    },

    async updateItemSubcategory(id, subcategoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEMSUBCATEGORY, {
                subcategoryID: id,
                input: subcategoryData
            });
            return data.updateItemsubcategory;
        } catch (error) {
            console.error("Error actualizando subcategoría:", error);
            throw error;
        }
    },

    async deleteItemSubcategory(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEMSUBCATEGORY, {
                subcategoryID: id
            });
            return data.deleteItemsubcategory;
        } catch (error) {
            console.error("Error eliminando subcategoría:", error);
            throw error;
        }
    }
};

export const itemOperations = {
    async getAllItems() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMS);
            return data.allItems || [];
        } catch (error) {
            console.error("Error obteniendo ítems:", error);
            throw error;
        }
    },

    async getItemById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEM_BY_ID, { id });
            return data.itemsById;
        } catch (error) {
            console.error("Error obteniendo ítem:", error);
            throw error;
        }
    },

    async createItem(itemData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEM, {
                input: itemData
            });
            return data.createItem;
        } catch (error) {
            console.error("Error creando ítem:", error);
            throw error;
        }
    },

    async updateItem(id, itemData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEM, {
                itemID: id,
                input: itemData
            });
            return data.updateItem;
        } catch (error) {
            console.error("Error actualizando ítem:", error);
            throw error;
        }
    },

    async deleteItem(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEM, {
                itemID: id
            });
            return data.deleteItem;
        } catch (error) {
            console.error("Error eliminando ítem:", error);
            throw error;
        }
    },

    async searchItems(search = "", page = 1, limit = 50) {
        try {
            const variables = {
                filters: search ? { search } : null,
                pagination: { page, limit },
            };
            const data = await graphqlClient.query(QUERIES.SEARCH_ITEMS, variables);
            return data.searchItems?.items || [];
        } catch (error) {
            console.error("Error buscando ítems:", error);
            throw error;
        }
    }
};

// NUEVA OPERACIÓN AGREGADA
export const provinceOperations = {
    async getAllProvinces() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_PROVINCES);
            return data.allProvinces || [];
        } catch (error) {
            console.error("Error obteniendo provincias:", error);
            throw error;
        }
    },

    async getProvincesByCountry(countryID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_PROVINCES_BY_COUNTRY, {
                countryID: parseInt(countryID)
            });
            return data.provincesByCountry || [];
        } catch (error) {
            console.error("Error obteniendo provincias por país:", error);
            throw error;
        }
    }
};

export const pricelistOperations = {
    async getAllPricelists() {
        const data = await graphqlClient.query(QUERIES.GET_PRICE_LISTS);
        return data.allPricelists || [];
    },
    async getPricelistById(id) {
        const data = await graphqlClient.query(QUERIES.GET_PRICELIST_BY_ID, { id });
        return data.pricelistsById;
    },
    async createPricelist(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_PRICELIST, { input });
        return data.createPricelist;
    },
    async updatePricelist(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_PRICELIST, { pricelistID: id, input });
        return data.updatePricelist;
    },
    async deletePricelist(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_PRICELIST, { pricelistID: id });
        return data.deletePricelist;
    }
};

export const warehouseOperations = {
    async getAllWarehouses() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_WAREHOUSES);
        return data.allWarehouses || [];
    },
    async getWarehouseById(id) {
        const data = await graphqlClient.query(QUERIES.GET_WAREHOUSE_BY_ID, { id });
        return data.warehousesById;
    },
    async createWarehouse(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_WAREHOUSE, { input });
        return data.createWarehouse;
    },
    async updateWarehouse(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_WAREHOUSE, { warehouseID: id, input });
        return data.updateWarehouse;
    },
    async deleteWarehouse(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_WAREHOUSE, { warehouseID: id });
        return data.deleteWarehouse;
    }
};

export const serviceTypeOperations = {
    async getAllServicetypes() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_SERVICETYPES);
        return data.allServicetypes || [];
    },
    async getServicetypeById(id) {
        const data = await graphqlClient.query(QUERIES.GET_SERVICETYPE_BY_ID, { id });
        return data.servicetypesById;
    }
};

export const orderStatusOperations = {
    async getAllOrderstatus() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_ORDERSTATUS);
        return data.allOrderstatus || [];
    }
};

// ===== FUNCIONES DE ÓRDENES - NUEVAS Y COMPLETAS =====
export const orderOperations = {
    async getAllOrders() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ORDERS);
            return data.allOrders || [];
        } catch (error) {
            console.error("Error obteniendo órdenes:", error);
            throw error;
        }
    },

    async getOrderById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ORDER_BY_ID, { id });
            return data.ordersById;
        } catch (error) {
            console.error("Error obteniendo orden:", error);
            throw error;
        }
    },

    async createOrder(orderData) {
        try {
            // Validar datos requeridos
            const errors = orderHelpers.validateOrderData(orderData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }

            // Preparar datos
            const preparedData = orderHelpers.prepareOrderData(orderData);

            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ORDER, {
                input: preparedData
            });

            return data.createOrder;
        } catch (error) {
            console.error("Error creando orden:", error);
            throw error;
        }
    },

    async updateOrder(id, orderData) {
        try {
            // Preparar datos para actualización (solo campos no nulos)
            const preparedData = {};
            
            if (orderData.CompanyID) preparedData.CompanyID = parseInt(orderData.CompanyID);
            if (orderData.BranchID) preparedData.BranchID = parseInt(orderData.BranchID);
            if (orderData.Date_) preparedData.Date_ = new Date(orderData.Date_);
            if (orderData.ClientID) preparedData.ClientID = parseInt(orderData.ClientID);
            if (orderData.CarID) preparedData.CarID = parseInt(orderData.CarID);
            if (orderData.IsService !== undefined) preparedData.IsService = Boolean(orderData.IsService);
            if (orderData.ServiceTypeID) preparedData.ServiceTypeID = parseInt(orderData.ServiceTypeID);
            if (orderData.Mileage) preparedData.Mileage = parseInt(orderData.Mileage);
            if (orderData.NextServiceMileage) preparedData.NextServiceMileage = parseInt(orderData.NextServiceMileage);
            if (orderData.Notes !== undefined) preparedData.Notes = orderData.Notes?.trim() || null;
            if (orderData.SaleConditionID) preparedData.SaleConditionID = parseInt(orderData.SaleConditionID);
            if (orderData.DiscountID) preparedData.DiscountID = parseInt(orderData.DiscountID);
            if (orderData.Subtotal !== undefined) preparedData.Subtotal = parseFloat(orderData.Subtotal);
            if (orderData.Total !== undefined) preparedData.Total = parseFloat(orderData.Total);
            if (orderData.VAT !== undefined) preparedData.VAT = parseFloat(orderData.VAT);
            if (orderData.UserID) preparedData.UserID = parseInt(orderData.UserID);
            if (orderData.DocumentID) preparedData.DocumentID = parseInt(orderData.DocumentID);
            if (orderData.OrderStatusID) preparedData.OrderStatusID = parseInt(orderData.OrderStatusID);
            if (orderData.PriceListID) preparedData.PriceListID = parseInt(orderData.PriceListID);
            if (orderData.WarehouseID) preparedData.WarehouseID = parseInt(orderData.WarehouseID);

            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ORDER, {
                orderID: id,
                input: preparedData
            });

            return data.updateOrder;
        } catch (error) {
            console.error("Error actualizando orden:", error);
            throw error;
        }
    },

    async deleteOrder(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ORDER, {
                orderID: id
            });

            return data.deleteOrder;
        } catch (error) {
            console.error("Error eliminando orden:", error);
            throw error;
        }
    },

    async finalizeOrder(orderID, sessionID) {
        try {
            const data = await graphqlClient.mutation(
                MUTATIONS.FINALIZE_ORDER,
                { orderID, sessionID }
            );
            return data.finalizeOrder;
        } catch (error) {
            console.error("Error finalizando orden:", error);
            throw error;
        }
    },

    async cancelOrderEditing(orderID, sessionID) {
        try {
            await graphqlClient.mutation(MUTATIONS.CANCEL_ORDER_EDITING, {
                orderID,
                sessionID,
            });
            return true;
        } catch (error) {
            console.error("Error cancelando edición de orden:", error);
            throw error;
        }
    },

    // Función auxiliar para obtener datos del formulario de órdenes
    async getOrderFormData() {
        try {
            const [
                clients,
                cars,
                saleConditions,
                discounts,
                priceLists,
                warehouses,
                serviceTypes,
                orderStatus
            ] = await Promise.all([
                clientOperations.getAllClients(),
                carOperations.getAllCars(),
                saleConditionOperations.getAllSaleConditions(),
                discountOperations.getAllDiscounts(),
                pricelistOperations.getAllPricelists(),
                warehouseOperations.getAllWarehouses(),
                serviceTypeOperations.getAllServicetypes(),
                orderStatusOperations.getAllOrderstatus()
            ]);

            return {
                clients: clients.filter(c => c.IsActive),
                cars,
                saleConditions: saleConditions.filter(sc => sc.IsActive),
                discounts,
                priceLists: priceLists.filter(pl => pl.IsActive),
                warehouses,
                serviceTypes,
                orderStatus
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario de órdenes:", error);
            throw error;
        }
    }
};

// ===== FUNCIONES PARA ITEMS TEMPORALES =====
export const tempOrderOperations = {
    async createTempItem(itemData) {
        try {
            const data = await graphqlClient.mutation(
                MUTATIONS.CREATE_TEMPORDERDETAIL,
                { input: itemData }
            );
            return data.createTemporderdetail;
        } catch (error) {
            console.error("Error creando item temporal:", error);
            throw error;
        }
    },

    async updateTempItem(sessionID, itemID, itemData, orderDetailID = null) {
        try {
            const data = await graphqlClient.mutation(
                MUTATIONS.UPDATE_TEMPORDERDETAIL,
                { sessionID, itemID, orderDetailID, input: itemData }
            );
            return data.updateTemporderdetail;
        } catch (error) {
            console.error("Error actualizando item temporal:", error);
            throw error;
        }
    },

    async deleteTempItem(sessionID, itemID, orderDetailID = null) {
        try {
            await graphqlClient.mutation(MUTATIONS.DELETE_TEMPORDERDETAIL, {
                sessionID,
                itemID,
                orderDetailID,
            });
            return true;
        } catch (error) {
            console.error("Error eliminando item temporal:", error);
            throw error;
        }
    },

    async loadOrderForEditing(orderID, userID, companyID, branchID) {
        try {
            const data = await graphqlClient.mutation(
                MUTATIONS.LOAD_ORDER_FOR_EDITING,
                { orderID, userID, companyID, branchID }
            );
            return data.loadOrderForEditing;
        } catch (error) {
            console.error("Error cargando orden para edición:", error);
            throw error;
        }
    },

    async getTempItems(sessionID) {
        try {
            const data = await graphqlClient.query(
                QUERIES.GET_TEMP_ITEMS_BY_SESSION,
                { sessionID }
            );
            return data.temporderdetailsBySession || [];
        } catch (error) {
            console.error("Error obteniendo items temporales:", error);
            throw error;
        }
    },
};

export const companyOperations = {
    async getAllCompanies() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_COMPANIES);
            return data.allCompanydata || [];
        } catch (error) {
            console.error("Error obteniendo compañías:", error);
            throw error;
        }
    },

    async getCompanyById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_COMPANY_BY_ID, { id });
            return data.companydataById;
        } catch (error) {
            console.error("Error obteniendo compañía:", error);
            throw error;
        }
    },

    async createCompany(dataInput) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_COMPANY, { input: dataInput });
            return data.createCompany;
        } catch (error) {
            console.error("Error creando compañía:", error);
            throw error;
        }
    },

    async updateCompany(id, dataInput) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_COMPANY, { companyID: id, input: dataInput });
            return data.updateCompany;
        } catch (error) {
            console.error("Error actualizando compañía:", error);
            throw error;
        }
    },

    async deleteCompany(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_COMPANY, { companyID: id });
            return data.deleteCompany;
        } catch (error) {
            console.error("Error eliminando compañía:", error);
            throw error;
        }
    }
};

export const branchOperations = {
    async getAllBranches() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_BRANCHES);
            return data.allBranches || [];
        } catch (error) {
            console.error("Error obteniendo sucursales:", error);
            throw error;
        }
    },

    async getBranchById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_BRANCH_BY_ID, { id });
            return data.branchesById;
        } catch (error) {
            console.error("Error obteniendo sucursal:", error);
            throw error;
        }
    },

    async getBranchesByCompany(companyID) {
        try {
            const data = await graphqlClient.query(`query { branchesByCompany(companyID: ${"" + companyID}) { BranchID Name CompanyID } }`);
            return data.branchesByCompany || [];
        } catch (error) {
            console.error("Error obteniendo sucursales por compañía:", error);
            throw error;
        }
    },

    async createBranch(dataInput) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_BRANCH, { input: dataInput });
            return data.createBranch;
        } catch (error) {
            console.error("Error creando sucursal:", error);
            throw error;
        }
    },

    async updateBranch(id, dataInput) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_BRANCH, { branchID: id, input: dataInput });
            return data.updateBranch;
        } catch (error) {
            console.error("Error actualizando sucursal:", error);
            throw error;
        }
    },

    async deleteBranch(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_BRANCH, { branchID: id });
            return data.deleteBranch;
        } catch (error) {
            console.error("Error eliminando sucursal:", error);
            throw error;
        }
    }
};
