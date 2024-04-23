import React, {useEffect, useState} from "react";
import {Container, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/auth";
import ItemsList from "./ItemsList";
import {
    getAllOrders,
    getExternalOrders,
    getInternalOrders
} from "../utils/requests/order";
import {selectCurStore} from "../redux/slices/auth";

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [ordersDone, setOrdersDone] = useState([])
    const [ordersSend, setOrdersSend] = useState([])
    const [ordersArrive, setOrdersArrive] = useState([])

    const [curOrders, setCurOrders] = useState([])

    const user = useSelector(selectUser)



    const curStore = useSelector(selectCurStore)

    const [orderType, setOrderType] = useState("done")

    const handleChange = (val) => setOrderType(val);

    useEffect(() => {

            if (user.role.name === "SUPERUSER") {
                getAllOrders().then(res => {
                    let temp_orders = res
                        .filter(item => item.status === "DONE")
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersDone(temp_orders)
                    temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.sourceId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersSend(temp_orders)
                    temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.destinationId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersArrive(temp_orders)


                })
            } else if (["ADMIN", "INTERNAL"].includes(user.role.name)) {
                getInternalOrders(curStore.id).then(res => {
                    let temp_orders = res
                        .filter(item => item.status === "DONE")
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersDone(temp_orders)
                    temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.sourceId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersSend(temp_orders)
                    temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.destinationId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersArrive(temp_orders)
                })
            } else if (user.role.name === "EXTERNAL") {
                getExternalOrders().then(res => {
                    const new_res = res.map(item => ({
                        id: item.id,
                        date_arrive: item.date_arrive.slice(0, 10),
                        status: item.status,
                        order_type: item.order_type,
                        destinationId: item.destinationId,
                        sourceId: item.sourceId,
                        destinationUserId: item.destinationUserId,
                        sourceUserId: item.sourceUserId,
                    }))
                    setOrders(new_res)
                    let temp_orders = res
                        .filter(item => item.status === "DONE")
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersDone(temp_orders)
                    temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.sourceUserId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersSend(temp_orders)
                    temp_orders = res
                        .filter(item => (item.status === "ACCEPTED" && item.destinationUserId === curStore.id))
                        .map(item => ({
                            id: item.id,
                            date_arrive: item.date_arrive.slice(0, 10),
                            status: item.status,
                            order_type: item.order_type,
                            destination: item.destinationId || item.destinationUserId,
                            source: item.sourceId || item.sourceUserId,
                        }))
                    setOrdersArrive(temp_orders)
                })
            }
    }, [user, curStore])

    useEffect(() => {
        if (orderType === "done") {
            setCurOrders(ordersDone)
        } else if (orderType === "send") {
            setCurOrders(ordersSend)
        } else if (orderType === "arrive") {
            setCurOrders(ordersArrive)
        }
    }, [orderType, orders, curStore, ordersSend, ordersArrive, ordersDone])


    return (
        <>
            <Container fluid="md">
                <ToggleButtonGroup size="lg" className="w-100" type="radio" name="orderType"
                                   defaultValue={"done"}
                                   value={orderType} onChange={handleChange}>
                    <ToggleButton id="tbg-radio-1" value={"done"}>
                        Выполненые
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={"send"}>
                        Отправка
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-3" value={"arrive"}>
                        Прибытие
                    </ToggleButton>
                </ToggleButtonGroup>
            </Container>

            <ItemsList
                items={curOrders}
                link={"/orders"}
                thread_names={["id", "дата прибытия", "статус", "тип заказа", "инициатор", "исполнитель"]}
            />


        </>
    )
}