import React, {useEffect, useState} from 'react';
import MyNavbar from "../components/MyNavbar/MyNavbar";
import {Card, Container, Form} from "react-bootstrap";
import MyHeader from "../components/MyHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectCurStore, selectUser, setCurStore} from "../redux/slices/auth";
import {getStores, getStoresAvailable} from "../utils/requests/store";
import {getLastExternalOrders, getLastInternalOrders} from "../utils/requests/order";
import ItemsList from "../components/ItemsList";

function MainPage() {
    const dispatch = useDispatch()
    const [stores, setStores] = useState([])
    const [error, setError] = useState("")
    const curStore = useSelector(selectCurStore)
    const user = useSelector(selectUser)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        try {
            if (user)
                if (["SUPERUSER"].includes(user.role.name))
                    getStores().then(res => {
                        const new_res = res.map(item => ({
                            id: item.id,
                            name: item.name,
                            address: item.address
                        }))
                        setStores(new_res)
                        if (new_res.length && curStore === null)
                            dispatch(setCurStore(new_res[0]))
                        setError("")
                    })
                else if (["ADMIN", 'INTERNAL'].includes(user.role.name)) {
                    getStoresAvailable().then(res => {
                        const new_res = res.map(item => ({
                            id: item.id,
                            name: item.name,
                            address: item.address
                        }))
                        setStores(new_res)
                        if (new_res.length && curStore === null)
                            dispatch(setCurStore(new_res[0]))
                        setError("")
                    })
                } else if (user.role.name === "EXTERNAL" && user && curStore === null)
                    dispatch(setCurStore(user.id))
        } catch (e) {
            if (e.name === "AxiosError") {
                setError(e.response.data.message)
            }
        }

    }, [user, curStore])

    useEffect(() => {

        if (curStore && user) {
            if (user.role.name === "EXTERNAL") {
                getLastExternalOrders().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        date_arrive: item.date_arrive.slice(0, 10),
                        status: item.status,
                        order_type: item.order_type,
                        destination: item.destinationId || item.destinationUserId,
                        source: item.sourceId || item.sourceUserId,
                    }))
                    setOrders(new_res)
                })
            } else {
                getLastInternalOrders(curStore.id).then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        date_arrive: item.date_arrive.slice(0, 10),
                        status: item.status,
                        order_type: item.order_type,
                        destination: item.destinationId || item.destinationUserId,
                        source: item.sourceId || item.sourceUserId,
                    }))
                    setOrders(new_res)
                })
            }
        } else {
            setOrders([])
        }

    }, [curStore, user])

    const handleChange = ({target: {value}}) => {
        if (parseInt(value) === -1) {
            dispatch(setCurStore(null))
        } else {
            let selectedStore = stores.find(store => {
                return store.id === parseInt(value)
            })
            dispatch(setCurStore(selectedStore))
        }
    }
    return (
        <>
            <MyHeader>
                <h1>Главная</h1>
            </MyHeader>
            <Container fluid="md">

                {
                    user?
                    ["ADMIN", "SUPERUSER", 'INTERNAL'].includes(user.role.name) ?
                        <Form.Select
                            name="role"
                            onChange={handleChange}
                            value={curStore ? curStore.id : -1}
                        >
                            <option value={-1}>выберите склад</option>
                            {stores.map((store, index) => (
                                <option
                                    value={store.id}
                                >{store.name}</option>
                            ))}
                        </Form.Select>
                        : ""
                        :""
                }

                {error !== "" ? <div>{error}</div> : ""}
                <Card className="mt-3">
                    <Card.Header>Ближайшие поступления</Card.Header>
                    <ItemsList
                        items={orders}
                        link={"/orders"}
                        thread_names={["id", "дата прибытия", "статус", "тип заказа", "инициатор", "исполнитель"]}
                    />
                </Card>
            </Container>
            <MyNavbar/>
        </>
    )
}

export default MainPage;