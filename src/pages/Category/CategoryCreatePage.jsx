import React, {useState} from "react";

import MyHeader from "../../components/MyHeader";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {createCategory} from "../../utils/requests/category";

export default function CategoryCreatePage() {
    const navigate = useNavigate()
    const [category, setCategory] = useState({
        name: ""
    });



    const [error, setError] = useState("")

    const handleChange = ({target: {value, name}}) => {
        setCategory({...category, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(category).some((val) => !val);
        if (isEmpty) { setError("не все данные заполнены"); return;}
        try {
            await createCategory(category)
            setError("Успешно")
        } catch (e) {
            setError(e.response.data.message)
        }
    }
    return (
        <>
            <MyHeader>
                <h1>Создание категории</h1>
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