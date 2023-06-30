import { render, fireEvent, cleanup } from "@testing-library/react";
import { expect } from "chai";
import { afterEach, test } from "vitest";
import { NoteCard } from "./NoteCard";
import { Provider } from "react-redux";
import { reducer } from "../utils/reduxStore";
import { configureStore } from "@reduxjs/toolkit";

// Mock data
const mockNote = {
  id: "1",
  description: "Mock note",
  lastUpdatedBy: "testUser",
  done: false,
};
// Mock store
const store = configureStore({ reducer });

afterEach(cleanup);

test("should display the note description", async () => {
  const { findByText } = render(
    <Provider store={store}>
      <NoteCard note={mockNote} displayDone={false} />
    </Provider>
  );
  expect(await findByText("Mock note")).to.not.be.null;
});

test("should toggle editing mode when edit icon clicked", async () => {
  const { getByTestId, findByTestId } = render(
    <Provider store={store}>
      <NoteCard note={mockNote} displayDone={false} />
    </Provider>
  );

  const editButton = getByTestId("edit-button");
  await fireEvent.click(editButton);

  expect(await findByTestId("description-input")).to.not.be.null;
});
