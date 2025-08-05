import { ApolloProvider } from "@apollo/client";
import AdvancedFilter from "~/components/filter/AdvancedFilter";
import apolloClient from "~/lib/apollo";

export default function UiPage() {
  return (
    <div className="container flex justify-center align-center h-dvh">
      <div className="w-3/4 h-50 my-20">
        <ApolloProvider client={apolloClient}>
          <AdvancedFilter
            modelName="saleconditions"
            data={[
              {
                __typename: "SaleConditionsInDB",
                SaleConditionID: 1,
                CreditCardID: 1,
                Name: "Contado",
                DueDate: "2025-05-26",
                Surcharge: 0,
                IsActive: true,
              },
              {
                __typename: "SaleConditionsInDB",
                SaleConditionID: 3,
                CreditCardID: 2,
                Name: "33333355",
                DueDate: "2025-08-09",
                Surcharge: 0,
                IsActive: true,
              },
              {
                __typename: "SaleConditionsInDB",
                SaleConditionID: 1002,
                CreditCardID: 1,
                Name: "dgfgdfgdfg",
                DueDate: "2025-07-26",
                Surcharge: 0,
                IsActive: true,
              },
            ]}
            onFilterChange={(value) => {
              console.log("UI CALLBACK onFilterChange", value);
            }}
          />
          {/*
          <ClientDropdown />
          <CarDropdown />
          */}
          {/* <SaleConditionSearchModal
            onClose={(data) => console.log("ON CLOSE", data)}
            onSelect={(data) => console.log("ON CLOSE", data)}
          /> */}
        </ApolloProvider>
      </div>
    </div>
  );
}
