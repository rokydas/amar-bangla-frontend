import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../App';

const PrivateRoute = ({ children }) => {

    const [loggedInUser] = useContext(AuthContext)

    if (!loggedInUser?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
}

export default PrivateRoute;