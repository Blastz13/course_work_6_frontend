import React, {useState} from "react";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {authUser} from "../../redux/slices/auth";
import {Link, useNavigate} from "react-router-dom";

function LoginPage() {

    const [error, setError]= useState("")

    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({
        email: "",
        password: ""
    });


    const handleChange = ({target: {value, name}}) => {
        setAuthData({...authData, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(authData).some((val) => !val);
        const regex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[а-яА-Яа-яА-Яa-zA-Z0-9-]+(\.[а-яА-Яa-zA-Z0-9]+)*(\.[a-zA-Z0-9]+)$/;
        if (isEmpty) { setError("не все данные заполнены"); return;}
        if (!regex.test(authData.email)) { setError("некоректный email"); return;}
        dispatch(authUser(authData));
        setError("")
    }


    return (
        <>
            <MyHeader><h1>Авторизация</h1></MyHeader>
            <Container fluid="md">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            name="email"
                            value={authData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={authData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Войти
                    </Button>
                </Form>
                <Link to={"/auth/registration"}>Регистрация</Link>
            </Container>
        </>
    )
}

export default LoginPage