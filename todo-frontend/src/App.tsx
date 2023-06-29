import { Provider } from "react-redux";
import "./App.css";
import { reduxStore, setName } from "./utils/reduxStore";
import { LayoutWrapper } from "./layout/LayoutWrapper";
import { Lists } from "./pages/Lists";

function App() {
  return (
    <Provider store={reduxStore}>
      <LayoutWrapper>
        <Lists></Lists>
      </LayoutWrapper>
    </Provider>
  );
}

export default App;
