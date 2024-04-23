import {Button, Container, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import MyHeader from "../../components/MyHeader";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../../redux/slices/auth";
import OrdersBursePage from "../../components/OrdersBursePage";
import OrdersPage from "../../components/OrdersPage";

export default function OrdersPageGeneral() {
    const user = useSelector(selectUser)
    const curStore = useSelector(selectCurStore)
    const [page, setPage] = useState('cur')
    const handleChange = (val) => setPage(val);


    return (
        <>
            <MyHeader>
                <h1 className="me-auto">Заказы</h1>
                {user && user.role.name !== "EXTERNAL" ?
                    <>
                        <h5 className="me-auto">текущий склад: {curStore.name}</h5>
                    </>
                    : <></>
                }
                <Button
                    as={Link}
                    to="/orders/create"
                >Оформить заявку</Button>
            </MyHeader>
            <Container fluid="md">
                <ToggleButtonGroup size="lg" className="w-100" type="radio" name="page" defaultValue={"done"}
                                   value={page} onChange={handleChange}>
                    <ToggleButton id="tbg-radio-11" value={"cur"}>
                        Текущие
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-22" value={"burse"}>
                        Биржа
                    </ToggleButton>
                </ToggleButtonGroup>
            </Container>
            {
                page === 'cur' ? <OrdersPage/> : <OrdersBursePage/>
            }
        </>
    )
}
