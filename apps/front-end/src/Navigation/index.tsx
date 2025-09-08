import type { ReactNode } from "react";

import { DarkModeToggle, NavigationDrawer, ScreenSizeContext } from "@alextheman/components";
import { useContext } from "react";

export interface NavigationProps {
  children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
  const { isLargeScreen } = useContext(ScreenSizeContext);
  return isLargeScreen ? (
    <NavigationDrawer
      title="Neurosongs"
      headerElements={<DarkModeToggle />}
      navItems={[
        {
          category: "Main",
          options: [
            {
              label: "Homepage",
              to: "/",
            },
          ],
        },
      ]}
    >
      {children}
    </NavigationDrawer>
  ) : (
    children
  );
}

export default Navigation;
