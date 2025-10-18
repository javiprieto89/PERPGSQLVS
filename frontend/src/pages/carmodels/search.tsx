// frontend/src/pages/carmodels/search.tsx
import { CarModelSearch } from "~/features/carmodel";

export default function CarModelSearchPage() {
  return (
    <CarModelSearch
      title="Buscar Modelos de Vehículos"
      showTopBar={true}
      showSelectButton={false}
    />
  );
}