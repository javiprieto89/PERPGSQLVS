// frontend/src/pages/cars/form.tsx
// Legacy wrapper - use ~/features/car/CarForm for new implementations
import { CarForm as NewCarForm } from "~/features/car/CarForm";

export function CarForm(props: any) {
  return <NewCarForm {...props} showTopBar={false} />;
}
