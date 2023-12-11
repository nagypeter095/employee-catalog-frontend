import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employee/add" element={<AddEmployeePage />} />
        <Route path="/employee/edit" element={<EditEmployeePage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
