import axios from "axios";

const getUsers = (currentPage,pageSize) => {

    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        { withCredentials:true})

}
const getUsers2 = (currentPage,pageSize) => { // удали потом

    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        { withCredentials:true})

}