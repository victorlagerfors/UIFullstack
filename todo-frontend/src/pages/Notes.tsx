import { useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import { CardInput } from "../components/CardInput";
// @ts-ignore
import { useSyncedStore } from "@syncedstore/react";
import { store } from "../utils/store";

export function Notes() {
  const state = useSyncedStore(store);

  const [editingIndex, setEditingIndex] = useState(-1); // Track the index of the note being edited

  const updateNote = (index, newDescription) => {
    const updatedNotes = [...state.notes]; // Create a copy of the notes array
    updatedNotes[index].description = newDescription; // Update the description of the specific note
    state.notes = updatedNotes; // Update the notes array in state
  };

  const startEditing = (index) => {
    setEditingIndex(index); // Set the index of the note being edited
  };

  const finishEditing = () => {
    setEditingIndex(-1); // Reset the editing index
  };

  return (
    <NoteContainer>
      <CardInput
        onSubmit={(note) =>
          state.notes.unshift({ description: note, checked: false })
        }
      ></CardInput>
      {state.notes.map((note, index) => (
        <Card key={index}>
          {editingIndex === index ? (
            <NoteInput
              value={note.description}
              onChange={(e) => updateNote(index, e.target.value)}
              autoFocus
            />
          ) : (
            note.description
          )}
          <input
            checked={note.checked}
            onChange={() => (note.checked = !note.checked)}
            type="checkbox"
          ></input>
          {editingIndex === index ? (
            <Button onClick={finishEditing}>Done</Button>
          ) : (
            <Button onClick={() => startEditing(index)}>Edit</Button>
          )}
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

const NoteInput = styled.input`
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 5px;
`;
