import type { ReactNode } from "react";

import { useScreenSize } from "@alextheman/components";

import NavigationBottom from "src/components/Navigation/NavigationBottom";
import NavigationDrawer from "src/components/Navigation/NavigationDrawer";

export interface NavigationProps {
  children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
  const { isLargeScreen } = useScreenSize();
  return isLargeScreen ? (
    <NavigationDrawer>{children}</NavigationDrawer>
  ) : (
    <NavigationBottom>{children}</NavigationBottom>
  );
}

export default Navigation;
