import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs["combined/typescript-react"],
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              /* Direct database queries from the front-end using the Prisma Client is generally bad practice, since
                in theory, anyone with a modified version of the front-end, in a version that can query the database directly, can
                send any sort of query, including ones that mutate data. It's a lot safer to keep database logic purely in the
                back-end so that we can allow database writes in a controlled way. */
              group: ["@neurosongs/prisma-client"],
              message:
                "Do not use the Prisma Client directly in the front-end. Query an endpoint from the back-end instead.",
            },
          ],
          paths: [
            {
              // Disable the PrismaClient from @neurosongs/types for the same reason as above.
              name: "@neurosongs/types",
              importNames: ["PrismaClient"],
              message:
                "Do not use the Prisma Client directly in the front-end. Query an endpoint from the back-end instead.",
            },
            {
              /* Disable use of the LoaderProvider from @alextheman/components since Neurosongs provides its own LoaderProvider that wraps around
               the LoaderProvider from components, which provides a more suitable default errorComponent for Neurosongs-specific errors. */
              name: "@alextheman/components",
              importNames: ["LoaderProvider"],
              message:
                "Use the internal LoaderProvider from src/components/LoaderProvider instead.",
            },
            {
              // Disable Loader from @alextheman/components for same reasons as above
              name: "@alextheman/components",
              importNames: ["Loader"],
              message: "Use the internal Loader from src/components/Loader instead.",
            },
          ],
        },
      ],
    },
  },
];
