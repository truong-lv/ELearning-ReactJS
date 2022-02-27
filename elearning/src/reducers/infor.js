const inforReducer=(state={},action)=>{
    switch(action.type){
        case 'SET_INFOR':{
            return action.payload
        }
        default:
            return state
    }
}

export default inforReducer;