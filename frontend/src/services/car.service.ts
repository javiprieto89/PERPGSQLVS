import { graphqlClient } from "~/graphql/graphql-client";
import CreateCarGQL from "~/graphql/mutations/CreateCar.graphql";
import CreateCarBrandGQL from "~/graphql/mutations/CreateCarBrand.graphql";
import CreateCarModelGQL from "~/graphql/mutations/CreateCarModel.graphql";
import DeleteCarGQL from "~/graphql/mutations/DeleteCar.graphql";
import DeleteCarBrandGQL from "~/graphql/mutations/DeleteCarBrand.graphql";
import DeleteCarModelGQL from "~/graphql/mutations/DeleteCarModel.graphql";
import UpdateCarGQL from "~/graphql/mutations/UpdateCar.graphql";
import UpdateCarBrandGQL from "~/graphql/mutations/UpdateCarBrand.graphql";
import UpdateCarModelGQL from "~/graphql/mutations/UpdateCarModel.graphql";
import GetAllCarBrandsGQL from "~/graphql/queries/GetAllCarBrands.graphql";
import GetAllCarModelsGQL from "~/graphql/queries/GetAllCarModels.graphql";
import GetAllCarsGQL from "~/graphql/queries/GetAllCars.graphql";
import GetCarBrandByIdGQL from "~/graphql/queries/GetCarBrandById.graphql";
import GetCarByIdGQL from "~/graphql/queries/GetCarById.graphql";
import GetCarFormDataGQL from "~/graphql/queries/GetCarFormData.graphql";
import GetCarModelByIdGQL from "~/graphql/queries/GetCarModelById.graphql";
import GetCarModelsByBrandGQL from "~/graphql/queries/GetCarModelsByBrand.graphql";

import type {
  CarBrandsCreate,
  CarBrandsInDb,
  CarBrandsUpdate,
  CarModelsCreate,
  CarModelsUpdate,
  CarsCreate,
  CarsInDb,
  CarsUpdate,
  CreateCarBrandMutation,
  CreateCarModelMutation,
  CreateCarMutation,
  DeleteCarBrandMutation,
  DeleteCarModelMutation,
  DeleteCarMutation,
  GetAllCarBrandsQuery,
  GetAllCarModelsQuery,
  GetAllCarsQuery,
  GetCarBrandByIdQuery,
  GetCarBrandsByCompanyQuery,
  GetCarByIdQuery,
  GetCarFormDataQuery,
  GetCarModelByIdQuery,
  GetCarModelsByBrandQuery,
  UpdateCarBrandMutation,
  UpdateCarModelMutation,
  UpdateCarMutation,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";

export const carBrandOperations = {
  async getAllCarBrands(): Promise<CarBrandsInDb[]> {
    try {
      const data = await graphqlClient.query<GetAllCarBrandsQuery>(
        GetAllCarBrandsGQL
      );
      return data.allCarbrands || [];
    } catch (error) {
      console.error("Error obteniendo marcas de auto:", error);
      throw error;
    }
  },

  async getCarBrandById(id?: number) {
    try {
      if (!id) throw new Error("ID de marca de auto es requerido");
      const data = await graphqlClient.query<GetCarBrandByIdQuery>(
        GetCarBrandByIdGQL,
        {
          companyId: AuthStorage.getSelectedAccess()?.CompanyID as number,
          id,
        }
      );
      return data.carbrandsById;
    } catch (error) {
      console.error("Error obteniendo marca de auto:", error);
      throw error;
    }
  },

  async getCarBrandsByCompany(companyID: string): Promise<CarBrandsInDb[]> {
    try {
      const data = await graphqlClient.query<GetCarBrandsByCompanyQuery>(
        GetCarModelsByBrandGQL,
        {
          companyID: parseInt(companyID),
        }
      );
      return data.carbrandsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo marcas de auto por compañía:", error);
      throw error;
    }
  },

  async createCarBrand(carBrandData: CarBrandsCreate) {
    try {
      const data = await graphqlClient.mutation<CreateCarBrandMutation>(
        CreateCarBrandGQL,
        {
          input: carBrandData,
        }
      );
      return data.createCarbrand;
    } catch (error) {
      console.error("Error creando marca de auto:", error);
      throw error;
    }
  },

  async updateCarBrand(id: number, carBrandData: CarBrandsUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateCarBrandMutation>(
        UpdateCarBrandGQL,
        {
          companyId: AuthStorage.getSelectedAccess()?.CompanyID as number,
          carBrandID: Number(id),
          input: carBrandData,
        }
      );
      return data.updateCarbrand;
    } catch (error) {
      console.error("Error actualizando marca de auto:", error);
      throw error;
    }
  },

  async deleteCarBrand(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteCarBrandMutation>(
        DeleteCarBrandGQL,
        {
          carBrandID: id,
        }
      );
      return data.deleteCarbrand;
    } catch (error) {
      console.error("Error eliminando marca de auto:", error);
      throw error;
    }
  },
};

export const carModelOperations = {
  async getAllCarModels() {
    try {
      const data = await graphqlClient.query<GetAllCarModelsQuery>(
        GetAllCarModelsGQL
      );
      return data.allCarmodels || [];
    } catch (error) {
      console.error("Error obteniendo modelos de auto:", error);
      throw error;
    }
  },

  async getCarModelById(id: string) {
    try {
      const data = await graphqlClient.query<GetCarModelByIdQuery>(
        GetCarModelByIdGQL,
        {
          id,
        }
      );
      return data.carmodelsById;
    } catch (error) {
      console.error("Error obteniendo modelo de auto:", error);
      throw error;
    }
  },

  async getCarModelsByBrand(brandID: string) {
    try {
      const data = await graphqlClient.query<GetCarModelsByBrandQuery>(
        GetCarModelsByBrandGQL,
        {
          brandID: parseInt(brandID),
        }
      );
      return data.carmodelsByBrand || [];
    } catch (error) {
      console.error("Error obteniendo modelos de auto por marca:", error);
      throw error;
    }
  },

  async createCarModel(carmodelData: CarModelsCreate) {
    try {
      const data = await graphqlClient.mutation<CreateCarModelMutation>(
        CreateCarModelGQL,
        {
          input: carmodelData,
        }
      );
      return data.createCarmodel;
    } catch (error) {
      console.error("Error creando modelo de auto:", error);
      throw error;
    }
  },

  async updateCarModel(id: string, carmodelData: CarModelsUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateCarModelMutation>(
        UpdateCarModelGQL,
        {
          carModelID: id,
          input: carmodelData,
        }
      );
      return data.updateCarmodel;
    } catch (error) {
      console.error("Error actualizando modelo de auto:", error);
      throw error;
    }
  },

  async deleteCarModel(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteCarModelMutation>(
        DeleteCarModelGQL,
        {
          carModelID: id,
        }
      );
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
  async getAllCars() {
    try {
      const data = await graphqlClient.query<GetAllCarsQuery>(GetAllCarsGQL);
      return data.allCars || [];
    } catch (error) {
      console.error("Error obteniendo autos:", error);
      throw error;
    }
  },

  async getCarFormData() {
    try {
      const data = await graphqlClient.query<GetCarFormDataQuery>(
        GetCarFormDataGQL
      );
      return data;
    } catch (error) {
      console.error("Error obteniendo datos del formulario de autos:", error);
      throw error;
    }
  },

  async getCarById(id: string) {
    try {
      const data = await graphqlClient.query<GetCarByIdQuery>(GetCarByIdGQL, {
        id,
      });
      return data.carsById;
    } catch (error) {
      console.error("Error obteniendo auto:", error);
      throw error;
    }
  },

  async getCarsByCompany(companyID: string) {
    try {
      const data = await graphqlClient.query<GetCarBrandsByCompanyQuery>(
        GetCarModelsByBrandGQL,
        { companyID: parseInt(companyID) }
      );
      return data.carbrandsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo autos por compañía:", error);
      throw error;
    }
  },

  async createCar(carData: CarsCreate): Promise<CarsInDb> {
    try {
      const data = await graphqlClient.mutation<CreateCarMutation>(
        CreateCarGQL,
        {
          input: sanitizeCarPayload(carData),
        }
      );
      return data.createCar;
    } catch (error) {
      console.error("Error creando auto:", error);
      throw error;
    }
  },

  async updateCar(id: string, carData: CarsUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateCarMutation>(
        UpdateCarGQL,
        {
          carID: id,
          input: sanitizeCarPayload(carData),
        }
      );
      return data.updateCar;
    } catch (error) {
      console.error("Error actualizando auto:", error);
      throw error;
    }
  },

  async deleteCar(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteCarMutation>(
        DeleteCarGQL,
        {
          carID: id,
        }
      );
      return data.deleteCar;
    } catch (error) {
      console.error("Error eliminando auto:", error);
      throw error;
    }
  },
};
