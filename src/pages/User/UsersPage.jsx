import React, {useEffect, useState} from "react";
import {getUsers} from "../../utils/requests/user";
import ItemsList from "../../components/ItemsList";
import MyHeader from "../../components/MyHeader";

export default function UsersPage() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                email: item.email,
                phone: item.phone,
                role: item.role ? item.role.name: ""
            }))
            setUsers(new_res)
        })
    }, [])

    return (
        <>
            <MyHeader>
                <h1>Пользователи</h1>
            </MyHeader>
            <ItemsList
                items={users}
                link="/users"
                thread_names={["id", "email", "телефон", "роль"]}
            />
        </>
    )
}