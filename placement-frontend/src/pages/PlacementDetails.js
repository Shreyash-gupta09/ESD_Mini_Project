import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles2.css";

const PlacementDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const placement = location.state?.placement;
  const placementId = placement?.id;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Track selected student card

  useEffect(() => {
    const fetchPlacementStudents = async () => {
      if (!placementId) {
        setError("No placement ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/placement-students?placementId=${placementId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch placement student details.");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacementStudents();
  }, [placementId]);

  const handleCardClick = (studentDetail) => {
    setSelectedStudentId(studentDetail.id); // Track the selected student
    navigate(`/student-details`, {
      state: { student: studentDetail },
    });
  };

  if (loading) {
    return <div className="loading">Loading placement details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="placement-details-container">
      <div className="placement-card">
        <h1>Placement Details for {placement?.organisation}</h1>
        <div className="placement-info">
          <p><strong>Profile:</strong> {placement?.profile}</p>
          <p><strong>Description:</strong> {placement?.description}</p>
          <p><strong>Intake:</strong> {placement?.intake}</p>
          <p><strong>Minimum Grade:</strong> {placement?.minimumGrade}</p>
        </div>
      </div>

      <div className="student-list">
        <h2>Students Applying for This Drive</h2>
        {students.length > 0 ? (
          <div className="student-cards-grid">
            {students.map((studentDetail) => (
              <div
                key={studentDetail.id}
                className={`student-card ${selectedStudentId === studentDetail.id ? "selected" : ""}`} // Apply 'selected' class if this card is clicked
                onClick={() => handleCardClick(studentDetail)}
              >
                <div className="student-card-header">
                  <h3>
                    {studentDetail.student?.firstName} {studentDetail.student?.lastName}
                  </h3>
                  <p>{studentDetail.student?.domain}</p>
                </div>
                <div className="student-card-body">
                  <p><strong>Roll Number:</strong> {studentDetail.student?.rollNumber}</p>
                  <p><strong>Email:</strong> {studentDetail.student?.email}</p>
                  <p><strong>CGPA:</strong> {studentDetail.student?.cgpa}</p>
                  <p><strong>Graduation Year:</strong> {studentDetail.student?.graduationYear}</p>
                  <p><strong>Specialisation:</strong> {studentDetail.student?.specialisation}</p>
                  <p><strong>CV Application:</strong> {studentDetail.cvApplication}</p>
                  <p><strong>About:</strong> {studentDetail.about}</p>
                  <p><strong>Comments:</strong> {studentDetail.comments}</p>
                  <p>
                    <strong>Acceptance:</strong>{" "}
                    {studentDetail.acceptance ? "Accepted" : "Pending"}
                  </p>
                  <p><strong>Application Date:</strong> {studentDetail.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-students">No students found for this placement drive.</div>
        )}
      </div>
    </div>
  );
};

export default PlacementDetails;
