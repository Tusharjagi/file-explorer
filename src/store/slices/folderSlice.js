import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  selectedFolderId: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (state) => {
      const newFolder = {
        id: `folder-${state.folders.length + 1}`,
        name: "New Folder",
      };
      state.folders.push(newFolder);
    },
    deleteFolder: (state) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== state.selectedFolderId
      );
      state.selectedFolderId = null;
    },
    selectFolder: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    deselectFolder: (state) => {
      state.selectedFolderId = null;
    },
  },
});

export const { addFolder, deleteFolder, selectFolder, deselectFolder } =
  folderSlice.actions;
export default folderSlice.reducer;
