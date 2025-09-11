import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("~/graphql/_generated/graphql", async () => {
  return {
    useGetClientFormDataLazyQuery: () => {
      const data = {
        clientsById: {
          Address: "Bacon 4932",
          BranchID: 2,
          City: "CABA",
          ClientID: 2,
          CompanyID: 1,
          CountryID: 51,
          DocNumber: "34353586",
          DocTypeID: 1,
          Email: "javier@mail.com",
          FirstName: "Fabio",
          IsActive: true,
          LastName: "Casas",
          Phone: "457300",
          PostalCode: "1419",
          PriceListID: 1,
          ProvinceID: 3,
          VendorID: 1,
          __typename: "ClientsInDB",
        },
        docTypes: [{ DocTypeID: 1, Name: "DNI" }],
        countries: [{ CountryID: 51, Name: "Argentina" }],
        provinces: [
          { ProvinceID: 3, CountryID: 51, Name: "CABA" },
          { ProvinceID: 4, CountryID: 51, Name: "Buenos Aires" },
        ],
        priceLists: [{ PriceListID: 1, Name: "Lista 1" }],
        vendors: [{ VendorID: 1, VendorName: "Juan" }],
      } as any;
      return [vi.fn(), { data, loading: false, error: undefined, refetch: vi.fn() }];
    },
  } as any;
});

vi.mock("~/features/company/CompanyCombo", () => ({
  CompanyCombo: ({ onSelect, defaultValue }: any) => (
    <button aria-label="company-combo" onClick={() => onSelect("1")}>{defaultValue || "Select company..."}</button>
  ),
}));

vi.mock("~/features/branch/BranchCombo", () => ({
  BranchCombo: ({ value }: any) => (
    <div aria-label="branch-combo">{value || "Select branch..."}</div>
  ),
}));

import { ClientsForm } from "../form-new";

describe("ClientsForm prefilled selects", () => {
  it("preselects ProvinceID and BranchID from loaded data", async () => {
    render(
      <MemoryRouter initialEntries={["/clients/2/edit"]}>
        <Routes>
          <Route path="/clients/:id/edit" element={<ClientsForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Editar Cliente/)).toBeInTheDocument();
    });

    // Province select should have value "3" via SelectValue; we assert by options rendered
    expect(screen.getAllByText("CABA").length).toBeGreaterThan(0);

    // BranchCombo mocked shows its value prop
    expect(screen.getByLabelText("branch-combo").textContent).toBe("2");
  });
});


