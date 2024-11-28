import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles1.css";

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get Token from Local Storage
    const token = localStorage.getItem('jwtToken');
    if(!token) {
      navigate('/');
      return;
    }
    const fetchPlacements = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/placements", {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`, // Replace yourAuthToken with the actual token
              "Content-Type": "application/json" // Optional: Only needed for JSON payloads
          }
      });
      

        if (!response.ok) {
          throw new Error("Failed to fetch placement data.");
        }

        const data = await response.json();
        setPlacements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [navigate]);

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
            onClick={() => {
              console.log("Clicked placement:", placement); // For debugging
              navigate("/placement_drive", { state: { placement } }); // Pass the full object in state
            }}
            
          >
            <h2>{placement.organisation}</h2>
            <p><strong>ID:</strong> {placement.id}</p>
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
