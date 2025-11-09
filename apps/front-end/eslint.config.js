import plugin from "@alextheman/eslint-plugin";

export default [
  ...plugin.configs["combined/typescript-react"],
  ...plugin.configs["personal/neurosongs-front-end"],
];
