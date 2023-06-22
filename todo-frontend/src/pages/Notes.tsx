import styled from "styled-components";
import { Card } from "../components/Card";
import { CardInput } from "../components/CardInput";
import { useState } from "react";
import { post } from "../utils/api";

export function Notes() {
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = async (note: string) => {
    // Add the new note to the beginning of the notes array
    setNotes((prevNotes) => [note, ...prevNotes]);
    const result = await post<{
      content: string;
      owner: string;
    }>("http://localhost:3000/note", {
      content: note,
      owner: "Your Name Here",
    });
  };
  return (
    <NoteContainer>
      <CardInput onSubmit={addNote}></CardInput>
      {notes.map((note, index) => (
        <Card key={index}>{note}</Card>
      ))}
    </NoteContainer>
  );
}

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;
