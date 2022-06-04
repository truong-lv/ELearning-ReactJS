import { useEffect, useState } from 'react'

import Navbar from "../../component/Navbar/Nabar"
import { Fragment } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import clsx from 'clsx'

import style from './style.module.scss'


import ExerciseContent from '../../component/ExerciseInfo/ExerciseContent'
import ExerciseSubmitted from '../../component/ExerciseInfo/ExerciseSubmitted'

import { getOnlyDate } from '../../myTool/fomatDateTime'

function ExerciseDetail() {

    const [exercise, setExercise] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('api/user/submit-info?excercise-id=13', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setExercise(response.data)
        }).catch(error => console.log(error))
    }, [])

    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>{exercise.excerciseTitle}</Typography>
                                <Typography variant='h6' className={style.btnBack}>Quay lại</Typography>
                            </Grid>
                            <Grid item sx={{ mb: 6 }} className={clsx(style.exerciseInfo, style.flex)}>
                                <Typography component="div" >
                                    {'TeacherName'} - {' '}
                                    {typeof exercise.startTime === 'undefined' ? console.log('startTime undefined') : getOnlyDate(exercise.startTime)}
                                </Typography>
                                {console.log(exercise.endTime)}
                                <Typography component="div" style={{ fontWeight: "bold", color: 'black' }}>
                                    Đến hạn: {' '}
                                    {typeof exercise.endTime === 'undefined' ? console.log('endTime undefined') : getOnlyDate(exercise.endTime)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography component="div" className={clsx(style.exerciseContent, style.relative)}>
                                    <ExerciseContent exercise={exercise} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={3} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography component="div" className={clsx(style.exerciseContent, style.relative)}>
                                    <ExerciseSubmitted exercise={exercise} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment >
    )
}

export default ExerciseDetail