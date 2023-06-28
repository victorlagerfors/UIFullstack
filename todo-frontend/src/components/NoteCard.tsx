// NoteCard.tsx
import { Note } from "../utils/syncedStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../components/Card";
import styled from "styled-components";

const Check = () => <FontAwesomeIcon icon={faCheck} />;
const Edit = () => <FontAwesomeIcon icon={faPencil} />;

interface NoteCardProps {
  note: Note;
  index: number;
  isEditing: boolean;
  onUpdate: (index: number, newDescription: string) => void;
  onStartEditing: (index: number) => void;
  onFinishEditing: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  index,
  isEditing,
  onUpdate,
  onStartEditing,
  onFinishEditing,
}) => {
  return (
    <Card>
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
    </Card>
  );
};

const NoteInput = styled.input`
  margin-bottom: 5px;
`;

const IconButton = styled.button`
  padding: 1px 7px; // override the padding here
  margin-left: 5px;
  background-color: transparent;
  color: black;
`;

const EditedBy = styled.span`
  font-size: 10px;
  right: 10px;
  width: 100%;
  margin-top: 8px;
  text-align: right;
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
