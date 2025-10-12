import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs.alexTypeScriptBase,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              // Do not allow manual setting of the current PrismaClient outside of the database files or setup file.
              name: "src/database/client",
              importNames: ["setPrismaClient"],
              message: "Do not attempt to reset the Prisma Client outside setup files.",
            },
            {
              // Do not allow imports from the generated types from PrismaClient. Instead use the processed Zod types from @neurosongs/types
              name: "@neurosongs/prisma-client/types",
              message:
                "Do not use the generated Prisma types. Use the types exported from @neurosongs/types instead.",
            },
            {
              // The PrismaClient from @neurosongs/types is generally better to use as a type annotation as it can be either a transaction client or a main client.
              name: "@neurosongs/prisma-client/prisma",
              importNames: ["PrismaClient"],
              message: "Please use the PrismaClient from @neurosongs/types instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/database/**/*.ts", "tests/test-utilities/setup.ts"],
    rules: {
      // Setup files should be able to set the PrismaClient and use the regular PrismaClient from @neurosongs/prisma-client/prisma.
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["src/server/routers/errors.ts", "src/server/validators/**/*.ts"],
    rules: {
      /* Function declarations in these files need to be arrow functions so we can type the whole signature
      using the Express types. */
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
    },
  },
];
