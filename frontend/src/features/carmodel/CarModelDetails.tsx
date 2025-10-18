import { type GetAllCarModelsQuery } from "~/graphql/_generated/graphql";

export function CarModelDetails({ carModel }: { carModel: GetAllCarModelsQuery['allCarmodels'][0] }) {
  if (!carModel) return null;

  return (
    <div className="rounded-lg max-w-lg w-full p-6 space-y-4">
      <h2 className="font-bold">Detalles del Modelo</h2>
      <div className="space-y-1 text-sm">
        <h3 className="text-lg font-semibold">
          {carModel.CarModelName}
        </h3>
        <p className="text-sm">ID: {carModel.CarModelID}</p>
        <p className="flex items-center mt-4">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <strong>Marca:</strong>
          <span className="ml-2">{carModel.CarBrandData?.CarBrandName || '—'}</span>
        </p>
        <p className="flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <strong>ID Modelo:</strong>
          <span className="ml-2">{carModel.CarModelID}</span>
        </p>
        <p className="flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <strong>ID Marca:</strong>
          <span className="ml-2">{carModel.CarBrandID}</span>
        </p>
      </div>
    </div>
  );
}