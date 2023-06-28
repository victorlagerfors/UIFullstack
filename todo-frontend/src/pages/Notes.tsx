// Notes.tsx
import { useState } from "react";
import { CardInput } from "../components/CardInput";
import { Note } from "../utils/syncedStore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NoteCard } from "../components/NoteCard";

export function Notes(props: { notes: Note[] }) {
  let { notes } = props;

  const [editingIndex, setEditingIndex] = useState(-1);
  const [showDone, setShowDone] = useState(true);

  const userStatus = useSelector(
    (state: { user: { name: string } }) => state.user.name
  );

  const updateNote = (index, newDescription) => {
    const updatedNotes = [...notes];
    updatedNotes[index].description = newDescription;
    updatedNotes[index].lastUpdatedBy = userStatus;
    notes = updatedNotes;
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const finishEditing = () => {
    setEditingIndex(-1);
  };

  return (
    <NoteContainer>
      <CardInput
        onSubmit={(note) =>
          notes.unshift({
            id: Date.now().toString(),
            description: note,
            lastUpdatedBy: userStatus,
            done: false,
          })
        }
      ></CardInput>
      <DoneFilter>
        <FilterButton
          type="checkbox"
          checked={showDone}
          onChange={(e) => setShowDone(e.target.checked)}
        />
        <span>Show done?</span>
      </DoneFilter>
      {notes
        .filter((note) => showDone || !note.done)
        .map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            index={index}
            isEditing={editingIndex === index}
            onUpdate={updateNote}
            onStartEditing={startEditing}
            onFinishEditing={finishEditing}
          />
        ))}
    </NoteContainer>
  );
}

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DoneFilter = styled.span`
  display: flex;
  width: 100%;
  padding: 10px 0px;
`;

const FilterButton = styled.input`
  width: 15px;
  height: 15px;
`;
