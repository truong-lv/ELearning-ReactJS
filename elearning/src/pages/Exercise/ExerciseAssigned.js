

import { useState, useEffect } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import axios from 'axios'

import Button from '@mui/material/Button'

import { Fragment } from 'react'

import Navbar from "../../component/Navbar/Nabar"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'

import AssignItem from '../../component/ExerciseAssigned/AssignItem'

import style from './style.module.scss'

import { useParams, useLocation } from 'react-router-dom'


function ExerciseAssigned() {

    const { id, subjectName } = useParams();
    const location = useLocation();
    const teacherArray = location.state.teacherInfos;
    const exercisesArray = location.state.listExercises;
    let teacherNames = '';

    const handleTeacherArray = (() => {
        teacherArray.map((value) => {
            if (teacherArray.indexOf(value) === 0)
                teacherNames += value.fullname
            else
                teacherNames += `/${value.fullname}`

            return teacherNames;
        })
    })()



    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true} sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>DANH SÁCH BÀI TẬP</Typography>
                            </Grid>
                            <Grid item={true} sx={{ mb: 6 }} className={clsx(style.exerciseInfo, style.flex)}>
                                <Typography component="div" >
                                    {subjectName} - {teacherNames}
                                </Typography>
                                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} component="span" size="small" color='success' style={{ fontWeight: "bold", padding: "3px 20px" }}>
                                    Thêm bài tập
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <AssignItem listExercise={exercisesArray}></AssignItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment >
    )

}


export default ExerciseAssigned