import ArrowBackIosIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SellIcon from "@mui/icons-material/Sell";
import SearchIcon from "@mui/icons-material/Search";
import { StyleMainHeader } from "./index.styled";

export default function MainHeader() {
  return (
    <StyleMainHeader>
      <div className="forward_backward_icon">
        <ArrowBackIosIosIcon fontSize="14px" />
        <ArrowForwardIosIcon fontSize="14px" />
      </div>
      <div className="second_container">
        <div className="header_title">Download</div>
        <div className="icon_container">
          <span className="icon">
            <img
              src="/icons/square.svg"
              height="18px"
              width="18px"
              alt="square_icon"
            />
          </span>
          <span className="icon">
            <img
              src="/icons/menu-bar.svg"
              height="20px"
              width="20px"
              alt="square_icon"
            />
          </span>
          <AccessTimeFilledIcon className="icon" />
          <SellIcon className="icon" />
          <div className="search">
            <SearchIcon className="icon" color="#414141" />
            Search
          </div>
        </div>
      </div>
    </StyleMainHeader>
  );
}
