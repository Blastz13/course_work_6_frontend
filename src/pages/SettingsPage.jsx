import React, {useEffect, useState} from "react";
import MyHeader from "../components/MyHeader";
import {Button, Container, Image, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser, setCurStore} from "../redux/slices/auth";
import {getStoresAvailable} from "../utils/requests/store";
import ItemsList from "../components/ItemsList";

function SettingsPage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [error, setError] = useState("")
    const [stores, setStores] = useState([])
    useEffect(() => {
        try {
            if (user)
                if (["ADMIN", 'INTERNAL'].includes(user.role.name)) {
                    getStoresAvailable().then(res => {
                        const new_res = res.map(item => ({
                            id: item.id,
                            name: item.name,
                            address: item.address
                        }))
                        setStores(new_res)
                        setError("")
                    })
                } else if (user.role.name === "EXTERNAL" && user)
                    dispatch(setCurStore(user.id))
        } catch (e) {
            if (e.name === "AxiosError") {
                setError(e.response.data.message)
            }
        }

    }, [user])
    return (
        <>
            <MyHeader>
                <h1>Профиль</h1>
                <Image
                    onClick={() => dispatch(logout())}
                    width={36}
                    src="/assets/exit.svg"
                />
            </MyHeader>
            <Container fluid="md">
                {user ?
                    <>
                        <ListGroup>
                            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                            <ListGroup.Item>Роль: {user.role ? user.role.name : ""}</ListGroup.Item>
                            <ListGroup.Item>Номер: {user.phone ? user.phone : ""}</ListGroup.Item>
                        </ListGroup>
                        {user ? user.role.name === "INTERNAL" ?
                            <ItemsList
                                title="Склады"
                                items={stores}
                                thread_names={["id", "имя", "адрес"]}
                                scrollable={true}
                            />
                            : "" : ""
                        }
                    </>
                    : ""}

                {
                    user?
                    ["SUPERUSER", "ADMIN"].includes(user.role.name)
                        ? <div className="d-flex flex-column gap-3">
                            <Button
                                as={Link}
                                to={"/users"}
                            >Управление пользователями</Button>
                            <Button
                                as={Link}
                                to={"/stores"}
                            >Управление складами</Button>
                            <Button
                                as={Link}
                                to={"/roles"}
                            >Управление ролями</Button>
                            <Button
                                as={Link}
                                to={"/categories"}
                            >Управление категориями</Button>
                        </div>
                        : ""
                        :""
                }

            </Container>
        </>
    )
}

export default SettingsPage;