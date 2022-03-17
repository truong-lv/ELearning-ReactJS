

import style from './style.module.scss'
import Navbar from "../../component/Navbar/Nabar"
import CreditClassInfo from "../../component/CreditClassInfo/CreditClassInfo"

import { Fragment } from 'react'
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'
import axios from "axios"


function CourseDetail() {

    const [info, setInfo] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/credit-class/creditclass-detail?creditclass_id=1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setInfo(response.data)
        }).catch(error => console.log(error))
    }, [])



    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography variant="h4" component="div" color="red">Thông tin môn học</Typography>
                                <Typography component="div" color="red" className={style.listInfoContainer}>
                                    {/* <ul className={style.listInfo}>
                                        <li>GIẢNG VIÊN: {info.teacherInfos[0].fullname}</li>
                                        <li>EMAIL: {info.teacherInfos[0].email}</li>
                                        <li>SĐT: {info.teacherInfos[0].phone}</li>
                                        <li>KHOA: {info.departmentName}</li>
                                        <li>THỜI GIAN BẮT ĐẦU: {info.startTime}</li>
                                        <li>THỜI GIAN KẾT THÚC: {info.endTime}</li>
                                    </ul> */}
                                    <CreditClassInfo info={info} />
                                    {/* {console.log(info)} */}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" component="div" color="black">POSTS</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={3} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <Typography variant="h6" component="div" color="red">Tài liệu chia sẻ</Typography>
                                <Typography component="div" color="red" className={style.listInfoContainer}>
                                    <ul className={style.listInfo}>
                                        {/* {info.folders.map((value) => (
                                            <li>{value/folderName}</li>
                                        ))} */}
                                        {/* {info.folders[1].folderName} */}
                                    </ul>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="div" color="red">Bài tập đã giao</Typography>
                                {info.endTime}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    )
}

export default CourseDetail