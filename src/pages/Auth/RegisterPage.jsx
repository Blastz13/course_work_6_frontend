import React, {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, selectToken, selectUserError} from "../../redux/slices/auth";
import {Link, useLocation, useNavigate} from "react-router-dom";


function RegisterPage() {
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
        phone: "",
        roleId: {}
    });

    const [error, setError] = useState("")

    const navigate = useNavigate();
    const location = useLocation()
    const token=useSelector(selectToken)


    const handleChange = ({target: {value, name}}) => {
        setAuthData({...authData, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(authData).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        const regex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[а-яА-Яа-яА-Яa-zA-Z0-9-]+(\.[а-яА-Яa-zA-Z0-9]+)*(\.[a-zA-Z0-9]+)$/;
        if (!regex.test(authData.email)) { setError("некоректный email"); return;}
        if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(authData.phone)){ setError("некоректный телефон"); return;}

            dispatch(registerUser(authData));
        setError("")
    }
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])
    return (
        <>
            <MyHeader><h1>Регистрация</h1></MyHeader>
            <Container fluid="md">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formRole"
                    >
                        <Form.Label>Роль</Form.Label>
                        <Form.Select
                            name="roleId"
                            onChange={handleChange}
                        >
                            <option
                                value={3}
                                selected={3 === authData.roleId}
                            >Сотрудник склада</option>
                            <option
                                value={4}
                                selected={4 === authData.roleId}
                            >Поставщик</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formPhone"
                    >
                        <Form.Label>Номер телефона (+7 (111) 111-11-11)</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Введите номер телефона"
                            name="phone"
                            value={authData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
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
                        Зарегистрироваться
                    </Button>
                </Form>

                <Link to={"/auth/login"}>Авторизация</Link>
            </Container>
        </>
    )
}

export default RegisterPage