import {axiosInstance} from "./requests";

export async function getStatisticOrders(store_id) {
    try {
        return axiosInstance.get(`/statistic/orders/${store_id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getStatisticArticles(store_id) {
    try {
        return axiosInstance.get(`/statistic/articles/${store_id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}