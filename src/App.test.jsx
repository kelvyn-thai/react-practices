import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserCard } from "./App.js";

test("renders name safely without executing HTML/JSX injection", () => {
  render(
    <UserCard
      {...{
        name: '<script>alert("XSS")</script>',
        profileURL: `<img onload="<script>alert("hello")</script>' />`,
      }}
    />,
  );

  // Check if text appears as plain text (not executed)
  expect(screen.getByText('<script>alert("XSS")</script>')).toBeInTheDocument();

  // Ensure no script tags were injected into the DOM
  expect(document.querySelector("script")).toBeNull();
});
