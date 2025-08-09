import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OrderFormData, orderSchema } from "./order.zod";

export function useOrderForm(defaultValues?: OrderFormData) {
  return useForm({
    resolver: zodResolver(orderSchema),
    defaultValues,
    mode: "onSubmit", // o "onBlur" o "onChange"
  });
}
