import {axiosInstance} from "./requests";

export async function getRoles() {
    try {
        return axiosInstance.get("/role").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getRole(id) {
    try {
        return axiosInstance.get(`/role/${id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function createRole(data) {
    try {
        return await axiosInstance.post(`/role`, data)
    } catch (e) {
        throw e;
    }
}

export async function updateRole(id, data) {
    try {
        return await axiosInstance.put(`/role/${id}`, data)
    } catch (e) {
        throw e;
    }
}

export async function deleteRole(id) {
    try {
        return axiosInstance.delete(`/role/${id}`)
    } catch (e) {
        throw e;
    }
}