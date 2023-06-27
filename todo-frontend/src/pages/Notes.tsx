import styled from "styled-components";
import { Card } from "../components/Card";
import { CardInput } from "../components/CardInput";
import { useState } from "react";
import { post } from "../utils/api";
import { store } from "../utils/store";

import { useSyncedStore } from "@syncedstore/react";

export function Notes() {
  const state = useSyncedStore(store);

  const addNote = async (note: string) => {
    // Add the new note to the beginning of the notes array
    console.log(state);
    state.notes.push({ description: note, checked: false });
  };
  return (
    <NoteContainer>
      <CardInput onSubmit={addNote}></CardInput>
      {state.notes.map((note, index) => (
        <Card key={index}>
          {note.description}
          <input
            checked={note.checked}
            onChange={() => (note.checked = !note.checked)}
            type="checkbox"
          ></input>
        </Card>
      ))}
    </NoteContainer>
  );
}

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;
