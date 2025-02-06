import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import {
  addFolder,
  deleteFolder,
  selectFolder,
  deselectFolder,
} from "../../../store/slices/folderSlice";
import { StyleButton, StyledBox, StyleMainContainer } from "./index.styled";

export default function MainContainer() {
  const dispatch = useDispatch();
  const { folders, selectedFolderId } = useSelector((state) => state.folder);

  const boxRef = useRef();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const BUTTONS = [
    {
      id: "refresh",
      name: "Refresh",
      handleOnClick: () => window.location.reload(),
    },
    {
      id: "new-folder",
      name: "New Folder",
      handleOnClick: () => {
        dispatch(addFolder());
        setOpen(false);
      },
    },
    { id: "rename", name: "Rename" },
    selectedFolderId && {
      id: "delete",
      name: "Delete",
      handleOnClick: () => {
        dispatch(deleteFolder());
        setOpen(false);
      },
    },
    { id: "copy", name: "Copy" },
    { id: "cut", name: "Cut" },
  ].filter(Boolean);

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setOpen(false);
      dispatch(deselectFolder());
    }
  };

  const handleContextMenu = (event, id) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    dispatch(selectFolder(id));
    setOpen(true);
  };

  useEffect(() => {
    if (!selectedFolderId) {
      document.addEventListener("contextmenu", handleContextMenu);
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      if (!selectedFolderId) {
        document.removeEventListener("contextmenu", handleContextMenu);
      }
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  return (
    <StyleMainContainer id="main-container">
      {folders.map((folder) => (
        <Box
          key={folder.id}
          sx={{
            display: "grid",
            padding: "8px",
            borderRadius: "8px",
            background:
              selectedFolderId === folder.id ? "var(--tran-blue)" : "",
          }}
          onContextMenu={(e) => handleContextMenu(e, folder.id)}
        >
          <span>
            <img
              src="/icons/macos_folder.png"
              width={80}
              height={80}
              alt="folder_icon"
            />
          </span>
          <span>{folder.name}</span>
        </Box>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} hideBackdrop>
        <StyledBox ref={boxRef} sx={{ top: position.y, left: position.x }}>
          {BUTTONS.map(({ id, name, handleOnClick }) => (
            <StyleButton key={id} onClick={handleOnClick}>
              {name}
            </StyleButton>
          ))}
        </StyledBox>
      </Modal>
    </StyleMainContainer>
  );
}
