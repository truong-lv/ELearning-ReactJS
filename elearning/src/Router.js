import {
    Routes,
    Route,
    Outlet,Navigate
  } from "react-router-dom";

import App from './App'
import Home from './pages/Home/Home'
import Coures from './pages/Coures/Coures'  
import Login from './pages/Login/Login'
import Schedule from './pages/Schedule/Schedule'
import Infor from './pages/Infor/Infor'
import Notification from './pages/Notification/Notification'
import Admin from './pages/Admin/Admin'

import { useSelector} from 'react-redux'

function CheckLogin() {
    const isLogin = useSelector(state => state.isLogin.value)
    // const isinfor = useSelector(state => state.infor)
    console.log(isLogin)
    return (
        isLogin?<Outlet/>:<Navigate to='/login'/>
    );
}

function Router() {
return (
    <Routes>
        <Route element={<CheckLogin/>} >
            <Route path="/" element={<App/>}>
                <Route path="/home" element={<Home/>} />
                <Route path="/coures" element={<Coures/>} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/infor" element={<Infor/>} />
                <Route path="/notification" element={<Notification/>} />
                <Route path="/admin" element={<Admin/>} />
            </Route>
        </Route>
        <Route path="/login" element={<Login/>} />
    </Routes>
);
}
export default Router;

