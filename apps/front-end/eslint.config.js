import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs.alexTypeScriptReactBase,
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
        },
      ],
    },
  },
];
