import type { IconButtonProps } from "@mui/material/IconButton";

import { DropdownMenu, InternalLink } from "@alextheman/components";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

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
      <MenuItem component={InternalLink} to={`/users/a05cadd9-479c-43f7-a86f-487e38a282f7`}>
        View Profile
      </MenuItem>
    </DropdownMenu>
  );
}

export default UserDropdown;
