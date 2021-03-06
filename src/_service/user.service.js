import { axiosClient, history } from "../_helpers";

export const userService = {
    login,
    logout,
    getAll,
    getById,
    // updateUser,
    // addNewUser,
    save,
    deleteById,
}

const ROOT_PATH = "/users"

function login(username, password) {
    return axiosClient
        .post("/authenticate", {username, password})
        .then(res => {
            console.log("ZALOGOWANO ", res)
            if (res) {
                localStorage.setItem("user", JSON.stringify(res));
            }
            return res;
        });
}

function logout() {
    history.push("/");
    localStorage.removeItem("user");
}

function getAll() {
    return axiosClient
        .get(`${ROOT_PATH}/all`)
}

function getById(id) {
    return axiosClient
        .get(`${ROOT_PATH}/${id}`)
}

// function updateUser(user) {
//     return axiosClient
//         .post(`${ROOT_PATH}/${user.id}`)
// }
//
// function addNewUser(user) {
//     return axiosClient
//         .post(`${ROOT_PATH}`)
// }

function save(user) {
    return axiosClient
        .post(`${ROOT_PATH}`, user)
}

function deleteById(id) {
    return axiosClient.post(`${ROOT_PATH}/${id}/delete`);
}
