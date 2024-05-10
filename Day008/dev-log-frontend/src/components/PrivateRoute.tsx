/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';


const PrivateRoute: React.FC<any> = (props: any) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return props.element;
};

export default PrivateRoute;
