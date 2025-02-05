import { StyledSideMenu } from "./index.styled";
import HeaderControl from "./header-control";
import MenuItems from "./menu-items/menu-items";

export default function SideMenu() {
  return (
    <StyledSideMenu>
      <HeaderControl />
      <MenuItems />
    </StyledSideMenu>
  );
}
