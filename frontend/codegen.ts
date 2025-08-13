import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.VITE_GRAPHQL_API,
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/_generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
    "src/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
