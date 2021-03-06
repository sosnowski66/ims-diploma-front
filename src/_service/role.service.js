import { axiosClient } from "../_helpers";

export const roleService = {
    getAll,
    getById,
    // addNewRole,
    // updateRole,
    save,
    deleteById,
}

const ROOT_PATH = "/roles"

function getAll() {
    return axiosClient
        .get(`${ROOT_PATH}/all`)
}

function getById(id) {
    return axiosClient
        .get(`${ROOT_PATH}/${id}`)
}

function save(role) {
    return axiosClient
        .post(`${ROOT_PATH}`, role)
}

function deleteById(id) {
    return axiosClient.post(`${ROOT_PATH}/${id}/delete`)
}
