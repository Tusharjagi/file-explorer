import { sideMenuItems } from "../../../utils/common";
import { Heading, MenuItem } from "./menu-items.styled";

export default function MenuItems() {
  return (
    <>
      {sideMenuItems.map(({ headingName, items }) => (
        <div key={headingName}>
          <Heading>{headingName}</Heading>
          {items.map(({ name, icon, color }, index) => (
            <MenuItem key={index}>
              {icon && (
                <span>
                  <img src={icon} height="18px" width="18px" alt="icon_image" />
                </span>
              )}
              {color && (
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "10px",
                    background: `${color}`,
                  }}
                ></span>
              )}
              <span>{name}</span>
            </MenuItem>
          ))}
        </div>
      ))}
    </>
  );
}
