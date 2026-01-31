import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

const PrivateRoute = ({ children }) => {
    const user = getCurrentUser();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default PrivateRoute;