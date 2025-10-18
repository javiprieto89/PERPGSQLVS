// frontend/src/features/carmodel/CarModelSearchModal.tsx
import { GenericModal } from "~/components/GenericModal";
import { type CarModelsInDb } from "~/graphql/_generated/graphql";
import CarModelSearch from "./CarModelSearch";

interface CarModelSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModelSelect: (model: CarModelsInDb) => void;
  selectedCarBrandID?: number | null;
}

export default function CarModelSearchModal({
  isOpen,
  onClose,
  onModelSelect,
  selectedCarBrandID = null,
}: CarModelSearchModalProps) {
  const handleModelSelect = (model: CarModelsInDb) => {
    onModelSelect(model);
    onClose();
  };

  const title = `Buscar Modelos${selectedCarBrandID ? " (Filtrado por marca)" : ""}`;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="6xl"
    >
      {isOpen && (
        <CarModelSearch
          onModelSelect={handleModelSelect}
          selectedCarBrandID={selectedCarBrandID}
          showSelectButton={true}
          showTopBar={false}
        />
      )}
    </GenericModal>
  );
}
