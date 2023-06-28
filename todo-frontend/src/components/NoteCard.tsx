import { useState } from "react";
import { Note } from "../utils/syncedStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { TiltCard } from "./TiltCard";
import { CardInput } from "./CardInput";
import React from "react";

const Check = () => <FontAwesomeIcon icon={faCheck} />;
const Edit = () => <FontAwesomeIcon icon={faPencil} />;
const Plus = () => <FontAwesomeIcon icon={faPlus} />;

interface NoteCardProps {
  note: Note;
  index: number;
  isEditing: boolean;
  onUpdate: (index: number, newDescription: string) => void;
  onStartEditing: (index: number) => void;
  onFinishEditing: () => void;
  onAddChild: (index: number, childDescription: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  index,
  isEditing,
  onUpdate,
  onStartEditing,
  onFinishEditing,
  onAddChild,
}) => {
  const [showInput, setShowInput] = useState(false);

  const handleAddChild = () => {
    setShowInput(true);
  };

  const handleOnSubmit = (childNoteDescription: string) => {
    onAddChild(index, childNoteDescription);
    setShowInput(false);
  };

  const renderNote = (note: Note, index: number) => (
    <React.Fragment key={note.id}>
      <TiltCard>
        <CardContent>
          <DoneButton
            checked={note.done}
            onChange={() => (note.done = !note.done)}
            type="checkbox"
          ></DoneButton>
          <DescriptionContainer>
            {isEditing ? (
              <NoteInput
                value={note.description}
                onChange={(e) => onUpdate(index, e.target.value)}
                autoFocus
              />
            ) : (
              note.description
            )}
          </DescriptionContainer>

          {isEditing ? (
            <IconButton onClick={onFinishEditing}>
              <Check />
            </IconButton>
          ) : (
            <IconButton onClick={() => onStartEditing(index)}>
              <Edit />
            </IconButton>
          )}
        </CardContent>
        <EditedBy>@{note.lastUpdatedBy}</EditedBy>
        <IconButton onClick={handleAddChild}>
          <Plus />
        </IconButton>
      </TiltCard>
      {showInput && <CardInput onSubmit={handleOnSubmit} />}
      <Indent>{note.children && note.children.map(renderNote)}</Indent>
    </React.Fragment>
  );

  return renderNote(note, index);
};

const Indent = styled.div`
  margin-left: 20px;
`;

const NoteInput = styled.input`
  margin-bottom: 5px;
`;

const IconButton = styled.button`
  padding: 1px 7px;
  margin-left: 5px;
  background-color: transparent;
  color: black;
`;

const EditedBy = styled.span`
  font-size: 10px;
  left: 10px;
  width: 100%;
  margin-top: 8px;
  text-align: left;
`;

const DoneButton = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CardContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DescriptionContainer = styled.span`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  flex-grow: 1;
`;

const AddChildContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
