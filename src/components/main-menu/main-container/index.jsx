import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import {
  addFolder,
  deleteFolder,
  selectFolder,
  deselectFolder,
  duplicateFolder,
} from "../../../store/slices/folderSlice";
import { StyleButton, StyledBox, StyleMainContainer } from "./index.styled";
import { BUTTONS_CONFIG } from "../../../utils/common";
import Folder from "./folder";

export default function MainContainer() {
  const dispatch = useDispatch();
  const { folders, selectedFolderId } = useSelector((state) => state.folder);

  const boxRef = useRef();
  const inputRef = useRef();

  const [open, setOpen] = useState(false);
  const [renameInput, setRenameInput] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  return (
    <StyleMainContainer id="main-container">
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          setOpen={setOpen}
          folder={folder}
          selectedFolderId={selectedFolderId}
          setRenameInput={setRenameInput}
          renameInput={renameInput}
          setPosition={setPosition}
          inputRef={inputRef}
        />
      ))}

      <Modal open={open} onClose={() => setOpen(false)} hideBackdrop>
        <StyledBox ref={boxRef} sx={{ top: position.y, left: position.x }}>
          {BUTTONS_CONFIG(
            selectedFolderId,
            handleClickRename,
            dispatch,
            setOpen,
            addFolder,
            duplicateFolder,
            deleteFolder
          ).map(({ id, name, handleOnClick }) => (
            <StyleButton key={id} onClick={handleOnClick}>
              {name}
            </StyleButton>
          ))}
        </StyledBox>
      </Modal>
    </StyleMainContainer>
  );
}
