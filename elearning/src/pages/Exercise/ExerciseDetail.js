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

import { getOnlyDateISO } from '../../myTool/fomatDateTime'

import { useLocation, useParams } from 'react-router-dom';

function ExerciseDetail() {

    const [exercise, setExercise] = useState({});
    const location = useLocation();
    const { id } = useParams();
    const exerciseInformation = location.state;

    console.log(exerciseInformation);

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get(`api/user/submit-info?excercise-id=${id}`, {
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
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>{exerciseInformation.title}</Typography>
                                <Typography variant='h6' className={style.btnBack}>Quay lại</Typography>
                            </Grid>
                            <Grid item sx={{ mb: 6 }} className={clsx(style.exerciseInfo, style.flex)}>
                                <Typography component="div" style={{ fontWeight: "bold", color: 'black' }}>
                                    Ngày giao: {' '}
                                    {typeof exerciseInformation.startTime === 'undefined' ? "" : getOnlyDateISO(exerciseInformation.startTime)}
                                </Typography>
                                <Typography component="div" style={{ fontWeight: "bold", color: 'black' }}>
                                    Đến hạn: {' '}
                                    {typeof exerciseInformation.endTime === 'undefined' ? "" : getOnlyDateISO(exerciseInformation.endTime)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography component="div" className={clsx(style.exerciseContent, style.relative)}>
                                    <ExerciseContent exercise={exerciseInformation} />
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