import { CardInput } from "../components/CardInput";
// @ts-ignore
import { useSyncedStore } from "@syncedstore/react";
import { List, Note, synchronizedStore } from "../utils/syncedStore";
import styled from "styled-components";
import { faSnowflake, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import ListItem from "../components/List";

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
          <ListItem
            key={list.id}
            title={list.title}
            id={list.id}
            frozen={list.frozen}
            notes={list.notes}
            userStatus={userStatus}
            deleteList={deleteList}
            freezeList={freezeList}
          />
        ))}
      </ListContainer>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100vh - 80px);
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
