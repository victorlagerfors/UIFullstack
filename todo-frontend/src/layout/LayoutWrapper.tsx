import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { reduxStore, setName } from "../utils/reduxStore";
import { useEffect, useState } from "react";
import NameModal from "../components/NameModal";

const Spinner = () => <FontAwesomeIcon icon={faSpinner} spin />;
const Check = () => <FontAwesomeIcon icon={faCheck} />;
const Cross = () => <FontAwesomeIcon icon={faTimes} />;

const TopBar = styled.div`
  height: 60px;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 200;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 60px; // Account for TopBar height
  height: calc(100vh - 60px); // Take full height of viewport minus TopBar
  width: 100vw;
  text-align: center;
`;

const LogoutButton = styled.button``;

export function LayoutWrapper(props) {
  const connectionStatus = useSelector(
    (state: { connection: { status: string } }) => state.connection.status
  );
  const userStatus = useSelector(
    (state: { user: { name: string } }) => state.user.name
  );

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove the username from local storage
    reduxStore.dispatch(setName("")); // Clear the username from the Redux store
  };
  let statusIcon;
  switch (connectionStatus) {
    case "connecting":
      statusIcon = <Spinner />;
      break;
    case "connected":
      statusIcon = <Check />;
      break;
    case "disconnected":
      statusIcon = <Cross />;
      break;
    default:
      statusIcon = null;
  }

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const userName = localStorage.getItem("username");

    if (userName) {
      reduxStore.dispatch(setName(userName));
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [userStatus]);

  const handleNameSubmit = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <NameModal onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          <TopBar>
            <div>Welcome {userStatus} </div>
            <div>
              Connection Status: {connectionStatus} {statusIcon}
            </div>
            <LogoutButton onClick={handleLogout}>Sign me out</LogoutButton>
          </TopBar>
          <Content>{props.children}</Content>
        </>
      )}
    </>
  );
}
