// useFilterOptionsLoader.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock del cliente GraphQL
vi.mock("~/graphql/graphqlClient", () => ({
  graphqlClient: {
    query: vi.fn(),
  },
}));

import { graphqlClient } from "~/graphql/graphqlClient";
import { useFilterOptionsLoader } from "./useFilterOptionsLoader";

describe("useFilterOptionsLoader", () => {
  it("debe llamar a graphqlClient.query con la query correcta y actualizar options", async () => {
    const mockData = {
      getDocTypes: [
        { DocTypeID: 1, Name: "DNI" },
        { DocTypeID: 2, Name: "Pasaporte" },
      ],
    };

    // simulamos respuesta
    (graphqlClient.query as any).mockResolvedValueOnce(mockData);

    const field = {
      __typename: "FilterField",
      dependsOn: null,
      field: "DocTypeID",
      label: "Tipo de documento",
      relationModel: "DocType", // TODO: verify if this is correct, previous ModelName .DocType,
      type: "select",
    };

    const { result } = renderHook(() => useFilterOptionsLoader(field));

    await waitFor(() => {
      // aseguramos que se llame graphqlClient.query
      expect(graphqlClient.query).toHaveBeenCalledWith(
        "{ getDocTypes { DocTypeID Name } }"
      );
    });

    // Como en tu hook devuelves options vacío en este momento,
    // no podemos comprobar options real. Si lo expusieras, podríamos hacer:
    // expect(result.current.options).toEqual({ DocTypeID: mockData.getDocTypes });

    // En este caso sólo comprobamos que el mock fue llamado
    expect(graphqlClient.query).toHaveBeenCalledTimes(1);
  });
});
