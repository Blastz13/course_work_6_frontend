import React, {useEffect, useState} from "react";

import {deleteRole, getRole, updateRole} from "../../utils/requests/role";
import {Button, Container, Form, Modal} from "react-bootstrap";
import MyHeader from "../../components/MyHeader";
import {useNavigate, useParams} from "react-router-dom";
export default function RolePage() {

    const navigate = useNavigate()

    const {id} = useParams()

    const [role, setRole] = useState({
        name: "",
    })

    const [error, setError] = useState("")



    useEffect(() => {
        if (id)
            getRole(id).then(res => {
                const new_res = (({name}) =>
                    ({name}))(res);
                setRole(new_res)
            })
    }, [id])


    const handleChange = ({target: {value, name}}) => {
        setRole({...role, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(role).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        try {
            await updateRole(id, role)
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
            await deleteRole(id)
            setError("Успешно")
            navigate("/roles")
        } catch (e) {
            setError(e.response.data.message)
        }
        setShow(false)
    }

    return (
        <>
            <MyHeader>
                <h1>Роль</h1>
                <Button
                    onClick={() => navigate("/roles")}
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
                            value={role.name}
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

                        Вы действительно хотите удалить эту роль?
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