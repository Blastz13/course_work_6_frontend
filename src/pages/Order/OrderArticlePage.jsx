import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getOrderArticle, updateOrderArticle} from "../../utils/requests/orderArticle";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";

export default function OrderArticlePage() {
    const navigate = useNavigate()

    const {id} = useParams()
    const {articleId} = useParams()

    const [error, setError] = useState("")


    const [item, setItem] = useState({
        article_number: "",
        name: "",
        author: "",
        count: ""
    })


    useEffect(() => {
        if (id && articleId)
            try {
                getOrderArticle(id, articleId).then(res => {
                    const new_res = (({article_number, name, author, count, category}) =>
                        ({article_number, name, author, count, category}))(res);
                    setItem(new_res)
                })
            } catch (e) {
                setError(e.response.data.message)
            }
    }, [articleId, id])



    return (
        <>
            <MyHeader>
                <h1>Товар</h1>
                <Button
                    onClick={() => navigate(`/orders/${id}`)}
                >Назад
                </Button>
            </MyHeader>
            <Container fluid="md">
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="formArticle"
                    >
                        <Form.Label>Артикль</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите артикль"
                            name="article_number"
                            value={item.article_number}

                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя"
                            name="name"
                            value={item.name}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formAuthor"
                    >
                        <Form.Label>Автор</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите автора"
                            name="author"
                            value={item.author}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formCount"
                    >
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите количество"
                            name="count"
                            value={item.count}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                </Form>
            </Container>
        </>
    )
}