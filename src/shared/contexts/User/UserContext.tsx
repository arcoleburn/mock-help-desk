// UserContext.tsx
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  id: string;
  username: string;
  login: (id: string, username: string, admin: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  isAdmin: false,
  id: "",
  username: "",
  login: () => {},
  logout: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter()
  const clientLogin = async (id, user, admin) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUsername(user);
    setIsAdmin(admin);
    localStorage.setItem("user", JSON.stringify({ id, user, admin }));
  };

  const clientLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId("");
    localStorage.removeItem("user");
    router.push('/login')
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { id, user, admin } = JSON.parse(storedUser);
      clientLogin(id, user, admin);
    }
  }, []); 

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        login: clientLogin,
        logout: clientLogout,
        username,
        id: userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
