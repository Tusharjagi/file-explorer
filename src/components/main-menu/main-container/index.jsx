import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import {
  addFolder,
  deleteFolder,
  selectFolder,
  deselectFolder,
  renameFolder,
  duplicateFolder,
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
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(
    folders.findIndex((folder) => folder.id === selectedFolderId)
  );

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
      id: "duplicate",
      name: "Duplicate",
      handleOnClick: () => dispatch(duplicateFolder()),
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      inputBlur();
    } else if (event.key === "ArrowLeft") {
      if (selectedFolderIndex > 0) {
        setSelectedFolderIndex(selectedFolderIndex - 1);
        dispatch(selectFolder(folders[selectedFolderIndex - 1].id));
      }
    } else if (event.key === "ArrowRight") {
      if (selectedFolderIndex < folders.length - 1) {
        setSelectedFolderIndex(selectedFolderIndex + 1);
        dispatch(selectFolder(folders[selectedFolderIndex + 1].id));
      }
    }
  };

  useEffect(() => {
    if (!selectedFolderId) {
      document.addEventListener("contextmenu", handleContextMenu);
    }
    document.addEventListener("click", handleFolderOutSideClick);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (!selectedFolderId) {
        document.removeEventListener("contextmenu", handleContextMenu);
      }
      document.removeEventListener("click", handleFolderOutSideClick);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId, selectedFolderIndex]);

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
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span className="folder_name">{folder.name}</span>
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
