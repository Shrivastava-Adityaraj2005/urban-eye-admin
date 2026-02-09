import "./App.css";
import NagivationRoot from "./components/NagivationRoot";
import UserContextProvider from "./store/user-context";

function App() {
  return (
    <UserContextProvider>
      <NagivationRoot />
    </UserContextProvider>
  );
}

export default App;
