import {
    Routes,
    Route,
    Outlet, Navigate,
    useLocation
} from "react-router-dom";

import {CustomerApp, AdminApp} from './App'
import Home from './pages/Home/Home'
import Course from './pages/Coures/Coures'
import CourseDetail from './pages/Coures/CourseDetail'
import Login from './pages/Login/Login'
import Schedule from './pages/Schedule/Schedule'
import Infor from './pages/Infor/Infor'
import Notification from './pages/Notification/Notification'
import Admin from './pages/Admin/Admin'
import Dashboard from './component/NarbarAdmin/Dashboard'
import Member from './pages/Members/Member.js'

import { useSelector } from 'react-redux'

function CheckLogin() {
    //get 
    const location = useLocation();
    const { pathname } = location;
    document.title = pathname.charAt(1).toUpperCase() + pathname.slice(2)
    const isLogin = useSelector(state => state.isLogin.value)
    // if(!isLogin){
    //     const token=localStorage.getItem('accessToken')
    //     axios.get('/api/credit-class/',{
    //         headers: {
    //             'Authorization':`Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         // console.log(response.data)
    //         setListTopCourse(response.data)
    //         // setTimeout(()=>{setLoading(false)},1000);
    //     }).catch(error => console.log(error))
    // }
    return (
        isLogin ? <Outlet /> : <Navigate to='/login' />
        // console.log(isLogin)
    );
}

function Router() {
    return (
        <Routes>
            <Route element={<CheckLogin />} >
                <Route path="/" element={<CustomerApp />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/courseDetail" element={<CourseDetail />} />
                    <Route path="/member" element={<Member />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/infor" element={<Infor />} />
                    <Route path="/notification" element={<Notification />} />
                </Route>
                <Route path="/admin" element={<AdminApp />}>

                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/courseDetail" element={<CourseDetail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course" element={<Course />} /> */}

        </Routes>
    )
}
export default Router;

