import packageJson from "eslint-plugin-package-json";

export default [
    {
        ignores: ["**/generated/**"]
    },
    packageJson.configs.recommended
]
