import React, {useEffect, useState} from "react";
import {getStores} from "../../utils/requests/store";
import ItemsList from "../../components/ItemsList";
import MyHeader from "../../components/MyHeader";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function StoresPage() {

    const [stores, setStores] = useState([])


    useEffect(() => {
        getStores().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                name: item.name,
                address: item.address
            }))
            setStores(new_res)
        })
    }, [])

    return (
        <>
            <MyHeader>
                <h1>Склады</h1>
                <Button as={Link} to={"/stores/create"}>Создать склад</Button>
            </MyHeader>
            <ItemsList
                items={stores}
                link="/stores"
                thread_names={["id", "имя", "адрес"]}
            />
        </>
    )
}