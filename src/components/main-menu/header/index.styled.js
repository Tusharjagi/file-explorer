import { styled } from "@mui/material";

export const StyleMainHeader = styled("div")({
  display: "flex",
  gap: "20px",
  padding: "12px 8px",
  alignItems: "center",
  width: "96%",
  ".forward_backward_icon": {
    display: "flex",
    gap: "10px",
    cursor: "pointer",
  },
  ".second_container": {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  ".header_title": {
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  ".icon": {
    padding: "2px 4px",
    borderRadius: "4px",
    fontSize: "18px",
    transition: "background 0.3s ease",
  },
  ".icon:hover": {
    background: "var(--dark-grey)",
    cursor: "pointer",
  },
  ".icon_container": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  ".search": {
    padding: "0 4px",
    width: "120px",
    border: "1px solid var(--grey)",
    borderRadius: "8px",
    color: "var(--dark-grey)",
    display: "flex",
    alignItems: "center",
  },
});
