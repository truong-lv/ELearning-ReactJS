import inforReducer from "./infor";
import loginReducer from './isLogin'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    infor: inforReducer,
    isLogin:loginReducer
});

export default rootReducer;