import React from "react";
import classes from "./MyNavbar.module.css";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/auth";

function MyNavbar() {
    const curUser = useSelector(selectUser)
    return (
        <div className={classes.navbar}>
            <Container fluid="md" className={`${classes.inner} d-flex justify-content-between`}>
                <Link to="/">
                    <img src="/assets/home.svg" alt=""/>
                </Link>
                {
                    curUser ? curUser.role.name === "EXTERNAL"
                        ? ""
                        : <Link to="/articles">
                            <img src="/assets/library.svg" alt=""/>
                        </Link>
                        :""
                }
                <Link to="/orders">
                    <img src="/assets/orders.svg" alt=""/>
                </Link>
                <Link to="/statistic">
                    <img src="/assets/statistic.svg" alt=""/>
                </Link>
                <Link to="/settings">
                    <img src="/assets/settings.svg" alt=""/>
                </Link>
            </Container>
        </div>
    )
}

export default MyNavbar;