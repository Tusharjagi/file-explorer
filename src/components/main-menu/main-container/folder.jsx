import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolder,
  deselectFolder,
  renameFolder,
  selectFolder,
} from "../../../store/slices/folderSlice";

export default function Folder({
  setOpen,
  folder,
  selectedFolderId,
  setRenameInput,
  renameInput,
  setPosition,
  inputRef,
}) {
  const folderRef = useRef();
  const dispatch = useDispatch();

  const { folders } = useSelector((state) => state.folder);
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(
    folders.findIndex((folder) => folder.id === selectedFolderId)
  );

  useEffect(() => {
    if (!selectedFolderId) {
      document.addEventListener("contextmenu", handleContextMenu);
    }
    document.addEventListener("click", handleFolderOutSideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (!selectedFolderId) {
        document.removeEventListener("contextmenu", handleContextMenu);
      }
      document.removeEventListener("click", handleFolderOutSideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId, selectedFolderIndex]);

  function handleContextMenu(event, id) {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    dispatch(selectFolder(id));
    setOpen(true);
  }

  function handleFolderOutSideClick(event) {
    if (folderRef.current && !folderRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  function handleKeyDown(event) {
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
    } else if (event.key === "Delete" && selectedFolderId) {
      dispatch(deleteFolder());
      setOpen(false);
    }
  }

  const inputBlur = () => {
    setRenameInput(false);
    dispatch(deselectFolder());
  };

  const handleFolderClick = () => {
    dispatch(selectFolder(null));
    dispatch(deselectFolder());
  };

  const folderNameChange = (event) => {
    const value = event.target.value;
    dispatch(renameFolder({ id: selectedFolderId, value: value }));
  };

  return (
    <Box
      key={folder.id}
      ref={folderRef}
      sx={{
        display: "grid",
        padding: "8px",
        borderRadius: "8px",
        background: selectedFolderId === folder.id ? "var(--tran-blue)" : "",
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
  );
}
