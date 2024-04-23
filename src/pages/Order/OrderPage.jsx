import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../../redux/slices/auth";
import {confirmOrder, getOrder, performExternalOrder, performInternalOrder} from "../../utils/requests/order";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Modal} from "react-bootstrap";
import {OrderComponent} from "../../components/OrderComponent";
import QRCode from "react-qr-code";
import {ip} from "../../utils/consts";

export default function OrderPage() {
    const navigate = useNavigate()

    const {id} = useParams()

    const [error, setError] = useState("")



    const [item, setItem] = useState(null)

    const curUser = useSelector(selectUser)

    const curStore = useSelector(selectCurStore)


    useEffect(() => {
        if (id) {
            getOrder(id).then(res => {
                const new_art = res.order_articles.map(item => ({
                    id: item.id,
                    article_number: item.article_number,
                    name: item.name,
                    author: item.author,
                    count: item.count,
                    categoryId: item.categoryId
                }));
                const new_res = res;
                new_res['order_articles'] = new_art;
                setItem(new_res)
            })

        }
    }, [ id])

    const submit_perform = async (e) => {
        if (curUser.role.name === "EXTERNAL") {
            try {
                await performExternalOrder(item.id)
            } catch (e) {
                setError(e.response.data.message)
            }
        } else {
            try {
                await performInternalOrder(curStore.id, item.id)
            } catch (e) {
                setError(e.response.data.message)
            }
        }
    }

    const submit_confirm = async (e) => {
        try {
            await confirmOrder(item.id)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }


    const [submit, setSubmit] = useState({
        action: () => {
        },
        text: "none"
    })

    useEffect(() => {
        if (item)
            if (curUser.role.name === "EXTERNAL" && item.order_type === "EXTERNAL") {
                if (item.status === "CREATED" && item.destinationId !== null && item.destinationUserId === null)
                    setSubmit({
                        action: submit_perform,
                        text: "Принять"
                    })
                if (item.status === "ACCEPTED" && item.destinationUserId === curUser.id)
                    setSubmit({
                        action: submit_perform,
                        text: "Подтвердить"
                    })
            } else {
                if (item.status === "CREATED" && item.destinationId !== curStore.id)
                    setSubmit({
                        action: submit_perform,
                        text: "Принять"
                    })
                else if (item.status === "ACCEPTED" && item.destinationId === curStore.id)
                    setSubmit({
                        action: submit_confirm,
                        text: "Подтвердить"
                    })
            }
    }, [curUser, item, curStore])


    return (
        <>
            <MyHeader>
                <h1>Заказ</h1>
                <Button
                    onClick={() => navigate("/orders")}
                >Назад
                </Button>
            </MyHeader>
            <OrderComponent order={item}/>
            {submit.text === "none" ? "" :
                <Container fluid="md">
                    <Button onClick={submit.action}>{submit.text}</Button>
                    {error !== "" ? <div>{error}</div> : ""}
                </Container>
            }
        </>
    )
}