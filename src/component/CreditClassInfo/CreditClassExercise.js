import { Typography } from '@mui/material'
import { Fragment, useState, useEffect } from 'react'
import axios from "axios"

import style from './CreditClass.module.scss'

import { useNavigate } from 'react-router-dom'

import IconSubmit from './IconSubmit'

import clsx from 'clsx'

function CreditClassExercise({ listExercises }) {

    const [submit, setSubmit] = useState({});
    let navigate = useNavigate();

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
                                className={clsx(style.listExerciseItem, style.dlFlex)} key={value.excerciseId}>
                                <div style={{ width: '200px' }}>{value.title}</div>
                                <IconSubmit id={value.excerciseId} />
                            </li>
                        )
                    })}
                </ul>
            }
        </Fragment>
    )
}

export default CreditClassExercise