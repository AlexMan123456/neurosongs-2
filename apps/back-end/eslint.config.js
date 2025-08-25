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
              // Do not allow direct reference to the database connection - it may not necessarily be the same client as the one used in tests.
              name: "src/database/connection",
              message:
                "Use the getPrismaClient() function from src/database/client to access the current client instead.",
            },
            {
              // Do not allow manual setting of the current PrismaClient outside of the database files or setup file.
              name: "src/database/client",
              importNames: ["setPrismaClient"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/database/*", "tests/test-utilities/setup.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
