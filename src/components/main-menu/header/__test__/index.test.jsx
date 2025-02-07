import React from "react";
import { render, screen } from "@testing-library/react";
import MainHeader from "../index";

describe("MainHeader Component", () => {
  test("renders without crashing", () => {
    render(<MainHeader />);
  });

  test("renders back and forward navigation icons", () => {
    render(<MainHeader />);
    expect(screen.getByTestId("ArrowBackIosIosIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowForwardIosIcon")).toBeInTheDocument();
  });

  test("renders the header title Download", () => {
    render(<MainHeader />);
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  test("renders all icons square, menu-bar, tag, and search", () => {
    render(<MainHeader />);

    expect(screen.getByAltText("square_icon")).toBeInTheDocument();
    expect(screen.getByAltText("menu_bar_icon")).toBeInTheDocument();
    expect(screen.getByTestId("AccessTimeFilledIcon")).toBeInTheDocument();
    expect(screen.getByTestId("SellIcon")).toBeInTheDocument();
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
  });

  test("renders search input with 'Search' text", () => {
    render(<MainHeader />);
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
});
