import type {
  LoaderProviderPropsWithError as AlexLoaderProviderPropsWithError,
  LoaderProviderPropsWithNoError as AlexLoaderProviderPropsWithNoError,
} from "@alextheman/components";
import type { ReactNode } from "react";

import type { APIErrorMap } from "src/utility/defaultAPIErrors";

// eslint-disable-next-line no-restricted-imports
import { LoaderProvider as AlexLoaderProvider } from "@alextheman/components";

import ErrorMessage from "src/components/ErrorMessage";

export interface LoaderProviderPropsWithError<T> extends AlexLoaderProviderPropsWithError<T> {
  apiErrorMap?: never;
  errorFunction?: never;
}

export interface LoaderProviderPropsWithNeurosongsError<T> extends Omit<
  AlexLoaderProviderPropsWithError<T>,
  "errorComponent"
> {
  errorComponent?: never;
  apiErrorMap?: APIErrorMap;
  errorFunction?: (error: unknown) => string;
}

export interface LoaderProviderPropsWithNoError<T> extends AlexLoaderProviderPropsWithNoError<T> {
  apiErrorMap?: never;
  errorFunction?: never;
}

export type LoaderProviderProps<T> = (
  | LoaderProviderPropsWithError<T>
  | LoaderProviderPropsWithNeurosongsError<T>
  | LoaderProviderPropsWithNoError<T>
) & { children: ReactNode };

function LoaderProvider<T>({
  children,
  apiErrorMap,
  errorFunction,
  ...props
}: LoaderProviderProps<T>) {
  return (
    <AlexLoaderProvider<T>
      errorComponent={(error) => {
        return (
          <ErrorMessage error={error} apiErrorMap={apiErrorMap} errorFunction={errorFunction} />
        );
      }}
      logError={import.meta.env.DEV}
      {...props}
    >
      {children}
    </AlexLoaderProvider>
  );
}

export default LoaderProvider;
