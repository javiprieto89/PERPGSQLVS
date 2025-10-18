import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "~/lib/apollo";
import { PriceListForm } from "~/pages/pricelists/form";

export default function PriceListCreateLab() {
  const data = {
    __typename: "PriceListItemsInDB",
    PriceListID: 1,
    ItemID: 1,
    Price: 3335,
    EffectiveDate: "2025-07-19T11:05:34.600000",
    PriceListData: {
      __typename: "PriceListsInDB",
      Name: "Lista 1",
      Description: "Descripción lista 1",
      IsActive: true,
    },
  };

  return (
    <div className="container flex justify-center align-center h-dvh">
      <div className="lg:w-3/4 h-50 my-20">
        <ApolloProvider client={apolloClient}>
          <PriceListForm
            onClose={() => { }}
            onSave={() => { }}
            pricelist={data}
          />
        </ApolloProvider>
      </div>
    </div>
  );
}
