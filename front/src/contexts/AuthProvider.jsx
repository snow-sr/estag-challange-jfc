import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")) || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  // const navigate = useNavigate();

  const receiveLogin = (login) => {
    console.log(login)
    if (login) {
      setUser(login.profile);
      setToken(login.status);
      localStorage.setItem("site", login.status);
      localStorage.setItem("profile", JSON.stringify(login.profile))
    }
  }

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, receiveLogin, logOut }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {

  return useContext(AuthContext);
};
