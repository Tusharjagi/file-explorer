import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "../../../../store/slices/folderSlice";
import MainContainer from "../index";

jest.mock("react-dnd", () => ({
  useDrop: () => [{ isOver: false }, (node) => node],
  useDrag: () => [{ isOver: false }, (node) => node],
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

describe("MainContainer Component", () => {
  test("renders folder list", () => {
    render(
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );

    expect(screen.getByText("Folder 1")).toBeInTheDocument();
    expect(screen.getByText("Folder 2")).toBeInTheDocument();
  });

  test("opens context menu on right-click", () => {
    render(
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );

    const folder = screen.getByText("Folder 1");
    fireEvent.contextMenu(folder);

    expect(screen.getByText("New Folder")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Cut")).toBeInTheDocument();
  });

  test("closes context menu when clicking outside", () => {
    render(
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );

    fireEvent.contextMenu(screen.getByText("Folder 1"));
    expect(screen.getByText("New Folder")).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.queryByText("Rename")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("duplicate")).not.toBeInTheDocument();
  });
});
