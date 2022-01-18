import axios from "axios";
import {savePhoto} from "../Redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'dff2b0dc-55bd-439a-8c96-6ab659f7b37e'
    }
})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {
            status
        })
    },
    savePhoto(photoFile:any){
        const formData = new FormData()
        formData.append('image',photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);

},
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email:string,password:string, rememberMe = false)   {
        return instance.post(`auth/login`, {email,password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}




