import {AppActionsType} from "./Store";

export type FollowType = {
    type:"FOLLOW"
    userId:number
}
export type UnFollowType = {
    type:"UNFOLLOW"
    userId:number
}
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"

const initialState = {
    users:[
        {id:1, fillName:"Mo", status:"I am boss", location: {city: "Minsk", country: "Belarus"}},
        {id:2, fillName:"Cucumber", status:"I am boss too", location: {city: "Minsk", country: "Belarus"}},
        {id:3, fillName:"Anny", status:"I am boss too", location: {city: "Moscow", country: "Russia"}},
        {id:4, fillName:"Leo", status:"I like eating", location: {city: "Gomal", country: "Belarus"}}
    ]
}



const usersReducer = (state=initialState, action: any) => {
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

        default:
            return state

    }

}

export const followAC = ():FollowType => {
    return {type:FOLLOW, userId:1}
}
export const unfollowAC = ():UnFollowType => {
    return {type:UNFOLLOW, userId:2}
}




export default initialState;