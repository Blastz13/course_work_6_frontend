import React, {useEffect, useState} from "react";
import {deleteStore, getStore, updateStore} from "../../utils/requests/store";
import {Button, Container, Form, Modal} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useNavigate, useParams} from "react-router-dom";

export default function StorePage() {
    const navigate = useNavigate()

    const {id} = useParams()

    const [error, setError] = useState("")


    const [store, setStore] = useState({
        name: "",
        address: "",
    })

    useEffect(() => {
        if (id)
            getStore(id).then(res => {
                const new_res = (({name, address}) =>
                    ({name, address}))(res);
                setStore(new_res)
            })
    }, [id])

    const handleChange = ({target: {value, name}}) => {
        setStore({...store, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(store).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        try {
            await updateStore(id, store)
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
            await deleteStore(id)
            setError("Успешно")
            navigate("/stores")
        } catch (e) {
            setError(e.response.data.message)
        }
        setShow(false)
    }


    return (
        <>
            <MyHeader>
                <h1>Склад</h1>
                <Button
                    onClick={() => navigate("/stores")}
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
                            value={store.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formAddress"
                    >
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Введите адрес"
                            name="address"
                            value={store.address}
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

                        Вы действительно хотите удалить этот склад?
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