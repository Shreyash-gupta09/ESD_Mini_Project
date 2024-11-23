import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./pages/EmployeeLogin"; // Adjusted path for EmployeeLogin
import Placements from "./pages/Placements"; // Adjusted path for Placements

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<EmployeeLogin />} />
      <Route path="/placements" element={<Placements />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
