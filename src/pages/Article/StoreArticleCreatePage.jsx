import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button, Container, Form} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useNavigate} from "react-router-dom";
import {selectCurStore} from "../../redux/slices/auth";
import {createStoreArticle} from "../../utils/requests/storeArticle";
import {getCategories} from "../../utils/requests/category";

export default function StoreArticleCreatePage() {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    const [error, setError] = useState("")

    const curStore = useSelector(selectCurStore)

    const [item, setItem] = useState({
        article_number: "",
        name: "",
        author: "",
        categoryId: "",
        count: 0,
        storeId: curStore.id
    })
    const handleChange = ({target: {value, name}}) => {
        setItem({...item, [name]: value})
    }

    useEffect(() => {
        getCategories().then(res => {
            const new_res = res.map(item => ({
                id: item.id,
                name: item.name,
            }))
            setCategories(new_res)
        })
    }, [])
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(item).some((val) => !val);
        if (isEmpty) {
            setError("не все данные заполнены");
            return;
        }
        try {
            if (-1 === parseInt(item.categoryId)) {
                setError("не все данные заполнены");
                return;
            }
            await createStoreArticle(curStore.id, item)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    return (
        <>
            <MyHeader>
                <h1>Товар</h1>
                <Button
                    onClick={() => navigate("/articles")}
                >Назад
                </Button>
            </MyHeader>
            <Container fluid="md">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Артикль</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите артикль"
                            name="article_number"
                            value={item.article_number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название"
                            name="name"
                            value={item.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Автор</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите автора"
                            name="author"
                            value={item.author}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formCategory"
                    >
                        <Form.Label>Роль</Form.Label>
                        <Form.Select
                            name="categoryId"
                            onChange={handleChange}
                            value={item.categoryId ? item.categoryId : -1}
                        >
                            <option value={-1}>выберите категорию</option>
                            {categories.map((category, index) => (
                                <option
                                    value={category.id}
                                >{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите количество"
                            name="count"
                            value={item.count}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Создать
                    </Button>
                </Form>
            </Container>
        </>
    )
}