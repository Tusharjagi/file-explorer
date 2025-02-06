import { styled } from "@mui/material";
import MainHeader from "./header";
import MainContainer from "./main-container";

const StyledMainMenu = styled("div")({
  background: "var(--young-night)",
  color: "var(--white)",
  width: "85vw",
});

export default function MainMenu() {
  return (
    <StyledMainMenu>
      <MainHeader />
      <MainContainer />
    </StyledMainMenu>
  );
}
