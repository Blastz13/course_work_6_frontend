import {axiosInstance} from "./requests";

export async function getStores() {
    try {
        return await axiosInstance.get("/store").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getStoresAvailable() {
    try {
        return await axiosInstance.get("/store/available").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getStore(id) {
    try {
        return axiosInstance.get(`/store/${id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function updateStore(id, data) {
    try {
        return await axiosInstance.put(`/store/${id}`, data)
    } catch (e) {
        throw e;
    }
}

export async function createStore(data) {
    try {
        return await axiosInstance.post(`/store`, data)
    } catch (e) {
        throw e;
    }
}

export async function deleteStore(id) {
    try {
        return axiosInstance.delete(`/store/${id}`)
    } catch (e) {
        throw e;
    }
}