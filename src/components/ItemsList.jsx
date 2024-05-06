import React from "react";
import {Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import classes from "./TableScroll.module.css";

const ItemsList = ({title, items, link, thread_names, scrollable}) => {
    return (
        <Container fluid="md" >
            {title ? <h3>{title}</h3> : ""}

                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className={"text-nowrap"}
                >
                    <thead>
                    <tr >
                        {thread_names && thread_names.length ?
                            thread_names.map(key => (
                                <th>{key}</th>
                            )) : (<th>Нет итемов</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {items && items.length ? items.map(item => (
                        <tr>
                            {
                                Object.values(item).map(atr => (
                                    <td>
                                        <Link to={`${link}/${item.id}`}>
                                            {atr}
                                        </Link>
                                    </td>
                                ))
                            }
                        </tr>
                    )) : (<tr>
                        <th colSpan={thread_names.length}>нет итемов</th>
                    </tr>)}
                    </tbody>
                </Table>
        </Container>
    )
}

export default ItemsList