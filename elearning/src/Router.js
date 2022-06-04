import {
    Routes,
    Route,
    Outlet, Navigate,
    useLocation
} from "react-router-dom";

import { MODERATOR } from './config'
import Home from './pages/Home/Home'
import Infor from './pages/Infor/Infor'
import Login from './pages/Login/Login'
import CreditClassInfor from './pages/Admin/CreditClassInfor'
import CreditClassMember from './pages/Admin/CreditClassMember'
import CreditClassPost from './pages/Admin/CreditClassPost'
import CreditClassFile from './pages/Admin/CreditClassFile'
import Account from './pages/Admin/Account'
import Course from './pages/Coures/Coures'
import { CustomerApp, AdminApp } from './App'
import Member from './pages/Members/Member.js'
import Schedule from './pages/Schedule/Schedule'
import FolderShare from './pages/Folders/FolderShare'
import CourseDetail from './pages/Coures/CourseDetail'
import Notification from './pages/Notification/Notification'
import ExerciseDetail from './pages/Exercise/ExerciseDetail'
import ExerciseAssigned from './pages/Exercise/ExerciseAssigned'

import { useSelector } from 'react-redux'

function CheckLogin() {
    const location = useLocation();
    const { pathname } = location;
    let pathSplit = pathname.split('/');
    let titleName = pathSplit[1].charAt(0).toUpperCase() + pathSplit[1].slice(1)
    document.title = (titleName === '') ? "Elearning" : titleName;
    const isLogin = useSelector(state => state.isLogin.value)
    return (
        isLogin ? <Outlet /> : <Navigate to='/login' />
    );
}
function CheckAdmin() {
    const isLogin = useSelector(state => state.isLogin.value)
    const userRole = useSelector(state => state.infor.roles)
    const isAdmin = userRole.some((role) => (role === MODERATOR))
    return (
        isAdmin ? <Outlet /> : (isLogin ? <Outlet /> : <Navigate to='/login' />)
    );
}

function Router() {
    return (
        <Routes>
            <Route element={<CheckLogin />} >
                <Route path="/" element={<CustomerApp />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/courseDetail" element={<CourseDetail />} />
                    <Route path="/member" element={<Member />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/infor" element={<Infor />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/folderShare" element={<FolderShare />} />
                </Route>
                <Route path="/admin" element={<CheckAdmin />}>
                    <Route path="/admin/" element={<AdminApp />} >
                        <Route path="/admin/credit-class-infor" element={<CreditClassInfor />} />
                        <Route path="/admin/credit-class-member" element={<CreditClassMember />} />
                        <Route path="/admin/credit-class-post" element={<CreditClassPost />} />
                        <Route path="/admin/credit-class-file" element={<CreditClassFile />} />
                        <Route path="/admin/account" element={<Account />} />
                    </Route>
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/courseDetail" element={<CourseDetail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course" element={<Course />} />
            <Route path="/exerciseDetail" element={<ExerciseDetail />} />
            <Route path="/exerciseAssigned" element={<ExerciseAssigned />} />
            <Route path="/folderShare" element={<FolderShare />} />
        </Routes>
    )
}
export default Router;

