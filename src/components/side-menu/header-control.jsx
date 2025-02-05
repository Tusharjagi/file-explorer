import IconButtonWithIcon from "../ui/icon-button";
import { ButtonContainer } from "./index.styled";

export default function HeaderControl() {
  const handleClose = () => {
    window.close();
  };

  const handleMinimize = () => {};

  const handleResize = () => {
    window.resizeTo(800, 600);
  };
  return (
    <ButtonContainer>
      <IconButtonWithIcon
        buttonColor="red"
        iconName="close"
        onClick={handleClose}
      />
      <IconButtonWithIcon
        buttonColor="yellow"
        iconName="remove"
        onClick={handleMinimize}
      />
      <IconButtonWithIcon
        buttonColor="green"
        iconName="filter"
        onClick={handleResize}
      />
    </ButtonContainer>
  );
}
