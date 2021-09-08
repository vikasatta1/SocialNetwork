import axios from "axios";
const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '18609265-abea-44e7-991b-d67c1c696dc2'}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number){
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })

    }
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })

}


export const followUser = (id:string) =>{
    instanse.post(baseUrl + `follow/${id}`)
}
