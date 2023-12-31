// Notes.tsx
import { useCallback, useState, ReactNode } from "react";
import { CardInput } from "../components/CardInput";
import { Note } from "../utils/syncedStore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NoteCard } from "../components/NoteCard";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";

interface NotesProps {
  notes: Note[];
}

export function Notes({ notes }: NotesProps): ReactNode {
  const [showDone, setShowDone] = useState(true);
  const userStatus = useSelector(
    (state: { user: { name: string } }) => state.user.name
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      const startIndex = result.source.index;
      const endIndex = result.destination.index;

      const noteCopy = notes[startIndex];
      const noteToInsert: Note = {
        id: noteCopy.id,
        description: noteCopy.description,
        detailedDescription: noteCopy.detailedDescription,
        lastUpdatedBy: userStatus,
        done: noteCopy.done,
        cost: noteCopy.cost,
        children: JSON.parse(JSON.stringify(noteCopy.children || [])),
      };

      notes.splice(startIndex, 1);
      notes.splice(endIndex, 0, noteToInsert);
    },
    [notes, userStatus]
  );

  const handleOnSubmit = useCallback(
    (description: string) => {
      notes.unshift({
        id: uuid(),
        description: description,
        lastUpdatedBy: userStatus,
        done: false,
      });
    },
    [notes, userStatus]
  );

  return (
    <NoteContainer>
      <CardInput onSubmit={handleOnSubmit}></CardInput>
      <DoneFilter>
        <FilterButton
          type="checkbox"
          checked={showDone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setShowDone(e.target.checked)
          }
        />
        <span>Show done?</span>
      </DoneFilter>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <NotesList ref={provided.innerRef} {...provided.droppableProps}>
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <NoteCard note={note} displayDone={showDone} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </NotesList>
          )}
        </Droppable>
      </DragDropContext>
    </NoteContainer>
  );
}

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  overflow: scroll;
  padding: 2px;
  gap: 5px;
`;
