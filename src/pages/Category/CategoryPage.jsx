import React, {useEffect, useState} from "react";

import {deleteCategory, getCategory, updateCategory} from "../../utils/requests/category";
import {Button, Container, Form, Modal} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useNavigate, useParams} from "react-router-dom";

export default function CategoryPage() {
    const [category, setCategory] = useState({
        name: "",
    })
    const navigate = useNavigate()

    const {id} = useParams()
    const [error, setError] = useState("")



    useEffect(() => {

            getCategory(id).then(res => {
                const new_res = (({name}) =>
                    ({name}))(res);
                setCategory(new_res)
            })
    }, [id])


    const handleChange = ({target: {value, name}}) => {
        setCategory({...category, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(category).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        try {
            await updateCategory(id, category)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
    }

    const submitModal = async (e) => {
        e.preventDefault();
        try {
            await deleteCategory(id.toString())
            setError("Успешно")
            navigate("/categories")
        } catch (e) {
            setError(e.response.data.message)
        }
        setShow(false)
    }

    return (
        <>
            <MyHeader>
                <h1>Категория</h1>
                <Button
                    onClick={() => navigate("/categories")}
                >Назад
                </Button>
            </MyHeader>
            <Container fluid="md">
                <Form onSubmit={submitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formName"
                    >
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {error !== "" ? <div>{error}</div> : ""}
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Обновить
                        </Button>
                        <Button
                            variant="danger"
                            type="button"
                            onClick={handleShow}
                        >
                            Удалить
                        </Button>
                    </div>
                </Form>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Form onSubmit={submitModal}>
                    <Modal.Body>

                        Вы действительно хотите удалить эту категорию?
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
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}