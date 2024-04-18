import React, {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectToken, selectUserError} from "../../redux/slices/auth";
import {Container} from "react-bootstrap";

export default function AuthRootPage() {

    const navigate = useNavigate();
    const location = useLocation()
    const token=useSelector(selectToken)
    const error = useSelector(selectUserError)

    useEffect(() => {
        if (token) {
            navigate(location?.state?.prevUrl)
        }
    }, [token])



    return (
        <>
            <Outlet/>
            {error === "" ? "" : <Container>{error}</Container>}
        </>
    )
}