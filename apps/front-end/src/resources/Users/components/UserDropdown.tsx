import type { IconButtonProps } from "@mui/material/IconButton";

import { DropdownMenu2 as DropdownMenu } from "@alextheman/components";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import DropdownMenuLink from "src/components/DropdownMenuLink";
import neurosongsNote from "src/images/Neurosongs_note.png";

function UserDropdown() {
  return (
    <DropdownMenu
      button={({ ...props }: IconButtonProps) => {
        return (
          <IconButton {...props}>
            <Avatar src={neurosongsNote} alt="Profile picture" />
          </IconButton>
        );
      }}
    >
      <DropdownMenuLink to="/users/a05cadd9-479c-43f7-a86f-487e38a282f7">
        View Profile
      </DropdownMenuLink>
    </DropdownMenu>
  );
}

export default UserDropdown;
