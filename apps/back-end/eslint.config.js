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
              message: "Do not attempt to reset the Prisma Client outside setup files."
            },
          ],
        },
      ],
    },
  },
  {
    files: ["tests/test-utilities/setup.ts"],
    rules: {
      "no-restricted-imports": [
        warnOnFixButErrorOnLint,
        {
          paths: [
            {
              /* The test setup file does need access to setPrismaClient() so that it can set the test client, so the setPrismaClient 
              import is not restricted in this case, but we're still restricting access to importing the connection from the connection file itself
              in favour of getPrismaClient() */
              name: "src/database/connection",
              message:
                "Use the getPrismaClient() function from src/database/client to access the current client instead.",
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/database/*", "tests/test-utilities/setup.ts"],
    rules: {
      // Database files should have access to both the connection and client so it can set up.
      "no-restricted-imports": "off",
    },
  },
];
