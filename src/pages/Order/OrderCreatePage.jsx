import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/auth";
import MyHeader from "../../components/MyHeader";
import {Button, Container, Form, Image, Modal, Table} from "react-bootstrap";
import {createOrderExternal, createOrderInternal} from "../../utils/requests/order";
import {selectCurStore} from "../../redux/slices/auth";
import {createOrderArticle} from "../../utils/requests/orderArticle";
import data from "bootstrap/js/src/dom/data";

export default function OrderCreatePage() {
    const navigate = useNavigate()

    const [item, setItem] = useState({
        date_arrive: "",
    });

    const [orderType, setOrderType] = useState("external");

    const [books, setBooks] = useState([]);


    const curUser = useSelector(selectUser)

    const curStore = useSelector(selectCurStore)

    const [error, setError] = useState("")

    const initCurBook = {
        index: -1,
        book: {
            article_number: "",
            name: "",
            author: "",
            count: ""
        }
    }

    const [curBook, setCurBook] = useState(initCurBook);

    const handleChange = ({target: {value, name}}) => {
        setItem({...item, [name]: value})
    }

    const handleChangeOrderType = ({target: {value}}) => {
        setOrderType(value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(item).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        if (!/\d\d\d\d-\d\d-\d\d/i.test(item.date_arrive)) { setError("некоректная дата. пример:(2020-10-10)"); return;}
        let order;
        try {
            if (orderType === "internal")
                order = await createOrderInternal(curStore.id, item)
            else if (orderType === "external") {
                if (curUser.role.name !== "EXTERNAL")
                    order = await createOrderExternal({
                        date_arrive: item.date_arrive,
                        storeId: curStore.id
                    })
                else {
                    order = await createOrderExternal({
                        date_arrive: item.date_arrive,
                    })
                }
            } else
                return
            setError("Успешно")

            for (let book of books) {
                try {
                    book["orderId"] = order.id;
                    await createOrderArticle(order.id, book)
                } catch (e) {
                    setError(e.response.data.message)
                    break
                }
            }
            navigate("/orders")
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    const handleChangeModal = ({target: {value, name}}) => {
        setCurBook({
            ...curBook,
            book: {
                ...curBook.book,
                [name]: value
            }
        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (index) => {
        if (index === -1)
            setCurBook(initCurBook)
        else
            setCurBook({
                index: index,
                book: books[index]
            })
        setShow(true);
    }

    const submitModal = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(curBook.book).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        if (curBook.index === -1) {
            let tempBooks = books
            tempBooks.push(curBook.book)
            setBooks(tempBooks)
        } else {
            let tempBooks = books
            tempBooks[curBook.index] = curBook.book
            setBooks(tempBooks)
        }
        setShow(false)
    }

    return (
        <>
            <MyHeader>
                <h1>Создание заказа</h1>
                <Button
                    onClick={() => navigate("/orders")}
                >Назад
                </Button>
            </MyHeader>
            <Container fluid="md">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formOrderType"
                    >
                        <Form.Label>Тип заказа</Form.Label>
                        {curUser.role.name !== "EXTERNAL" ?
                            <Form.Select
                                name="orderType"
                                onChange={handleChangeOrderType}
                                value={orderType}
                            >
                                <option value="external">Внешний</option>
                                <option value="internal">Внутренний</option>
                            </Form.Select>
                            : <span>: Внешний</span>
                        }
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formDate"
                    >
                        <Form.Label>Дата</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите дату"
                            name="date_arrive"
                            value={item.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Table
                        striped
                        bordered
                        hover
                    >
                        <thead>
                        <tr>
                            {books && books.length ?
                                Object.keys(books[0]).map(key => (
                                    <th>{key}</th>
                                )) : (<th>Нет итемов</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {books && books.length ? books.map((book, index) => (
                            <tr>
                                {Object.values(book).map(atr => (
                                    <th>{atr}</th>
                                ))}
                                <th>
                                    <Image
                                        src="/assets/pen.svg"
                                        onClick={() => handleShow(index)}
                                        width="24px"
                                    />
                                </th>
                            </tr>
                        )) : (
                            <tr>
                                <th>нет итемов</th>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    <Button
                        className="w-100"
                        onClick={() => handleShow(-1)}
                    >Добавить книгу</Button>

                    {error !== "" ? <div>{error}</div> : ""}

                    <Button
                        className="w-100 mt-3"
                        variant="primary"
                        type="submit"
                    >
                        Создать
                    </Button>
                </Form>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Книга</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitModal}>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="modalArticle"
                        >
                            <Form.Label>Артикль</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите артикль"
                                name="article_number"
                                value={curBook.book.article_number}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="modalName"
                        >
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                name="name"
                                value={curBook.book.name}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="modalAuthor"
                        >
                            <Form.Label>Автор</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите автора"
                                name="author"
                                value={curBook.book.author}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="modalCount"
                        >
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите количество"
                                name="count"
                                value={curBook.book.count}
                                onChange={handleChangeModal}
                            />
                        </Form.Group>
                        {error !== "" ? <div>{error}</div> : ""}


                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Обновить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}