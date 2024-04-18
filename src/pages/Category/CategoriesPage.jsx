import React, {useEffect, useState} from "react";
import ItemsList from "../../components/ItemsList";
import MyHeader from "../../components/MyHeader";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getCategories} from "../../utils/requests/category";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getCategories().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                name: item.name,
            }))
            setCategories(new_res)
        })
    }, [])
    return (
        <>
            <MyHeader>
                <h1>Категории</h1>
                <Button as={Link} to={"/categories/create"}>Создать категорию</Button>
            </MyHeader>
            <ItemsList
                items={categories}
                link="/categories"
                thread_names={["id","имя"]}
            />
        </>
    )
}