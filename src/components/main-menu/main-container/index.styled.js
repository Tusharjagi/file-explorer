import { Box, Button, styled } from "@mui/material";

export const StyleMainContainer = styled("div")({
  padding: "1rem",
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  ".folder_name": {
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "84px",
    textOverflow: "ellipsis",
  },
});

export const StyleButton = styled(Button)({
  color: "var(--white)",
  padding: "4px 8px",
  cursor: "pointer",
  background: "var(--dark-moon)",
  width: "180px",
  height: "36px",
  justifyContent: "flex-start",
  textDecoration: "normal",
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: "500",
});

export const StyledBox = styled(Box)({
  position: "absolute",
  minWidth: "150px",
  background: "var(--dark-grey)",
  border: "1px solid var(--dark-moon)",
  boxShadow: 3,
  padding: "4px",
  borderRadius: "8px",
  gap: "4px",
  display: "grid",
  ":focus-visible": {
    outline: "none",
    boxShadow: "none",
  },
});
