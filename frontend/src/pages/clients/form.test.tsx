import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock window.getComputedStyle for sonner/Toaster
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    direction: 'ltr',
    getPropertyValue: () => '',
  }),
});

// Mock data
const mockClientData = {
  ClientID: 2,
  Address: "Bacon 4932",
  BranchID: 2,
  City: "CABA",
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
  PriceListID: 3,
  ProvinceID: 3,
  VendorID: 5,
  __typename: "ClientsInDB",
};

const mockFormData = {
  docTypes: [
    { DocTypeID: 1, DocTypeName: "DNI" },
    { DocTypeID: 80, DocTypeName: "CUIT" },
  ],
  companies: [
    { CompanyID: 1, CompanyName: "Empresa 1" },
    { CompanyID: 2, CompanyName: "Empresa 2" },
  ],
  countries: [
    { CountryID: 51, CountryName: "Argentina" },
    { CountryID: 52, CountryName: "Chile" },
  ],
  provinces: [
    { ProvinceID: 3, CountryID: 51, ProvinceName: "CABA" },
    { ProvinceID: 4, CountryID: 51, ProvinceName: "Buenos Aires" },
  ],
  priceLists: [
    { PriceListID: 1, PriceListName: "Lista 1", PriceListDescription: "Desc 1" },
    { PriceListID: 2, PriceListName: "Lista 2", PriceListDescription: null },
    { PriceListID: 3, PriceListName: "Lista 3", PriceListDescription: "Desc 3" },
  ],
  vendors: [
    { VendorID: 1, VendorName: "Juan Perez" },
    { VendorID: 5, VendorName: "Maria Gomez" },
    { VendorID: 10, VendorName: "Carlos Lopez" },
  ],
};

// Mock hooks
vi.mock("~/graphql/_generated/graphql", () => ({
  useGetClientByIdQuery: vi.fn(() => ({
    data: { clientsById: mockClientData },
    loading: false,
    error: undefined,
  })),
  useGetClientFormDataQuery: vi.fn(() => ({
    data: mockFormData,
    loading: false,
    error: undefined,
  })),
  useUpdateClientMutation: vi.fn(() => [
    vi.fn(),
    { loading: false, error: undefined },
  ]),
  useCreateClientMutation: vi.fn(() => [
    vi.fn(),
    { loading: false, error: undefined },
  ]),
}));

vi.mock("~/features/branch/BranchCombo", () => ({
  BranchCombo: ({ value }: any) => (
    <div data-testid="branch-combo">Branch: {value || "No value"}</div>
  ),
}));

vi.mock("~/utils/helpers", () => ({
  clientHelpers: {
    prepareClientData: vi.fn((data) => data),
  },
}));

// Mock navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { ClientsForm } from "./form";

describe("ClientsForm - FormSelect Value Binding", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load and display client data in edit mode", async () => {
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

    // Check if form title shows "Editar"
    expect(screen.getByText("Editar Cliente")).toBeInTheDocument();
  });

  it("should populate PriceListID select with correct value", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/clients/2/edit"]}>
        <Routes>
          <Route path="/clients/:id/edit" element={<ClientsForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Editar Cliente/)).toBeInTheDocument();
    });

    // Wait for form to be populated
    await waitFor(() => {
      const firstNameInput = screen.getByLabelText(/Nombre\*/);
      expect(firstNameInput).toHaveValue("Fabio");
    });

    // Debug: Log the entire form to see what's rendered
    console.log("=== FORM HTML ===");
    console.log(container.innerHTML);

    // Check if PriceListID select has the correct value
    // The FormSelect should show "Lista 3" as the selected value
    await waitFor(() => {
      const priceListSelects = screen.getAllByText("Lista 3");
      expect(priceListSelects.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it("should populate VendorID select with correct value", async () => {
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

    // Wait for form to be populated
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/Email\*/);
      expect(emailInput).toHaveValue("javier@mail.com");
    });

    // Check if VendorID select has the correct value
    // The FormSelect should show "Maria Gomez" as the selected value
    await waitFor(() => {
      const vendorSelects = screen.getAllByText("Maria Gomez");
      expect(vendorSelects.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it("should display all form fields with correct values", async () => {
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

    // Wait and verify text inputs
    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre\*/)).toHaveValue("Fabio");
      expect(screen.getByLabelText(/Apellido\*/)).toHaveValue("Casas");
      expect(screen.getByLabelText(/Email\*/)).toHaveValue("javier@mail.com");
      expect(screen.getByLabelText(/Teléfono\*/)).toHaveValue("457300");
    });
  });
});
