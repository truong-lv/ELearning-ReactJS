const loginReducer=(state=false,action)=>{
    switch(action.type){
        case 'SET_LOGIN':{
            return action.payload
        }
        default:
            return state
    }
}

export default loginReducer;