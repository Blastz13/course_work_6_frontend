import {axiosInstance} from "./requests";

export async function getUsers() {
    try {
        return axiosInstance.get("/user").then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function getUser(id) {
    try {
        return await axiosInstance.get(`/user/${id}`).then(res=>res.data)
    } catch (e) {
        throw e;
    }
}

export async function updateUserAdmin(id, data) {
    try {
        return await  axiosInstance.put(`/user/perms/${id}`, data)
    } catch (e) {
        throw e;
    }
}

export async function deleteUser(id) {
    try {
        return await  axiosInstance.delete(`/user/${id}`)
    } catch (e) {
        throw e;
    }
}

