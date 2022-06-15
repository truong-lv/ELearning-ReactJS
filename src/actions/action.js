
export function setInfor(infor){
    return{
        type: 'SET_INFOR',
        payload:infor
    }
}

export function setLogin(check){
    return{
        type: 'SET_LOGIN',
        payload:check
    }
}