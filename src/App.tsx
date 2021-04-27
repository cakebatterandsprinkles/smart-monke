import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
