import type { LoaderProviderProps } from "@alextheman/components";

// eslint-disable-next-line no-restricted-imports
import { LoaderProvider as AlexLoaderProvider } from "@alextheman/components";

import ErrorMessage from "src/components/ErrorMessage";

function LoaderProvider<T>({ children, ...props }: LoaderProviderProps<T>) {
  return (
    <AlexLoaderProvider<T>
      errorComponent={(error) => {
        return <ErrorMessage error={error} />;
      }}
      {...props}
    >
      {children}
    </AlexLoaderProvider>
  );
}

export default LoaderProvider;
