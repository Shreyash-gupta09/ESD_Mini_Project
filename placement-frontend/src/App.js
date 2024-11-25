import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./pages/EmployeeLogin";
import Placements from "./pages/Placements";
import PlacementDetails from "./pages/PlacementDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/placement_drive" element={<PlacementDetails />} /> {/* Ensure this is correct */}
      </Routes>
    </Router>
  );
}

export default App;
