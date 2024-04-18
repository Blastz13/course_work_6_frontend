import {axiosInstance} from "./requests";

export async function getCategories() {
    try {
        return axiosInstance.get("/category").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getCategory(id) {
    try {
        return axiosInstance.get(`/category/${id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function createCategory(data) {
    try {
        return await axiosInstance.post(`/category`, data)
    } catch (e) {
        throw e;
    }
}

export async function updateCategory(id, data) {
    try {
        return await axiosInstance.put(`/category/${id}`, data)
    } catch (e) {
        throw e;
    }
}

export async function deleteCategory(id) {
    try {
        return axiosInstance.delete(`/category/${id}`)
    } catch (e) {
        throw e;
    }
}