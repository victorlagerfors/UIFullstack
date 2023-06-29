// Notes.tsx
import { useState } from "react";
import { CardInput } from "../components/CardInput";
import { Note } from "../utils/syncedStore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NoteCard } from "../components/NoteCard";

export function Notes(props: { notes: Note[] }) {
  const { notes } = props;

  const [showDone, setShowDone] = useState(true);

  const userStatus = useSelector(
    (state: { user: { name: string } }) => state.user.name
  );

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
      <NotesList>
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} displayDone={showDone} />
        ))}
      </NotesList>
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

const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 50vh; // adjust this as necessary
  padding: 2px;
  gap: 5px;
`;
