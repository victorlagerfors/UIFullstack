import { useState } from "react";
import { reduxStore, setName } from "../utils/reduxStore";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

function NameModal({ onNameSubmit }) {
  const [name, setNameValue] = useState("");

  const handleNameSubmit = (e) => {
    e.preventDefault();
    reduxStore.dispatch(setName(name));
    onNameSubmit();
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  return (
    <Modal>
      <ModalContent>
        <form onSubmit={handleNameSubmit}>
          <label>
            What's your name?
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </ModalContent>
    </Modal>
  );
}

export default NameModal;
