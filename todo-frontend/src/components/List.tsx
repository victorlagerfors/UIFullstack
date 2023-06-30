import React from "react";
import styled from "styled-components";
import { Note } from "../utils/syncedStore";
import { Notes } from "../pages/Notes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSnowflake } from "@fortawesome/free-solid-svg-icons";

const Cross = () => <FontAwesomeIcon icon={faTrash} />;
const Snowflake = () => <FontAwesomeIcon icon={faSnowflake} />;

const FrozenText = styled.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ListComponent = styled.div<{ isFrozen: boolean }>`
  flex: 0 0 auto;
  position: relative;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: white;
  z-index: 2;
  pointer-events: ${(props) => (props.isFrozen ? "none" : "auto")};
  min-height: 0;
  overflow: auto;
  min-width: 300px;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  color: darkgray;
  cursor: pointer;
`;

const ListOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7); // Adjust this as per your need
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 9;
`;

const FrozenIcon = styled(Snowflake)`
  color: blue;
  font-size: 50px; // adjust as necessary
`;

const FreezeButton = styled.button<{ isFrozen: boolean; frozenByMe: boolean }>`
  z-index: 15;
  position: absolute;
  left: 10px;
  top: 10px;
  border: none;
  background-color: ${(props) =>
    props.isFrozen ? (props.frozenByMe ? "blue" : "darkgray") : "transparent"};
  color: ${(props) => (props.isFrozen ? "white" : "darkgray")};
  cursor: pointer;
  pointer-events: auto;
`;

interface ListItemProps {
  title: string;
  id: string;
  frozen: string | null;
  notes: Note[];
  userStatus: string;
  deleteList: (id: string) => void;
  freezeList: (id: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  id,
  frozen,
  notes,
  userStatus,
  deleteList,
  freezeList,
}) => (
  <ListComponent isFrozen={!!frozen} key={id}>
    <FreezeButton
      data-testid="freeze-button"
      isFrozen={!!frozen}
      frozenByMe={frozen === userStatus}
      onClick={() => freezeList(id)}
      disabled={!!(frozen && frozen !== userStatus)}
    >
      <span>
        <Snowflake /> <>{frozen ? `@${frozen}` : ""}</>
      </span>
    </FreezeButton>
    <DeleteButton data-testid="delete-button" onClick={() => deleteList(id)}>
      <Cross />
    </DeleteButton>
    <h2>{title}</h2>
    {frozen ? (
      <ListOverlay>
        <FrozenIcon />
        <FrozenText>Frozen by {frozen ? `@${frozen}` : ""}</FrozenText>
      </ListOverlay>
    ) : null}
    <Notes notes={notes} />
  </ListComponent>
);
