import { styled } from "@mui/material";

export const StyledSideMenu = styled("div")({
  width: "15vw",
  minWidth: "12vw",
  background: "var(--dire-wolf)",
  color: "var(--white)",
  borderRight: "3px solid var(--dark-moon)",
  padding: "0.6rem 1rem",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "8px",
});
