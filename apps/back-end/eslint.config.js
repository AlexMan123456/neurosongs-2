import plugin, { warnOnFixButErrorOnLint } from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs.alexTypeScriptBase,
  {
    rules: {
      "no-restricted-imports": [
        warnOnFixButErrorOnLint,
        {
          paths: [
            {
              // Do not allow manual setting of the current PrismaClient outside of the database files or setup file.
              name: "src/database/client",
              importNames: ["setPrismaClient"],
              message: "Do not attempt to reset the Prisma Client outside setup files.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/database/**/*.ts", "tests/test-utilities/setup.ts"],
    rules: {
      // Setup files should be able to set the PrismaClient.
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["src/server/routers/errors.ts", "src/server/validators/**/*.ts"],
    rules: {
      /* Function declarations in these files need to be arrow functions so we can type the whole signature
      using the Express types. */
      "func-style": [warnOnFixButErrorOnLint, "expression", { allowArrowFunctions: true }],
    },
  },
];
