// UserContext.tsx
import React, { createContext, useState, useContext } from "react";

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
  id:'',
  username: '',
  login: () => {},
  logout: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState('')
  const clientLogin = async (id, user, admin) => {
    setIsLoggedIn(true)
    setUserId(id)
    setUsername(user)
    setIsAdmin(admin)
  };

  const clientLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId("");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, isAdmin, login: clientLogin, logout: clientLogout, username, id: userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
