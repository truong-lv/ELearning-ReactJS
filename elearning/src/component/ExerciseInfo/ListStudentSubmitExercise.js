import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Navbar from "../../component/Navbar/Nabar"
import { Fragment } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import clsx from 'clsx'

import style from './ExerciseInfo.module.scss'


import ExerciseContent from '../../component/ExerciseInfo/ExerciseContent'
import ExerciseSubmitted from '../../component/ExerciseInfo/ExerciseSubmitted'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'

import { useLocation, useParams } from 'react-router-dom';



export default function ListStudentSubmitExercise({ listStudent }) {

    const { id } = useParams();
    const token = localStorage.getItem('accessToken')

    console.log(listStudent)





    return (
        <Fragment>
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>DANH SÁCH SINH VIÊN NỘP BÀI TẬP</Typography>
                                <Typography variant='h6' className={style.btnBack}>?? làm gì ở đây ??</Typography>
                            </Grid>
                            <Grid item sx={{ pb: 2, mt: 2 }} className={style.listStudentSubmitTitle}>
                                <Typography component="div" className={clsx(style.flex, style.bold)}>
                                    <Typography sx={{ ml: 3, fontWeight: 'bold' }} component="div">STT</Typography>
                                    <Typography sx={{ ml: 4, fontWeight: 'bold' }} component="div">Mã </Typography>
                                    <Typography sx={{ ml: 12, fontWeight: 'bold' }} component="div">Họ và Tên</Typography>
                                    <Typography sx={{ ml: 12, fontWeight: 'bold' }} component="div">Thời gian nộp</Typography>
                                    <Typography sx={{ mr: 3, fontWeight: 'bold' }} component="div">Điểm</Typography>
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                <Typography component="div" className={style.flex}>
                                    <Typography sx={{ ml: 3 }} component="div">01</Typography>
                                    <Typography sx={{ ml: 4 }} component="div">098 </Typography>
                                    <Typography sx={{ ml: 12 }} component="div">Họ và Tên</Typography>
                                    <Typography sx={{ ml: 12 }} component="div">Thời gian nộp</Typography>
                                    <Typography sx={{ mr: 3 }} component="div">Điểm</Typography>
                                </Typography>
                            </Grid> */}
                            <Grid item>
                                {listStudent.map(value => {
                                    return (
                                        <div className={style.flex}>
                                            <Typography sx={{ ml: 3 }} component="div">{listStudent.indexOf(value) + 1}</Typography>
                                            <Typography sx={{ ml: 4 }} component="div">{value.studentCode} </Typography>
                                            <Typography sx={{ ml: 12 }} component="div">{value.fullname}</Typography>
                                            <Typography sx={{ ml: 12 }} component="div">{getOnlyDateISO(value.submitTime)}</Typography>
                                            <Typography sx={{ mr: 3 }} component="div">{value.mark}</Typography>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    )
}