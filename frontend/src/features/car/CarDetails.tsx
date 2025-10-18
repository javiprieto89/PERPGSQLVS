import { type GetAllCarsQuery } from "~/graphql/_generated/graphql";

export function CarDetails({ car }: { car: GetAllCarsQuery['allCars'][0] }) {
  if (!car) return null;
  return (
    <div className="rounded-lg max-w-lg w-full p-6 space-y-4">
      <h2 className="font-bold">Detalles del Vehículo</h2>
      <div className="space-y-1 text-sm">
        <h3 className="text-lg font-semibold ">
          {car.LicensePlate} {car.Year ? `- ${car.Year}` : ''}
        </h3>
        <p className="text-sm">ID: {car.CarID}</p>
        <p className="flex items-center mt-4">
          <strong>Marca:</strong>
          <span className="ml-2">{car.CarBrandData?.CarBrandName || '—'}</span>
        </p>
        <p className="flex items-center">
          <strong>Modelo:</strong>
          <span className="ml-2">{car.CarModelData?.CarModelName || '—'}</span>
        </p>
        <p className="flex items-center">
          <strong>Cliente:</strong>
          <span className="ml-2">{car.ClientData ? `${car.ClientData.FirstName} ${car.ClientData.LastName || ''}` : '—'}</span>
        </p>
        <p className="flex items-center">
          <strong>Último servicio (km):</strong>
          <span className="ml-2">{car.LastServiceMileage ?? '—'}</span>
        </p>
        <p className="flex items-center gap-2 mt-4">
          <strong>Deudor:</strong>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${car.IsDebtor
              ? 'bg-red-100 text-destructive'
              : 'bg-green-100 text-green-800'
              }`}
          >
            {car.IsDebtor ? 'Sí' : 'No'}
          </span>
        </p>
      </div>
    </div>
  );
}
