import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles2.css";

const PlacementDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const placement = location.state?.placement;
  const placementId = placement?.id;

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudentForAcceptance, setSelectedStudentForAcceptance] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
  // Filter states
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [minGrade, setMinGrade] = useState("");

  // Predefined filter values
  const specializations = [
    "Software Engineering",
    "Data Science",
    "Mechanical Engineering",
    "Cloud Computing",
    "Data Analytics",
    "Artificial Intelligence",
    "Cybersecurity",
    "AI and ML",
    "Software Development",
  ];

  const domains = ["Engineering", "Science", "Commerce"];

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if(!token) {
      navigate('/');
      return;
    }
    const fetchPlacementStudents = async () => {
      if (!placementId) {
        setError("No placement ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/placement-students?placementId=${placementId}`,
          {
            method: "GET", // For GET requests
            headers: {
              "Content-Type": "application/json", // Specify JSON content type
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch placement student details.");
        }

        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacementStudents();
  }, [placementId, navigate]);

  const handleCardClick = (studentDetail) => {
    setSelectedStudentForAcceptance(studentDetail);
    setIsModalVisible(true);
  };

  const applyFilters = () => {
    let filtered = students;

    if (selectedSpecialization) {
      filtered = filtered.filter(
        (studentDetail) =>
          studentDetail.student?.specialisation === selectedSpecialization
      );
    }

    if (selectedDomain) {
      filtered = filtered.filter(
        (studentDetail) => studentDetail.student?.domain === selectedDomain
      );
    }

    if (minGrade) {
      filtered = filtered.filter(
        (studentDetail) => studentDetail.student?.cgpa >= parseFloat(minGrade)
      );
    }

    setFilteredStudents(filtered);
    setShowEligibleOnly(false); // Reset eligible logic when filters are applied
  };

  const resetFilters = () => {
    setSelectedSpecialization("");
    setSelectedDomain("");
    setMinGrade("");
    setFilteredStudents(students);
    setShowEligibleOnly(false); // Reset eligible logic when filters are reset
  };

  const handleEligibleClick = () => {
    const minimumGrade = placement?.minimumGrade || 0;
    const eligibleStudents = students.filter(
      (studentDetail) => studentDetail.student?.cgpa >= minimumGrade
    );
    setFilteredStudents(eligibleStudents);
    setShowEligibleOnly(true);
  };

  const resetStudentList = () => {
    setFilteredStudents(students);
    setShowEligibleOnly(false);
  };

  const handleConfirmSelection = async () => {
    if (!selectedStudentForAcceptance) return;
  
    const studentId = selectedStudentForAcceptance.studentId;
    const acceptanceUrl = `http://localhost:8080/api/placement-students/acceptance?studentId=${selectedStudentForAcceptance.student?.studentId}&placementId=${placementId}`;
    console.log("Student ID:", selectedStudentForAcceptance.studentId);
    console.log("Placement ID:", placementId);
  
    // Retrieve the authorization token
    const token = localStorage.getItem('jwtToken'); // Adjust as per your token storage logic
  
    try {
      const response = await fetch(acceptanceUrl, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to update acceptance.");
      }
  
      // Update student acceptance status locally
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudentForAcceptance.id
            ? { ...student, acceptance: true }
            : student
        )
      );
      setFilteredStudents((prevFilteredStudents) =>
        prevFilteredStudents.map((student) =>
          student.id === selectedStudentForAcceptance.id
            ? { ...student, acceptance: true }
            : student
        )
      );
  
      // Show success message
      setShowSuccessMessage(true);
  
      // Hide modal
      setIsModalVisible(false);
  
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
  
    } catch (err) {
      setError(err.message);
    }
  };
  

  const handleCancelSelection = () => {
    setIsModalVisible(false); // Close the modal
  };

  if (loading) {
    return <div className="loading">Loading placement details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="placement-details-container">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          Placement offered to {selectedStudentForAcceptance?.student?.firstName} {selectedStudentForAcceptance?.student?.lastName}
        </div>
      )}

      <div className="placement-card">
        <h1>Placement Details for {placement?.organisation}</h1>
        <div className="placement-info">
          <p><strong>ID:</strong> {placement?.id}</p>
          <p><strong>Profile:</strong> {placement?.profile}</p>
          <p><strong>Description:</strong> {placement?.description}</p>
          <p><strong>Intake:</strong> {placement?.intake}</p>
          <p><strong>Minimum Grade:</strong> {placement?.minimumGrade}</p>
        </div>
      </div>

      <div className="filter-container">
        <h3>Filters</h3>
        <div className="filter-controls">
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
          >
            <option value="">Select Specialization</option>
            {specializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>

          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <option value="">Select Domain</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Grade"
            value={minGrade}
            onChange={(e) => setMinGrade(e.target.value)}
          />

          <button onClick={applyFilters}>Apply Filters</button>
          <button onClick={resetFilters}>Reset Filters</button>

          {!showEligibleOnly ? (
            <button className="btn-eligible" onClick={handleEligibleClick}>
              Show Eligible Students
            </button>
          ) : (
            <button className="btn-reset" onClick={resetStudentList}>
              Show All Students
            </button>
          )}
        </div>
      </div>

      <div className="student-list">
        <h2>Students Applying for This Drive</h2>

        {filteredStudents.length > 0 ? (
          <div className="student-cards-grid">
            {filteredStudents.map((studentDetail) => (
              <div
                key={studentDetail.id}
                className={`student-card ${
                  selectedStudentId === studentDetail.id ? "selected" : ""
                }`}
                onClick={() => handleCardClick(studentDetail)}
              >
                <div className="student-card-header">
                  <h3>
                    {studentDetail.student?.firstName}{" "}
                    {studentDetail.student?.lastName}
                  </h3>
                  <p>{studentDetail.student?.domain}</p>
                </div>
                <div className="student-card-body">
                  <p><strong>Student ID:</strong> {studentDetail.student?.studentId}</p>
                  <p><strong>Roll Number:</strong> {studentDetail.student?.rollNumber}</p>
                  <p><strong>Email:</strong> {studentDetail.student?.email}</p>
                  <p><strong>CGPA:</strong> {studentDetail.student?.cgpa}</p>
                  <p><strong>Graduation Year:</strong> {studentDetail.student?.graduationYear}</p>
                  <p><strong>Specialisation:</strong> {studentDetail.student?.specialisation}</p>
                  <p 
                    className={`status ${studentDetail.acceptance ? "accepted" : "not-accepted"}`}
                  >
                    <strong>Status:</strong> {studentDetail.acceptance ? "Accepted" : "Not Accepted"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-students">No students found for this placement drive.</div>
        )}
      </div>

      {/* Modal for confirmation */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Do you want to select this student for the offer?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmSelection}>Yes</button>
              <button onClick={handleCancelSelection}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementDetails;