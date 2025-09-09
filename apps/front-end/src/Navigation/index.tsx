import type { ReactNode } from "react";

import { ScreenSizeContext } from "@alextheman/components";
import { useContext } from "react";

import NavigationBottom from "src/Navigation/NavigationBottom";
import NavigationDrawer from "src/Navigation/NavigationDrawer";

export interface NavigationProps {
  children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
  const { isLargeScreen } = useContext(ScreenSizeContext);
  return isLargeScreen ? (
    <NavigationDrawer>{children}</NavigationDrawer>
  ) : (
    <NavigationBottom>{children}</NavigationBottom>
  );
}

export default Navigation;
