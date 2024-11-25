import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles.css";

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for messages
  const [messageClass, setMessageClass] = useState(""); // State for message styling
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [jwtToken, setJwtToken] = useState(""); // State to store the JWT token

  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    const data = {
      email,
      password,
    };

    try {
      // Send login request to backend
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the response is not OK (e.g., 400, 404)
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Read the response as text (because JWT is plain text, not JSON)
      const textResponse = await response.text();

      // Check if the response starts with "eyJhbGciOi" (a typical JWT prefix)
      if (textResponse.startsWith("eyJhbGciOi")) {
        // This is a JWT token
        console.log("JWT Token:", textResponse);

        // Store the JWT token in localStorage
        localStorage.setItem("jwtToken", textResponse);

        // Update state with JWT token and success message
        setJwtToken(textResponse);
        setMessage(`Successfully logged in! Your JWT token is: ${textResponse}`);
        setMessageClass("success");
        setIsLoggedIn(true); // Set login status to true
      } else {
        // If it's an error message (e.g., "Wrong Department" or "Invalid credentials")
        console.error("Error:", textResponse);

        // Display the error message from backend
        setMessage(textResponse);
        setMessageClass("error");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
      setMessage("Error: " + error.message);
      setMessageClass("error");
    }
  };

  const handleViewPlacementDrive = () => {
    navigate("/placements"); // Navigate to the placements page
  };

  return (
    <div className="login-container">
      <h1>Employee Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className={`message ${messageClass}`}>{message}</p>}
      {isLoggedIn && jwtToken && (
        <div>
          <button
            className="view-placements-button"
            onClick={handleViewPlacementDrive}
          >
            View Placement Drive
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeLogin;
