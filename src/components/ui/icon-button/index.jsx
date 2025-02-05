import { IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import FilterNoneIcon from "@mui/icons-material/FilterNone";

const iconMapping = {
  close: CloseIcon,
  remove: RemoveIcon,
  filter: FilterNoneIcon,
};

const colorMapping = {
  red: "var(--red)",
  yellow: "var(--yellow)",
  green: "var(--green)",
};

export default function IconButtonWithIcon({ buttonColor, iconName, onClick }) {
  const IconComponent = iconMapping[iconName] || CloseIcon;
  const ButtonColors = colorMapping[buttonColor] || "var(--red)";

  const StyledIconButton = styled(IconButton)({
    padding: 0,
    fontSize: "18px",
    backgroundColor: ButtonColors,
    "&:hover": {
      backgroundColor: ButtonColors,
    },
    "&:hover .icon": {
      visibility: "visible",
    },
  });

  const StyledIcon = styled(IconComponent)({
    fontSize: "14px",
    visibility: "hidden",
  });

  return (
    <StyledIconButton buttonColor={ButtonColors} onClick={onClick}>
      <StyledIcon className="icon" />
    </StyledIconButton>
  );
}
