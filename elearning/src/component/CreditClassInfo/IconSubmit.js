import { Typography } from '@mui/material'
import { Fragment, useState, useEffect } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux'

import style from './CreditClass.module.scss'

import { useNavigate } from 'react-router-dom'

import submit from '../../assets/image/submit_exercise.png'
import noSubmit from '../../assets/image/no_submit_exercise.png'



function IconSubmit({ id }) {

    const [studentSubmit, setStudentSubmit] = useState({});
    const [listStudent, setListStudent] = useState([]);

    const userRoles = useSelector(state => state.infor.roles);
    const isTeacherModer = userRoles.some(role => role === 'ROLE_TEACHER' || role === 'ROLE_MODERATOR');

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get(`/api/user/submit-info?excercise-id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setStudentSubmit(response.data)
        }).catch(error => "")
    }, [id])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get(`/api/submit/get-list-submit?excerciseId=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setListStudent(response.data)
        }).catch(error => console.log(error))
    }, [id])

    return (
        <img src={isTeacherModer ? (listStudent.length > 0 ? submit : noSubmit) : JSON.stringify(studentSubmit) === JSON.stringify({})
            ? noSubmit : submit} alt="status submit" className={style.iconSubmit}></img >
    )
}

export default IconSubmit