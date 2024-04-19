import {Container} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {useSelector} from "react-redux";
import {selectCurStore, selectUser} from "../redux/slices/auth";
import {getStatisticArticles, getStatisticOrders} from "../utils/requests/statistic";
import MyHeader from "../components/MyHeader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Заказы за последнюю неделю',
        },
    },
    scale: {
        ticks: {
            precision: 0
        }
    }
};

export const options2 = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Количество товаров',
        },
    },
    scale: {
        ticks: {
            precision: 0
        }
    }
};


export default function StatisticPage() {
    const user = useSelector(selectUser)
    const curStore = useSelector(selectCurStore)

    const [data, setData] = useState();
    const [data2, setData2] = useState();

    useEffect(() => {
        if (user && curStore) {
            getStatisticOrders(parseInt(curStore.id)).then(res => {
                setData({
                    labels: res.dates.map(date => date.slice(0, 10)),
                    datasets: [
                        {
                            label: 'Прибытие',
                            data: res.count_arrive_orders,
                            backgroundColor: 'rgba(255, 99, 132)',
                        },
                        {
                            label: 'Отправка',
                            data: res.count_send_orders,
                            backgroundColor: 'rgba(53, 162, 235)',
                        },
                    ],
                })
            })
            getStatisticArticles(parseInt(curStore.id)).then(res => {
                setData2({
                    labels: res.names,
                    datasets: [
                        {
                            label: 'Количество',
                            data: res.count,
                            backgroundColor: 'rgba(255, 99, 132)',
                        },
                    ],
                })
            })
        }
    }, [user, curStore])


    return (
        <>
            <MyHeader>
                <h1 className="me-auto">Статистика</h1>
                {user && user.role.name !== "EXTERNAL" ?
                    <>
                        <h5 className="me-auto">текущий склад: {curStore.name}</h5>
                    </>
                    : <></>
                }
            </MyHeader>
            <Container>
                {data ? <Bar data={data} options={options}></Bar> : ""}
                {data2 ? <Bar data={data2} options={options2}></Bar> : ""}
            </Container>
        </>

    )
}