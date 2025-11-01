import type { LoaderDataProps, LoaderErrorProps } from "@alextheman/components";
import type { LoaderProviderProps } from "src/components/LoaderProvider";

// eslint-disable-next-line no-restricted-imports
import { Loader as AlexLoader } from "@alextheman/components";

import ErrorMessage from "src/components/ErrorMessage";

export type LoaderProps<T> = Omit<LoaderProviderProps<T>, "children" | "errorComponent"> &
  LoaderErrorProps &
  Omit<LoaderDataProps<T>, "onUndefined" | "onNull" | "onNullable">;

function Loader<T>({ children, apiErrorMap, errorFunction, ...props }: LoaderProps<T>) {
  return (
    <AlexLoader<T>
      errorComponent={(error) => {
        return (
          <ErrorMessage error={error} apiErrorMap={apiErrorMap} errorFunction={errorFunction} />
        );
      }}
      {...props}
    >
      {children}
    </AlexLoader>
  );
}

export default Loader;
