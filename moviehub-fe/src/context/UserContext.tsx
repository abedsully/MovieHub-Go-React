import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { ApiMovieHub } from "../constant/Api";
import { useNavigate } from "react-router-dom";
import IUser from "../interfaces/IUser";

interface UserContextType {
  user: IUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(ApiMovieHub.currentUser, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user", error);
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context.user;
};
