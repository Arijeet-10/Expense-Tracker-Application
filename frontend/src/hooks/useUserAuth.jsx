import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User from Context:", user);
    if (user) return; 

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        console.log("Stored User from localStorage:", storedUser);
        
        if (storedUser) {
          updateUser(JSON.parse(storedUser)); // Restore user from localStorage
          return;
        }

        // Fetch user data from API
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
        
        if (isMounted && response.data) {
          updateUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data)); // Save user in localStorage
          console.log("User fetched from API and stored:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);

  return user;
};
