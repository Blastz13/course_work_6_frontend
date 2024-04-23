import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <Container fluid="md" className="d-flex flex-column justify-content-center align-items-center vh-100">
            <p className="fs-1">404</p>
            <p className="fs-1">Страница не найдена</p>
            <Link to="/">На главную</Link>
            <button
                className="link-primary border-0 bg-white mt-3 text-decoration-underline"
                onClick={() => navigate(-1)}
            >Назад
            </button>
        </Container>
    )
}