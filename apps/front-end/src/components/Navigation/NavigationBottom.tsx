import type { NavigationProps } from "src/components/Navigation";

import { NavigationBottom as AlexNavigationBottom } from "@alextheman/components";
import Home from "@mui/icons-material/Home";

function NavigationBottom({ children }: NavigationProps) {
  return (
    <AlexNavigationBottom
      navItems={[
        {
          value: "homepage",
          label: "Homepage",
          icon: <Home />,
          to: "/",
        },
      ]}
    >
      {children}
    </AlexNavigationBottom>
  );
}

export default NavigationBottom;
