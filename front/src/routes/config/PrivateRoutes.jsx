import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
    const user = useAuth();
    const nav = useNavigate()
    useEffect(() => {
        if (!user.token) {
            console.log("GET REDIRECTED")

            return <>{nav("/login")}</>
        };
    }, [user])
    return (<>{children}</>);
};

export default PrivateRoute;
