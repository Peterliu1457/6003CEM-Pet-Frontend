

import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children
}) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to={'/auth/login'}/>
    
};

export default PrivateRoute;