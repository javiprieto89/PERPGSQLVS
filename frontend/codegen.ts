import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://computron.selfip.com:8000/graphql/",
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
