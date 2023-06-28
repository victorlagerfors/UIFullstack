import { useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import { CardInput } from "../components/CardInput";

import { Note } from "../utils/syncedStore";

export function Notes(props: { notes: Note[] }) {
  let { notes } = props;

  const [editingIndex, setEditingIndex] = useState(-1); // Track the index of the note being edited
  const [showDone, setShowDone] = useState(true); // Add this state variable

  const updateNote = (index, newDescription) => {
    const updatedNotes = [...notes]; // Create a copy of the notes array
    updatedNotes[index].description = newDescription; // Update the description of the specific note
    notes = updatedNotes; // Update the notes array in state
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
          notes.unshift({
            id: Date.now().toString(),
            description: note,
            done: false,
          })
        }
      ></CardInput>
      <div>
        <input
          type="checkbox"
          checked={showDone}
          onChange={(e) => setShowDone(e.target.checked)}
        />
        <span>Show done?</span>
      </div>
      {notes
        .filter((note) => showDone || !note.done) // Only show done notes if showDone is true
        .map((note, index) => (
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
            <span>
              <input
                checked={note.done}
                onChange={() => (note.done = !note.done)}
                type="checkbox"
              ></input>
              Done?
            </span>
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
`;

const NoteInput = styled.input`
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 5px;
`;
