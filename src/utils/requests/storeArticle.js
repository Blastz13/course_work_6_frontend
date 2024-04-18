import {axiosInstance} from "./requests";

export async function createStoreArticle(storeId, data) {
    try {
        return await axiosInstance.post(`/store_article/${storeId}/article`, data).then(res => res.data);
    } catch (err) {
        throw err
    }
}

export async function getStoreArticles(storeId, query) {
    try {
        let query_string = ""
        if (query.search !== "")
            query_string += `?search=${query.search}`
        if (parseInt(query.categoryId) !== 0)
            query_string += `?categoryId=${query.categoryId}`
        return await axiosInstance.get(`/store_article/${parseInt(storeId)}/article` + query_string).then(res => res.data);
    } catch (err) {
        throw err
    }
}

export async function getStoreArticle(storeId, id) {
    try {
        return axiosInstance.get(`/store_article/${storeId}/article/${id}`).then(res => res.data)
    } catch (e) {
        throw e;
    }
}

export async function updateStoreArticle(storeId, id, data) {
    try {
        return await axiosInstance.put(`/store_article/${storeId}/article/${id}`, data)
    } catch (e) {
        throw e;
    }
}

export async function deleteStoreArticle(storeId, id) {
    try {
        return await axiosInstance.delete(`/store_article/${storeId}/article/${id}`)
    } catch (e) {
        throw e;
    }
}

