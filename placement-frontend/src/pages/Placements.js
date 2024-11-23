import React, { useEffect, useState } from "react";
import "../styles1.css";

const Placements = () => {
  const [placements, setPlacements] = useState([]); // State to hold placement data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/placements");

        if (!response.ok) {
          throw new Error("Failed to fetch placement data.");
        }

        const data = await response.json(); // Parse the JSON response
        setPlacements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []); // Empty dependency array to fetch data once when the component loads

  if (loading) {
    return <div className="loading">Loading placements...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="placements-container">
      <h1>Placement Drives</h1>
      <div className="placements-list">
        {placements.map((placement) => (
          <div
            key={placement.id}
            className="placement-card"
            onClick={() => alert(`Details for: ${placement.profile}`)} // Placeholder for navigation
          >
            <h2>{placement.organisation}</h2>
            <p><strong>Profile:</strong> {placement.profile}</p>
            <p><strong>Description:</strong> {placement.description}</p>
            <p><strong>Intake:</strong> {placement.intake}</p>
            <p><strong>Minimum Grade:</strong> {placement.minimumGrade}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Placements;
