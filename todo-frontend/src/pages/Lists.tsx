import { CardInput } from "../components/CardInput";
// @ts-ignore
import { useSyncedStore } from "@syncedstore/react";
import { List, Note, synchronizedStore } from "../utils/syncedStore";
import { Notes } from "./Notes";
import styled from "styled-components";
import { faSnowflake, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
const Cross = () => <FontAwesomeIcon icon={faTrash} />;
const Snowflake = () => <FontAwesomeIcon icon={faSnowflake} />;

export function Lists() {
  const state: { lists: List[] } = useSyncedStore(synchronizedStore);
  const userStatus = useSelector(
    (state: { user: { name: string } }) => state.user.name
  );

  const addList = (title: string) => {
    const newList = { id: Date.now().toString(), title, notes: [] as Note[] };
    state.lists.push(newList);
  };

  const deleteList = (id: string) => {
    const index = state.lists.findIndex((list) => list.id === id);
    if (index !== -1) {
      state.lists.splice(index, 1);
    }
  };

  const freezeList = (id: string) => {
    const list = state.lists.find((list) => list.id === id);
    if (list.frozen && list.frozen === userStatus) {
      list.frozen = null;
    } else {
      list.frozen = userStatus;
    }
  };

  return (
    <ListWrapper>
      <span>
        <CardInput onSubmit={addList}>
          <h3>Create List</h3>
        </CardInput>
      </span>
      <ListContainer>
        {state.lists.map((list) => (
          <ListComponent isFrozen={!!list.frozen} key={list.id}>
            <FreezeButton
              isFrozen={!!list.frozen}
              frozenByMe={list.frozen === userStatus}
              onClick={() => freezeList(list.id)}
              disabled={!!(list.frozen && list.frozen !== userStatus)}
            >
              <span>
                <Snowflake /> <>{list.frozen ? `@${list.frozen}` : ""}</>
              </span>
            </FreezeButton>
            <DeleteButton onClick={() => deleteList(list.id)}>
              <Cross />
            </DeleteButton>
            <h2>{list.title}</h2>
            {list.frozen ? (
              <ListOverlay>
                <FrozenIcon />
                <FrozenText>
                  Frozen by {list.frozen ? `@${list.frozen}` : ""}
                </FrozenText>
              </ListOverlay>
            ) : null}
            <Notes notes={list.notes} />
          </ListComponent>
        ))}
      </ListContainer>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100vh - 60px);
`;

const FrozenText = styled.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ListContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  max-width: 100vw;
  flex: 1;
  //Using a combination of negative margin and padding to allow the scroll to
  //Extend all the way to the edge of the screen
  margin: 0 -10vw;
  padding: 0 10vw;
`;

const ListComponent = styled.div<{ isFrozen: boolean }>`
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
  overflow: scroll;
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
