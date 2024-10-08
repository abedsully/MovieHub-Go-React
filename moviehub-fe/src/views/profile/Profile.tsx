import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiMovieHub } from "../../constant/Api";
import IUser from "../../interfaces/IUser";
import Avatar from "../../component/avatar/Avatar";
import logo from "../../assets/logo.png";

const Profile = () => {
  const [user, setUser] = useState<IUser>();
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const { id } = useParams();
  const userIdString = String(id);

  const handleSubmit = async () => {
    console.log("Submitting:", username, profilePicture); // Log values

    const formData = new FormData();
    if (username) {
      formData.append("username", username);
    }
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      const response = await axios.put(
        `${ApiMovieHub.editProfile(userIdString)}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetail = await axios.get(
          `${ApiMovieHub.getUserByUserId(userIdString)}`,
          { withCredentials: true }
        );
        setUser(userDetail.data);
        setUsername(userDetail.data.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="text-white mt-[4rem]">
          {user?.profile_picture ? (
            <Avatar
              image={`http://localhost:8080/uploads/${user.profile_picture}`}
              size={40}
            />
          ) : (
            <Avatar image={logo} size={40} />
          )}
          <h1 className="text-2xl font-bold text-center">{user?.username}</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-white">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="block w-full text-gray-500"
            />
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
