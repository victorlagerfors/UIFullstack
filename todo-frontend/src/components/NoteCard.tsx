import { useState } from "react";
import { Note } from "../utils/syncedStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { TiltCard } from "./TiltCard";
import { CardInput } from "./CardInput";
import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const Check = () => <FontAwesomeIcon icon={faCheck} />;
const Edit = () => <FontAwesomeIcon icon={faPencil} />;
const Plus = () => <FontAwesomeIcon icon={faPlus} />;

interface NoteCardProps {
  note: Note;
  displayDone: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, displayDone }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const userStatus = useSelector(
    (state: { user: { name: string } }) => state.user.name
  );

  const calculateTotalCost = (note: Note) => {
    let totalCost = note.cost || 0;
    note.children?.forEach((child) => {
      totalCost += calculateTotalCost(child);
    });
    return totalCost;
  };

  const updateNote = (newDescription) => {
    note.description = newDescription;
    note.lastUpdatedBy = userStatus;
  };

  const updateDetailedDescription = (newDescription) => {
    note.detailedDescription = newDescription;
    note.lastUpdatedBy = userStatus;
  };

  const updateCost = (cost) => {
    const numberCost = Number(cost);
    if (isNaN(numberCost)) {
      console.log("error");
    } else {
      note.cost = numberCost;
      note.lastUpdatedBy = userStatus;
    }
  };

  const addChildNote = (childDescription) => {
    const newChild = {
      id: Date.now().toString(),
      description: childDescription,
      lastUpdatedBy: userStatus,
      done: false,
    };

    if (!note.children) {
      note.children = [];
    }
    note.children.unshift(newChild);
  };

  const handleAddChild = () => {
    setShowInput(true);
  };

  const handleOnSubmit = (childNoteDescription: string) => {
    addChildNote(childNoteDescription);
    setShowInput(false);
  };
  if (!displayDone && note.done) {
    return null;
  }

  return (
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
              <>
                <DescriptionInput
                  data-testid="description-input"
                  value={note.description}
                  onChange={(e) => updateNote(e.target.value)}
                  autoFocus
                />
                <DetailedDescriptionHeader>
                  Detailed Description (Supports Markdown)
                </DetailedDescriptionHeader>
                <DetailedDescriptionTextArea
                  value={note.detailedDescription}
                  onChange={(e) => updateDetailedDescription(e.target.value)}
                  autoFocus
                ></DetailedDescriptionTextArea>
              </>
            ) : (
              <>
                <TitleDescription>{note.description}</TitleDescription>
                <DetailedDescription>
                  <ReactMarkdown>{note.detailedDescription}</ReactMarkdown>
                </DetailedDescription>
              </>
            )}
          </DescriptionContainer>

          {isEditing ? (
            <IconButton onClick={() => setIsEditing(false)}>
              <Check />
            </IconButton>
          ) : (
            <IconButton
              data-testid="edit-button"
              onClick={() => setIsEditing(true)}
            >
              <Edit />
            </IconButton>
          )}
        </CardContent>
        <NoteInfo>
          <div>@{note.lastUpdatedBy}</div>
          <span>
            Total Cost: {calculateTotalCost(note)}, Own Cost:{" "}
            {isEditing ? (
              <CostInput
                value={note.cost}
                onChange={(e) => updateCost(e.target.value)}
                type="number"
                autoFocus
              />
            ) : (
              note.cost || 0
            )}
          </span>
        </NoteInfo>
        <IconButton data-testid="add-button" onClick={handleAddChild}>
          <Plus />
        </IconButton>
      </TiltCard>
      {showInput && (
        <CardInput data-testid="card-input" onSubmit={handleOnSubmit} />
      )}
      <Indent>
        {note.children?.map((child) => (
          <NoteCard key={child.id} note={child} displayDone={displayDone} />
        ))}
      </Indent>
    </React.Fragment>
  );
};

const TitleDescription = styled.span`
  font-size: 18px;
`;

const DetailedDescription = styled.span`
  font-size: 12px;
  max-width: 200px;
  width: 0;
  min-width: fit-content;
`;

const Indent = styled.div`
  margin-left: 20px;
`;

const IconButton = styled.button`
  padding: 1px 7px;
  margin-left: 5px;
  background-color: transparent;
  color: black;
`;

const CostInput = styled.input`
  width: 80px;
`;

const NoteInfo = styled.span`
  font-size: 10px;
  left: 10px;
  width: 100%;
  margin-top: 8px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const DoneButton = styled.input`
  align-self: flex-start;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CardContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-self: flex-start;
  flex-grow: 1;
  text-align: left;
  margin-right: 10px;
`;

const DetailedDescriptionTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 12px;
  margin: 5px 20px 20px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 16px;
  resize: none;
`;

const DescriptionInput = styled.input`
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
`;

const DetailedDescriptionHeader = styled.div`
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
`;
