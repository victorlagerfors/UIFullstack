import { CardInput } from "../components/CardInput";
// @ts-ignore
import { useSyncedStore } from "@syncedstore/react";
import { List, Note, synchronizedStore } from "../utils/syncedStore";
import { Notes } from "./Notes";
import styled from "styled-components";

export function Lists() {
  const state: { lists: List[] } = useSyncedStore(synchronizedStore);

  const addList = (title: string) => {
    const newList = { id: Date.now().toString(), title, notes: [] as Note[] };
    state.lists.push(newList);
  };

  return (
    <ListWrapper>
      <CardInput onSubmit={addList} />
      <ListContainer>
        {state.lists.map((list) => (
          <ListComponent key={list.id}>
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
  max-width: 80vw;
`;

const ListComponent = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;
