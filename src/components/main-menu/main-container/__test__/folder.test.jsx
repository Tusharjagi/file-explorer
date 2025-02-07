import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "../../../../store/slices/folderSlice";
import Folder from "../folder";

jest.mock("react-dnd", () => ({
  useDrag: () => [{ isDragging: false }, (node) => node],
}));

const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
  preloadedState: {
    folder: {
      folders: [
        { id: "1", name: "Folder 1" },
        { id: "2", name: "Folder 2" },
      ],
      selectedFolderId: null,
    },
  },
});

describe("Folder Component", () => {
  const mockSetOpen = jest.fn();
  const mockSetRenameInput = jest.fn();
  const mockSetPosition = jest.fn();
  const mockSetDroppedIndex = jest.fn();
  const inputRef = { current: null };

  const renderFolder = (folder) => {
    return render(
      <Provider store={store}>
        <Folder
          setOpen={mockSetOpen}
          folder={folder}
          selectedFolderId={null}
          setRenameInput={mockSetRenameInput}
          renameInput={false}
          setPosition={mockSetPosition}
          inputRef={inputRef}
          index={0}
          setDroppedIndex={mockSetDroppedIndex}
        />
      </Provider>
    );
  };

  test("renders folder correctly", () => {
    renderFolder({ id: "1", name: "Folder 1" });

    expect(screen.getByText("Folder 1")).toBeInTheDocument();
    expect(screen.getByAltText("folder_icon")).toBeInTheDocument();
  });

  test("opens context menu on right-click", () => {
    renderFolder({ id: "1", name: "Folder 1" });

    fireEvent.contextMenu(screen.getByText("Folder 1"));

    expect(mockSetPosition).toHaveBeenCalled();
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });

  test("selects folder on click", () => {
    renderFolder({ id: "1", name: "Folder 1" });

    fireEvent.click(screen.getByText("Folder 1"));

    expect(store.getState().folder.selectedFolderId).toBe(null);
  });
});
