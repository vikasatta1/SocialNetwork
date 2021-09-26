import axios from "axios";

const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'
const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '18609265-abea-44e7-991b-d67c1c696dc2'
    }
})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(id: number) {
        return instanse.post(`follow/${id}`)
    },
    unfollow(id: number) {
        return instanse.delete(
            `follow/${id}`)
    },
    getProfile(userId: number) {
     return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instanse.get(`profile/${userId}`)
    },
    getStatus(userId:number) {
        return instanse.get(`/profile/status${userId}`)
    },
    updateStatus(status:string,userId:number) {
        return instanse.put(`/profile/status${userId}`, {
            status:status
        })
    }
}


export const authAPI = {
    me() {
        return instanse.get(`auth/me`)
    }
}




