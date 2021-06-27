
type UsersACType = FollowType | UnFollowType | SetUsersType
 type FollowType = {
    type:"FOLLOW"
    userId:number
}
 type UnFollowType = {
    type:"UNFOLLOW"
    userId:number
}
type SetUsersType = {
    type: "SET_USERS"
    users:any
}
export type UsersPageType = Array<userType>
export type userType = {
    id:number
    fillName:string
    status:string
    location:{
        city:string
        country:string
    }
}
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"

const initialState = {
    users:[
        {id:1, fillName:"Mo", status:"I am boss", location: {city: "Minsk", country: "Belarus"}},
        {id:2, fillName:"Cucumber", status:"I am boss too", location: {city: "Minsk", country: "Belarus"}},
        {id:3, fillName:"Anny", status:"I am boss too", location: {city: "Moscow", country: "Russia"}},
        {id:4, fillName:"Leo", status:"I like eating", location: {city: "Gomal", country: "Belarus"}}
    ]
}



export const usersReducer = (state=initialState, action: UsersACType) => {
    switch (action.type){
        case  FOLLOW:
            return  {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u,followed: true}
                    }
            return u;
        })
            }
        case  UNFOLLOW:
            return  {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u,followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:{
            return {...state, users: [...state.users, action.users]}
        }

        default:
            return state

    }

}

export const followAC = (userId:number):FollowType => {
    return {type:FOLLOW, userId:1}
}
export const unfollowAC = (userId:number):UnFollowType => {
    return {type:UNFOLLOW, userId:2}
}
export const setUsersAC = (users:any) => ({type: SET_USERS, users})



export default usersReducer;