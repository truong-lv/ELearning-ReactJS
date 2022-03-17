import {
    Routes,
    Route,
    Outlet, Navigate
} from "react-router-dom";

import App from './App'
import Home from './pages/Home/Home'
import Course from './pages/Coures/Coures'
import CourseDetail from './pages/Coures/CourseDetail'
import Login from './pages/Login/Login'
import Schedule from './pages/Schedule/Schedule'
import Infor from './pages/Infor/Infor'
import Notification from './pages/Notification/Notification'
import Admin from './pages/Admin/Admin'
import Member from './pages/Members/Member.js'

import { useSelector } from 'react-redux'

function CheckLogin() {
    const isLogin = useSelector(state => state.isLogin.value)
    // const isinfor = useSelector(state => state.infor)
    return (
        isLogin ? <Outlet /> : <Navigate to='/login' />
        // console.log(isLogin)
    );
}

function Router() {
    return (
        <Routes>
            {/* <Route element={<CheckLogin />} >
                <Route path="/" element={<App />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/infor" element={<Infor />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} /> */}
            <Route path="/course" element={<Course />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/courseDetail" element={<CourseDetail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/member" element={<Member />} />
        </Routes>
    );
}
export default Router;

