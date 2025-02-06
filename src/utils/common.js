export const sideMenuItems = [
  {
    headingName: "Favourites",
    items: [
      { name: "AirDrop", icon: "/icons/airdrop-icon.svg" },
      { name: "Recents", icon: "/icons/recent.svg" },
      { name: "Applications", icon: "/icons/application.svg" },
      { name: "Desktop", icon: "/icons/desktop-mac.svg" },
      { name: "Documents", icon: "/icons/document.svg" },
      { name: "Downloads", icon: "/icons/download.svg" },
    ],
  },
  {
    headingName: "Locations",
    items: [{ name: "iCloud Drive", icon: "/icons/icloud.svg" }],
  },
  {
    headingName: "Tags",
    items: [
      { name: "Red", color: "var(--red)" },
      { name: "Orange", color: "var(--orange)" },
      { name: "Yellow", color: "var(--yellow)" },
      { name: "Green", color: "var(--green)" },
      { name: "Blue", color: "var(--blue)" },
      { name: "Purple", color: "var(--purple)" },
      { name: "Grey", color: "var(--grey)" },
      { name: "All Tags", color: "var(--white)" },
    ],
  },
];

export const loadFolders = () => {
  const savedFolders = localStorage.getItem("folders");
  return savedFolders ? JSON.parse(savedFolders) : [];
};

export const storeFolders = (folders) => {
  return window.localStorage.setItem("folders", JSON.stringify(folders));
};
