import { CardInput } from "../components/CardInput";
// @ts-ignore
import { useSyncedStore } from "@syncedstore/react";
import { List, Note, synchronizedStore } from "../utils/syncedStore";
import { Notes } from "./Notes";
import styled from "styled-components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cross = () => <FontAwesomeIcon icon={faTrash} />;

export function Lists() {
  const state: { lists: List[] } = useSyncedStore(synchronizedStore);

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

  return (
    <ListWrapper>
      <span>
        <CardInput onSubmit={addList}>
          <h3>Create List</h3>
        </CardInput>
      </span>
      <ListContainer>
        {state.lists.map((list) => (
          <ListComponent key={list.id}>
            <DeleteButton onClick={() => deleteList(list.id)}>
              <Cross />
            </DeleteButton>
            <h2>{list.title}</h2>
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
`;

const ListContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  max-width: 100vw;

  //Using a combination of negative margin and padding to allow the scroll to
  //Extend all the way to the edge of the screen
  margin: 0 -10vw;
  padding: 0 10vw;
`;

const ListComponent = styled.div`
  position: relative;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: white;
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
