import { Typography } from '@mui/material'
import { Fragment, useState, useEffect } from 'react'
import axios from "axios"

import style from './CreditClass.module.scss'

import { useNavigate } from 'react-router-dom'

function CreditClassExercise({ listExercises }) {

    const [submit, setSubmit] = useState({});
    let navigate = useNavigate();
    let i = 0;

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken')
    //     axios.get(`/api/user/submit-info?excercise-id=15`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         setSubmit(response.data)
    //     }).catch(error => console.log(error))
    // }, [])

    return (
        <Fragment>
            <Typography sx={{ mt: 3 }} className={style.listExercisesContainer} variant="div" component="div">
                <p className={style.justifyCenter}>Bài tập</p>
                <p>Đã nộp</p>
            </Typography>

            {listExercises === undefined ? "" :
                <ul className={style.listExercise}>
                    {listExercises.map((value) => {
                        return (
                            <li
                                onClick={() => {
                                    navigate(`/exerciseDetail/exercise_id=${value.excerciseId}`, { state: value });
                                }}
                                className={style.listExerciseItem} key={value.excerciseId}>
                                <div style={{ maxWidth: '170px' }}>{value.title}</div>
                            </li>
                        )
                    })}
                </ul>
            }
        </Fragment>
    )
}

export default CreditClassExercise