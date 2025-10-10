import type { NavigationProps } from "src/Navigation";

import { NavigationDrawer as AlexNavigationDrawer, DarkModeToggle } from "@alextheman/components";
import AccessTime from "@mui/icons-material/AccessTime";
import Home from "@mui/icons-material/Home";

function NavigationDrawer({ children }: NavigationProps) {
  return (
    <AlexNavigationDrawer
      title="Neurosongs"
      headerElements={<DarkModeToggle />}
      navItems={[
        {
          category: "Main",
          options: [
            {
              label: "Homepage",
              to: "/",
              icon: <Home />,
            },
            {
              label: "Recent",
              to: "/recent",
              icon: <AccessTime />,
            },
          ],
        },
      ]}
    >
      {children}
    </AlexNavigationDrawer>
  );
}

export default NavigationDrawer;
