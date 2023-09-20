import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHeader from "./components/NavbarHeader";
import CreateUser from "./components/CreateUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataList from "./components/DataList";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarHeader />
        <Routes>
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/" element={<DataList />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
