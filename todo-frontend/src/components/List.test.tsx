import { render, fireEvent, cleanup } from "@testing-library/react";
import chai, { expect } from "chai";
import spies from "chai-spies";
import { afterEach, test } from "vitest";
import { ListItem } from "./List";
import { Note } from "../utils/syncedStore";
import { Provider } from "react-redux";
import { reducer } from "../utils/reduxStore";
import { configureStore } from "@reduxjs/toolkit";

chai.use(spies);

// Mock store
const store = configureStore({ reducer });

// Mock data
const mockNote: Note[] = [
  {
    id: "1",
    description: "Mock note",
    lastUpdatedBy: "testUser",
    done: false,
  },
];

const mockListItem = {
  title: "List Item Title",
  id: "list-1",
  frozen: null,
  notes: mockNote,
  userStatus: "testUser",
};

const deleteListMock = chai.spy();
const freezeListMock = chai.spy();

afterEach(() => {
  chai.spy.restore();
  cleanup();
});

test("should display the list item title", () => {
  const { getByText } = render(
    <Provider store={store}>
      <ListItem
        title={mockListItem.title}
        id={mockListItem.id}
        frozen={mockListItem.frozen}
        notes={mockListItem.notes}
        userStatus={mockListItem.userStatus}
        deleteList={deleteListMock}
        freezeList={freezeListMock}
      />
    </Provider>
  );

  expect(getByText("List Item Title")).to.not.be.null;
});

test("should call deleteList function when delete button is clicked", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ListItem
        title={mockListItem.title}
        id={mockListItem.id}
        frozen={mockListItem.frozen}
        notes={mockListItem.notes}
        userStatus={mockListItem.userStatus}
        deleteList={deleteListMock}
        freezeList={freezeListMock}
      />
    </Provider>
  );

  const deleteButton = getByTestId("delete-button");
  fireEvent.click(deleteButton);

  expect(deleteListMock).to.have.been.called.once;
});

test("should call freezeList function when freeze button is clicked", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ListItem
        title={mockListItem.title}
        id={mockListItem.id}
        frozen={mockListItem.frozen}
        notes={mockListItem.notes}
        userStatus={mockListItem.userStatus}
        deleteList={deleteListMock}
        freezeList={freezeListMock}
      />
    </Provider>
  );

  const freezeButton = getByTestId("freeze-button");
  fireEvent.click(freezeButton);

  expect(freezeListMock).to.have.been.called.once;
});
