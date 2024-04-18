import React, {useEffect, useState} from "react";
import ItemsList from "../../components/ItemsList";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/auth";
import MyHeader from "../../components/MyHeader";
import {selectCurStore} from "../../redux/slices/auth";
import {getStoreArticles} from "../../utils/requests/storeArticle";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {getCategories} from "../../utils/requests/category";

export default function StoreArticlesPage() {

    const navigate = useNavigate()

    const curStore = useSelector(selectCurStore)

    const [articles, setArticles] = useState([])

    const [error, setError] = useState("")

    const [categories, setCategories] = useState([])


    const user = useSelector(selectUser)

    const [query, setQuery] = useState({
        search: "",
        categoryId: 0,
    })
    const handleChange = ({target: {value, name}}) => {
        setQuery({...query, [name]: value})
    }

    useEffect(() => {
        if (curStore) {
            getStoreArticles(curStore.id, query).then(res => {
                const new_res = res.map(item => ({
                    id: item.id,
                    article: item.article_number,
                    name: item.name,
                    author: item.author,
                    categoryId: item.categoryId,
                    count: item.count
                }))
                setArticles(new_res)
                setError("")
            }).catch(e => {
                setError(e.response.data.message)
            })
        }

    }, [curStore, query])

    useEffect(() => {
            getCategories().then(res => {
                setCategories(res)
            }).catch(e => {
                setError(e.response.data.message)
            })
    }, [])


    return (
        <>
            <MyHeader>
                <h1>Баланс</h1>
                {user && user.role.name !== "EXTERNAL" ?
                    <>
                        <h5>текущий склад: {curStore.name}</h5>
                    </>
                    : <></>
                }
                <Button
                    onClick={() => navigate("/articles/create")}
                >Создать
                </Button>
            </MyHeader>
            <Container fluid="md">
                <Form className="d-flex flex-column gap-3">
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Поиск"
                        value={query.search}
                        onChange={handleChange}
                    />
                    <Form.Select
                        name="categoryId"
                        onChange={handleChange}
                    >
                        <option value={0}>Выберите категорию</option>
                        {categories.map(category => (
                            <option value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form>
            </Container>
            <ItemsList
                items={articles}
                link="/articles"
                thread_names={["id", "артикль", "имя", "автор", "категория", "количество"]}
            />
        </>
    )
}