import { styled } from "@mui/material";

export const Heading = styled("div")({
  marginTop: "2rem",
  marginBottom: "0.4rem",
  fontWeight: "bold",
  fontSize: "1rem",
  color: "var(--grey)",
});

export const MenuItem = styled("div")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  padding: "6px",
  borderRadius: "6px",
  color: "var(--white)",
  cursor: "pointer",
  "&:hover": {
    background: "var(--dark-grey)",
  },
});
