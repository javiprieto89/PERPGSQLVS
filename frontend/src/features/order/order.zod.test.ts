import { describe, expect, it } from "vitest";
import { orderSchema } from "./order.zod";

const order2 = {
  OrderID: 6,
  CompanyID: 1,
  BranchID: 1,
  OrderDate: "2025-07-08T00:00:00",
  ClientID: 11,
  CarID: null,
  IsService: false,
  ServiceTypeID: null,
  Mileage: null,
  NextServiceMileage: null,
  Notes: null,
  SaleConditionID: 1,
  DiscountID: 1,
  Subtotal: 922,
  Total: 1115.62,
  VAT: 193.62,
  UserID: 1,
  DocumentID: 1,
  PriceListID: 1,
  OrderStatusID: 1,
  WarehouseID: 1,
};

describe("orderSchema", () => {
  it.only("valida correctamente un número entero como string", () => {
    const result = orderSchema.safeParse({
      companyId: "1",
      branchId: "123",
      orderStatusId: "1",
      priceListId: "1",
      warehouseId: "1",
      date: new Date().toISOString().slice(0, 10),
    });
    console.log("result", result);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.branchId).toBe(123);
    }
  });

  it("valida correctamente un número entero", () => {
    const result = orderSchema.safeParse({ branchId: 456 });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.branchId).toBe(456);
    }
  });

  it("falla si es un string no numérico", () => {
    const result = orderSchema.safeParse({ branchId: "abc" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Debe ser un número entero");
    }
  });

  it("falla si es un número decimal", () => {
    const result = orderSchema.safeParse({ branchId: "123.5" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Debe ser un número entero");
    }
  });

  it("falla si branchId está ausente", () => {
    const result = orderSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Debe ser un número entero");
    }
  });
});
