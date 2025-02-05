import { styled } from "@mui/material";
import SideMenu from "./side-menu";
import MainMenu from "./main-menu";

const Container = styled("div")({
  display: "flex",
  height: "100vh",
});

function App() {
  return (
    <Container>
      <SideMenu />
      <MainMenu />
    </Container>
  );
}

export default App;
