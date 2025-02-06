import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import {
  addFolder,
  deleteFolder,
  selectFolder,
  deselectFolder,
  renameFolder,
} from "../../../store/slices/folderSlice";
import { StyleButton, StyledBox, StyleMainContainer } from "./index.styled";

export default function MainContainer() {
  const dispatch = useDispatch();
  const { folders, selectedFolderId } = useSelector((state) => state.folder);

  const boxRef = useRef();
  const folderRef = useRef();
  const inputRef = useRef();

  const [open, setOpen] = useState(false);
  const [renameInput, setRenameInput] = useState(false);
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
    selectedFolderId && {
      id: "rename",
      name: "Rename",
      handleOnClick: handleClickRename,
    },
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

  function handleClickRename() {
    setRenameInput(true);
    setOpen(false);
    dispatch(selectFolder(selectedFolderId));
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setOpen(false);
      dispatch(deselectFolder());
    }
  };

  const handleFolderOutSideClick = (event) => {
    if (folderRef.current && !folderRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleFolderClick = () => {
    dispatch(selectFolder(null));
    dispatch(deselectFolder());
  };

  const inputBlur = () => {
    setRenameInput(false);
    dispatch(deselectFolder());
  };

  const handleContextMenu = (event, id) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    dispatch(selectFolder(id));
    setOpen(true);
  };

  const folderNameChange = (event) => {
    const value = event.target.value;
    dispatch(renameFolder({ id: selectedFolderId, value: value }));
  };

  useEffect(() => {
    if (!selectedFolderId) {
      document.addEventListener("contextmenu", handleContextMenu);
    }
    document.addEventListener("click", handleFolderOutSideClick);
    document.addEventListener("click", handleClickOutside);

    return () => {
      if (!selectedFolderId) {
        document.removeEventListener("contextmenu", handleContextMenu);
      }
      document.removeEventListener("click", handleFolderOutSideClick);
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  return (
    <StyleMainContainer id="main-container">
      {folders.map((folder) => (
        <Box
          key={folder.id}
          ref={folderRef}
          sx={{
            display: "grid",
            padding: "8px",
            borderRadius: "8px",
            background:
              selectedFolderId === folder.id ? "var(--tran-blue)" : "",
          }}
          onContextMenu={(e) => handleContextMenu(e, folder.id)}
          onClick={handleFolderClick}
        >
          <span>
            <img
              src="/icons/macos_folder.png"
              width={80}
              height={80}
              alt="folder_icon"
            />
          </span>
          {renameInput && selectedFolderId === folder.id ? (
            <input
              style={{ all: "unset", width: "78px", textAlign: "center" }}
              disabled={!renameInput}
              ref={inputRef}
              onBlur={inputBlur}
              value={folder.name}
              onChange={folderNameChange}
            />
          ) : (
            <span style={{ textAlign: "center" }}>{folder.name}</span>
          )}
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
