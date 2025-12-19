import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import PostList from "../PostList";

jest.mock("axios");

test("renders posts correctly", async () => {
  // Мок данных, как будто они пришли с backend
  axios.get.mockResolvedValue({
    data: {
      data: {
        1: { id: 1, title: "Test Post", comments: [] },
        2: { id: 2, title: "Another Post", comments: [] }
      }
    }
  });

  render(<PostList />);

  // Проверяем, что заголовки постов отображаются
  expect(await screen.findByText("Test Post")).toBeInTheDocument();
  expect(await screen.findByText("Another Post")).toBeInTheDocument();
});
