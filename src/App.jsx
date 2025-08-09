// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/employees/create" element={<CreateEmployeePage />} />
        <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
