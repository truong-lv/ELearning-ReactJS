const initialState = {
    value:false
    }

const loginReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_LOGIN':{
            return {value:action.payload}
        }
        default:
            return state
    }
}

export default loginReducer;