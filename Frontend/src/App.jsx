import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./Pages/Home";
import DepartmentsPage from "./Pages/Departments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
