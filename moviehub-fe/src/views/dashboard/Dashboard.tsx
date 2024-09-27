import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiMovieHub } from "../../constant/Api";
import Button from "../../component/button/Button";

interface User {
  id: string; // Adjusted to match Go model's ID field
  username: string;
  // Include other user properties if needed
}



const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null); // Explicitly type the state

  const handleLogout = async() => {
    try {
        const response = await axios.post(ApiMovieHub.logout, {}, { withCredentials: true });
    
        if (response.status === 200) {
          console.log("Logged out successfully");
          navigate("/login"); // Redirect to login or home page
        }
      } catch (error) {
        console.error("Failed to log out", error);
      }
}

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(ApiMovieHub.currentUser, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            console.error("Unauthorized access. Redirecting...");
            navigate("/login"); // Redirect to login if unauthorized
          }
        }
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>; // Optional loading state while fetching user
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Your user ID is {user.id}</p> {/* Adjusted ID field */}
      {/* Include more user info if needed */}
      <Button label={"Logout"} onClick={handleLogout}/>
    </div>
  );
};

export default Dashboard;
