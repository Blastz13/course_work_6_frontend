import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/auth";
import PageNotFound from "./PageNotFound";
import MyNavbar from "../components/MyNavbar/MyNavbar";

function RootPage() {

    const user = useSelector(selectUser)
    const RequireSuperUser = ({children}) => {
        const location = useLocation();

        if (!user) {
            return <Navigate
                to="/auth/login"
                state={{prevUrl: location.pathname}}
            />
        }

        if (user && user.role.name !== "SUPERUSER") {
            return <PageNotFound/>
        }
        return children;
    }

    return (
            <RequireSuperUser>
                <Outlet/>
                <MyNavbar/>
            </RequireSuperUser>
    )
}

export default RootPage