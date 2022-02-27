const inforReducer=(state={},action)=>{
    switch(action.type){
        case 'SET_INFOR':{
            return action.payload
            break;
        }
    }
}

export default inforReducer;