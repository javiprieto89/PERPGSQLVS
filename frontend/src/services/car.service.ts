import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CarBrandsCreate,
  CarBrandsInDb,
  CarBrandsUpdate,
  CarModelsCreate,
  CarModelsInDb,
  CarModelsUpdate,
  CarsCreate,
  CarsInDb,
  CarsUpdate,
  ClientsInDb,
  CompanyInDb,
  DiscountsInDb,
} from "~/graphql/_generated/graphql";

export const carBrandOperations = {
  async getAllCarBrands(): Promise<CarBrandsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_CARBRANDS);
      return data.allCarbrands || [];
    } catch (error) {
      console.error("Error obteniendo marcas de auto:", error);
      throw error;
    }
  },

  async getCarBrandById(id: string): Promise<CarBrandsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CARBRAND_BY_ID, {
        id,
      });
      return data.carbrandsById;
    } catch (error) {
      console.error("Error obteniendo marca de auto:", error);
      throw error;
    }
  },

  async getCarBrandsByCompany(companyID: string): Promise<CarBrandsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CARBRANDS_BY_COMPANY, {
        companyID: parseInt(companyID),
      });
      return data.carbrandsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo marcas de auto por compañía:", error);
      throw error;
    }
  },

  async createCarBrand(carBrandData: CarBrandsCreate): Promise<CarBrandsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_CARBRAND, {
        input: carBrandData,
      });
      return data.createCarbrand;
    } catch (error) {
      console.error("Error creando marca de auto:", error);
      throw error;
    }
  },

  async updateCarBrand(
    id: string,
    carBrandData: CarBrandsUpdate
  ): Promise<CarBrandsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CARBRAND, {
        carBrandID: id,
        input: carBrandData,
      });
      return data.updateCarbrand;
    } catch (error) {
      console.error("Error actualizando marca de auto:", error);
      throw error;
    }
  },

  async deleteCarBrand(id: string): Promise<CarBrandsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_CARBRAND, {
        carBrandID: id,
      });
      return data.deleteCarbrand;
    } catch (error) {
      console.error("Error eliminando marca de auto:", error);
      throw error;
    }
  },
};

export const carModelOperations = {
  async getAllCarModels(): Promise<CarModelsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_CARMODELS);
      return data.allCarmodels || [];
    } catch (error) {
      console.error("Error obteniendo modelos de auto:", error);
      throw error;
    }
  },

  async getCarModelById(id: string): Promise<CarModelsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CARMODEL_BY_ID, {
        id,
      });
      return data.carmodelsById;
    } catch (error) {
      console.error("Error obteniendo modelo de auto:", error);
      throw error;
    }
  },

  async getCarModelsByBrand(brandID: string): Promise<CarModelsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CARMODELS_BY_BRAND, {
        brandID: parseInt(brandID),
      });
      return data.carmodelsByBrand || [];
    } catch (error) {
      console.error("Error obteniendo modelos de auto por marca:", error);
      throw error;
    }
  },

  async createCarModel(carmodelData: CarModelsCreate): Promise<CarModelsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_CARMODEL, {
        input: carmodelData,
      });
      return data.createCarmodel;
    } catch (error) {
      console.error("Error creando modelo de auto:", error);
      throw error;
    }
  },

  async updateCarModel(
    id: string,
    carmodelData: CarModelsUpdate
  ): Promise<CarModelsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CARMODEL, {
        carModelID: id,
        input: carmodelData,
      });
      return data.updateCarmodel;
    } catch (error) {
      console.error("Error actualizando modelo de auto:", error);
      throw error;
    }
  },

  async deleteCarModel(id: string): Promise<CarModelsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_CARMODEL, {
        carModelID: id,
      });
      return data.deleteCarmodel;
    } catch (error) {
      console.error("Error eliminando modelo de auto:", error);
      throw error;
    }
  },
};

function sanitizeCarPayload(
  data: CarsCreate | CarsUpdate
): Partial<CarsCreate | CarsUpdate> {
  const allowed: (keyof CarsCreate | keyof CarsUpdate)[] = [
    "CompanyID",
    "CarModelID",
    "ClientID",
    "LicensePlate",
    "Year",
    "LastServiceMileage",
    "IsDebtor",
    "DiscountID",
  ];
  let payload: Partial<CarsCreate | CarsUpdate> = {};
  for (const field of allowed) {
    if (data[field] !== undefined) {
      payload = {
        ...payload,
        [field]: data[field],
      };
    }
  }
  return payload;
}

export const carOperations = {
  async getAllCars(): Promise<CarsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_CARS);
      return data.allCars || [];
    } catch (error) {
      console.error("Error obteniendo autos:", error);
      throw error;
    }
  },

  async getCarFormData(): Promise<{
    companies: CompanyInDb[];
    carBrands: CarBrandsInDb[];
    carModels: CarModelsInDb[];
    clients: ClientsInDb[];
    discounts: DiscountsInDb[];
  }> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CAR_FORM_DATA);
      return {
        companies: data.companies || [],
        carBrands: data.carBrands || [],
        carModels: data.carModels || [],
        clients: data.clients || [],
        discounts: data.discounts || [],
      };
    } catch (error) {
      console.error("Error obteniendo datos del formulario de autos:", error);
      throw error;
    }
  },

  async getCarById(id: string): Promise<CarsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CAR_BY_ID, { id });
      return data.carsById;
    } catch (error) {
      console.error("Error obteniendo auto:", error);
      throw error;
    }
  },

  async getCarsByCompany(companyID: string): Promise<CarsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_CARS_BY_COMPANY, {
        companyID: parseInt(companyID),
      });
      return data.carsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo autos por compañía:", error);
      throw error;
    }
  },

  async createCar(carData: CarsCreate): Promise<CarsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_CAR, {
        input: sanitizeCarPayload(carData),
      });
      return data.createCar;
    } catch (error) {
      console.error("Error creando auto:", error);
      throw error;
    }
  },

  async updateCar(id: string, carData: CarsUpdate): Promise<CarsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CAR, {
        carID: id,
        input: sanitizeCarPayload(carData),
      });
      return data.updateCar;
    } catch (error) {
      console.error("Error actualizando auto:", error);
      throw error;
    }
  },

  async deleteCar(id: string): Promise<CarsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_CAR, {
        carID: id,
      });
      return data.deleteCar;
    } catch (error) {
      console.error("Error eliminando auto:", error);
      throw error;
    }
  },
};
