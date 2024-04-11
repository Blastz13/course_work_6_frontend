import React, {useEffect, useState} from "react";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import {getUser, updateUserAdmin} from "../../utils/requests/user";
import {useNavigate, useParams} from "react-router-dom";
import {getRoles} from "../../utils/requests/role";
import {getStores} from "../../utils/requests/store";

export default function UserPage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [stores, setStores] = useState([])
    const [roles, setRoles] = useState([])
    const [error, setError] = useState("")
    const [user, setUser] = useState({
        email: "",
        phone: "",
        stores: [],
        roleId: {}
    });

    useEffect(() => {

            getRoles().then(res => {
                const new_res = res.data.map(item => ({
                    id: item.id,
                    name: item.name,
                }))
                setRoles(new_res)
            })
            getStores().then(res => {
                const new_res = res.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    address: item.address
                }))
                setStores(new_res)
            })

    }, [])

    useEffect(() => {
        if (id)
            getUser(id).then(res => {
                let new_res;
                if (res.dataroleId === 4) {
                    new_res = (({
                                    email,
                                    phone,
                                    roleId
                                }) => ({
                        email,
                        phone,
                        roleId
                    }))(res)
                } else {
                    new_res = (({
                                    email,
                                    phone,
                                    stores,
                                    roleId
                                }) => ({
                        email,
                        phone,
                        stores: stores.map(item => item.id),
                        roleId
                    }))(res)
                }

                setUser(new_res)
            })
    }, [id])

    const handleChange = ({target}) => {
        if (target.name === "stores") {
            let new_storesId = user.stores
            if (target.checked) {
                new_storesId.push(parseInt(target.value))
                setUser({...user, [target.name]: new_storesId})
            } else {
                new_storesId = new_storesId.filter((e) => e !== parseInt(target.value))
                setUser({...user, [target.name]: new_storesId})
            }
        } else {
            setUser({...user, [target.name]: target.value})
        }
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(user).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        try {
            await updateUserAdmin(id, user)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    return (
        <>

            <MyHeader>
                <h1>Управление пользователем</h1>
                <Button
                    onClick={() => navigate("/users")}
                >Назад
                </Button>
            </MyHeader>
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
                            {roles.map(item => (
                                <option
                                    value={item.id}
                                    selected={item.id === user.roleId}
                                >{item.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>


                    {user && user.roleId === 4 ? "" :

                        <Form.Group
                            className="mb-3"
                            controlId="formStores"
                        >
                            <Form.Label>Склады</Form.Label>

                            {stores.map(item => (
                                <Form.Check
                                    name="stores"
                                    id={`stores-${item.id}`}
                                    onChange={handleChange}
                                    value={item.id}
                                    label={item.name}
                                    checked={user.stores.includes(item.id)}
                                />


                            ))}

                        </Form.Group>
                    }
                    <Form.Group
                        className="mb-3"
                        controlId="formPhone"
                    >
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Введите номер телефона"
                            name="phone"
                            value={user.phone}
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
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Обновить
                    </Button>
                </Form>
            </Container>
            <MyNavbar/>
        </>
    )
}

