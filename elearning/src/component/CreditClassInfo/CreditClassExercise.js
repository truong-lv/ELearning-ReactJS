import { Typography } from '@mui/material'
import { Fragment } from 'react'

import style from './CreditClass.module.scss'

export default function CreditClassExercise({ exercises }) {
    return (
        <Fragment>
            <Typography className={style.listExercisesContainer} variant="div" component="div">
                <p className={style.justifyCenter}>Bài tập</p>
                <p>Đã nộp</p>
            </Typography>

            {exercises === undefined ? console.log('exercise undefined') :
                <ul className={style.listExercise}>

                    {exercises.map((value) => {
                        return (
                            <li className={style.listExerciseItem} key={value.excerciseId}>{value.excerciseContent}</li>
                        )
                    })}
                </ul>
            }

        </Fragment>
    )
}