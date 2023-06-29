import { useState } from "react";
import { reduxStore, setName } from "../utils/reduxStore";
import styled from "styled-components";

// Feel free to use a different image or adjust the opacity to suit your needs
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://www.propergroove.org/wp-content/uploads/iStock-494347092.jpg");
  background-size: cover;
  filter: blur(8px) opacity(0.4);
  z-index: 0;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  width: 80%;
  z-index: 1000;
`;

const ImageContainer = styled.div`
  width: 50%;
  background-image: url("https://www.newdesigngroup.ca/ndgcnt/uploads/2014/11/1280px-Intel-logo.svg_.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 25px;
  border-radius: 10px 0 0 10px;
`;

const FormContainer = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 10px 10px 0;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;

  cursor: pointer;
  width: 100%;
`;

function NameModal({ onNameSubmit }) {
  const [name, setNameValue] = useState(localStorage.getItem("username") || "");

  const handleNameSubmit = (e) => {
    e.preventDefault();
    reduxStore.dispatch(setName(name));
    localStorage.setItem("username", name);
    onNameSubmit();
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  return (
    <>
      <Background />
      <Modal>
        <ModalContent>
          <ImageContainer />
          <FormContainer>
            <h2>Welcome to Notes</h2>
            <form onSubmit={handleNameSubmit}>
              <label>
                <div>What's your name?</div>
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <div>
                <StyledButton type="submit">Continue</StyledButton>
              </div>
            </form>
          </FormContainer>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NameModal;
