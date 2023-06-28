import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { reduxStore } from "./utils/reduxStore";
import { LayoutWrapper } from "./layout/LayoutWrapper";
import { Lists } from "./pages/Lists";
import NameModal from "./components/NameModal";

function App() {
  const [showModal, setShowModal] = useState(!!reduxStore.getState().user.name);

  const handleNameSubmit = () => {
    setShowModal(false);
  };

  return (
    <Provider store={reduxStore}>
      {showModal ? (
        <NameModal onNameSubmit={handleNameSubmit} />
      ) : (
        <LayoutWrapper>
          <Lists></Lists>
        </LayoutWrapper>
      )}
    </Provider>
  );
}

export default App;
