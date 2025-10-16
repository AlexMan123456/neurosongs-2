import type { NavigationProps } from "src/components/Navigation";

import { NavigationDrawer as AlexNavigationDrawer, DarkModeToggle } from "@alextheman/components";
import AccessTime from "@mui/icons-material/AccessTime";
import Home from "@mui/icons-material/Home";

import UserDropdown from "src/resources/Users/components/UserDropdown";

function NavigationDrawer({ children }: NavigationProps) {
  return (
    <AlexNavigationDrawer
      title="Neurosongs"
      headerElements={
        <>
          <DarkModeToggle />
          <UserDropdown />
        </>
      }
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
