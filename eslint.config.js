import alexPlugin from "@alextheman/eslint-plugin";

export default [
    {
        ignores: ["**/generated/**"]
    },
    ...alexPlugin.configs.alexTypeScriptBase
]
