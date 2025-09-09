import type { NavigationProps } from "src/Navigation";

import { NavigationDrawer as AlexNavigationDrawer, DarkModeToggle } from "@alextheman/components";
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
          ],
        },
      ]}
    >
      {children}
    </AlexNavigationDrawer>
  );
}

export default NavigationDrawer;
