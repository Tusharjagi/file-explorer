import { createSlice } from "@reduxjs/toolkit";
import { loadFolders, storeFolders } from "../../utils/common";

const initialState = {
  folders: loadFolders(),
  selectedFolderId: null,
  copyIndex: 1,
  lastDuplicatedFolderId: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state) => {
      const newFolder = {
        id: Date.now().toString(),
        name: "New Folder",
      };
      state.folders.push(newFolder);
      storeFolders(state.folders);
    },
    deleteFolder: (state) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== state.selectedFolderId
      );
      state.selectedFolderId = null;
      storeFolders(state.folders);
    },
    selectFolder: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    deselectFolder: (state) => {
      state.selectedFolderId = null;
    },
    renameFolder: (state, action) => {
      const { id, value } = action.payload;
      const folder = state.folders.find((folder) => folder.id === id);
      if (folder) {
        folder.name = value;
        storeFolders(state.folders);
      }
    },
    duplicateFolder: (state) => {
      const folderToDuplicate = state.folders.find(
        (folder) => folder.id === state.selectedFolderId
      );
      if (!folderToDuplicate) return;

      if (state.lastDuplicatedFolderId !== folderToDuplicate.id) {
        state.copyIndex = 1;
        state.lastDuplicatedFolderId = folderToDuplicate.id;
      }

      let baseName = folderToDuplicate.name.replace(/_\d+$/, "");
      let newName = `${baseName}_${state.copyIndex}`;

      state.copyIndex++;

      const duplicatedFolder = {
        id: Date.now().toString(),
        name: newName,
      };

      state.folders.push(duplicatedFolder);
      storeFolders(state.folders);
    },
  },
});

export const {
  addFolder,
  deleteFolder,
  selectFolder,
  deselectFolder,
  renameFolder,
  duplicateFolder,
} = folderSlice.actions;

export default folderSlice.reducer;
