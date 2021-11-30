import profileReducer, {addPostActionCreator, AddPostActionType, deletePost, PostsType} from "../profile-reducer";
const state = {
    profile: null,
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "it's my first post", likesCount: 11},
    ],
    newPostText:'',
    status: ""
}
it('add new post should be added',() => {
    let action = addPostActionCreator('it-kamasutra')
//1 test data
    //2. action
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts.length).toBe(3);
    expect(newState.posts[2].likesCount).toBe(0);
    expect(newState.posts[2].message).toBe('it-kamasutra');

})

it('after deleting length of message should be decrement',() => {
    let action = deletePost(1)
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts.length).toBe(1);
})

it(`after deleting length shouldn't be decrement if id is incorrect `,() => {
    let action = deletePost(1000)
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts.length).toBe(2);
})


