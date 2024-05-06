import {axiosInstance} from "./requests";


export async function getAllOrders() {
    try {
        return axiosInstance.get("/order/admin").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getOrder(id) {
    try {
        return axiosInstance.get(`/order/${id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getInternalOrders(storeId) {
    try {
        return axiosInstance.get(`/order/internal/${storeId}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function createOrderInternal(storeId, data) {
    try {
        return await  axiosInstance.post(`/order/internal/${storeId}`, data).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getExternalOrders() {
    try {
        return axiosInstance.get("/order/external").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function createOrderExternal(data) {
    try {
        return await  axiosInstance.post(`/order/external`, data).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getBurseInternalOrders(storeId) {
    try {
        return axiosInstance.get(`/order/burse/internal/${storeId}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getMyBurseInternalOrders(storeId) {
    try {
        return axiosInstance.get(`/order/burse/internal/${storeId}/my`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getBurseExternalOrders() {
    try {
        return axiosInstance.get("/order/burse/external").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getMyBurseExternalOrders() {
    try {
        return axiosInstance.get(`/order/burse/external/my`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function performInternalOrder(storeId, id) {
    try {
        return await  axiosInstance.post(`/order/${id}/internal/${storeId}/perform`, {}).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function performExternalOrder(id) {
    try {
        return await  axiosInstance.post(`/order/${id}/external/perform`, {}).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function confirmOrder(id) {
    try {
        return await  axiosInstance.post(`/order/${id}/confirm`, {}).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getLastInternalOrders(storeId) {
    try {
        return await axiosInstance.get(`/order/last/internal/${storeId}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getLastExternalOrders() {
    try {
        return await axiosInstance.get(`/order/last/external`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}