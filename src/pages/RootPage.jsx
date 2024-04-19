import React, {useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import MyNavbar from "../components/MyNavbar/MyNavbar";
import {useSelector} from "react-redux";
import {selectStatus, selectSuccess, selectToken, selectUser} from "../redux/slices/auth";

function RootPage() {
    const token = useSelector(selectToken)
    const RequireAuth = ({children}) => {
        const location = useLocation();
        if (!token) {
            return <Navigate
                to="/auth/login"
                state={{prevUrl: location.pathname}}
            />
        }
        return children;
    }

    return (
        <RequireAuth>
            <Outlet/>
            <MyNavbar/>
        </RequireAuth>
    )
}

export default RootPage