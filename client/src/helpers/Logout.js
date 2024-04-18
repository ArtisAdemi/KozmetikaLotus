import { useNavigate } from "react-router-dom";

import React from 'react'

const Logout = () => {
    const navigate = useNavigate();

     const logout = () => {
    
        localStorage.clear("token");
        navigate("/login");
    }

    return {
        logout
    }
}

export default Logout;