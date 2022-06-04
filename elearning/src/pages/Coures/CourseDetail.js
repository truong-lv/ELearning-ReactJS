
import style from './style.module.scss'
import Navbar from "../../component/Navbar/Nabar"
import CreditClassInfo from "../../component/CreditClassInfo/CreditClassInfo"
import CreditClassExercise from "../../component/CreditClassInfo/CreditClassExercise"
import CreditClassFolder from "../../component/CreditClassInfo/CreditClassFolder"
import CreditClassPosts from "../../component/CreditClassInfo/CreditClassPosts"

import { Fragment } from 'react'
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
import axios from "axios"

import clsx from 'clsx'


function CourseDetail({ route, navigation }) {

    const [info, setInfo] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/credit-class/creditclass-detail?creditclass_id=14', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setInfo(response.data)
        }).catch(error => console.log(error))
    }, [])

    return (

        <Fragment>
            <Fragment>
                {navigation === undefined ? console.log('navigation undefined') : console.log('navigation' + navigation.getParam('itemID'))}
            </Fragment>

            <Fragment>
                <Navbar />
                <Container maxWidth="lg">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container columnSpacing={4}>
                            <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                                <Grid item sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                    <Typography variant='h5' className={style.heading}>{'className?'}</Typography>
                                    <Typography variant='h6' className={style.btnBack}>Quay lại</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item md={9} xs={12} direction='column' rowSpacing={2}>
                                <Grid item={true}>
                                    <Typography gutterBottom variant="h4" component="div" color="#2980B9" className={style.title}>Thông tin môn học</Typography>
                                    <Typography component="div" className={style.listInfoContainer}>
                                        <CreditClassInfo info={info} />
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Typography gutterBottom variant="h4" component="div" color="#2980B9" className={style.title}>POSTS</Typography>
                                    <Typography component="div" className={style.listPostContainer}>
                                        <CreditClassPosts posts={info.listPost} />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item md={3} xs={12} direction='column' rowSpacing={2}>
                                <Grid item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className={style.title}>
                                        <Typography gutterBottom component="div" color="#2980B9" fontSize="22px" fontWeight="bold">Tài liệu chia sẻ</Typography>
                                        <Typography gutterBottom component="div" color="#FF0000" fontSize="13px" fontWeight="bold">Xem tất cả {'>>'}</Typography>
                                    </div>
                                    <Typography component="div" className={style.listInfoContainer}>
                                        <CreditClassFolder folders={info.folders} />
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="h4" component="div" color="#2980B9" className={style.title}>Bài tập đã giao</Typography>
                                    <Typography component="div" className={style.listInfoContainer}>
                                        <CreditClassExercise exercises={info.excercises} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Fragment >
        </Fragment>


    )
}

export default CourseDetail