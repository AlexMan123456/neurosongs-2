import type { LoaderProps } from "@alextheman/components";

import { Loader as AlexLoader } from "@alextheman/components";

import ErrorMessage from "src/components/ErrorMessage";

function Loader<T>({ children, ...props }: LoaderProps<T>) {
  return (
    <AlexLoader<T>
      errorComponent={(error) => {
        return <ErrorMessage error={error} />;
      }}
      {...props}
    >
      {children}
    </AlexLoader>
  );
}

export default Loader;
