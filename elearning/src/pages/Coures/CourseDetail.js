import { Fragment, useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import axios from "axios"

import { useNavigate, useParams } from 'react-router-dom'

import style from './style.module.scss'
import Navbar from "../../component/Navbar/Nabar"
import member from '../../assets/image/member.png'
import CreditClassInfo from "../../component/CreditClassInfo/CreditClassInfo"
import CreditClassExercise from "../../component/CreditClassInfo/CreditClassExercise"
import CreditClassFolder from "../../component/CreditClassInfo/CreditClassFolder"
import CreditClassPosts from "../../component/CreditClassInfo/CreditClassPosts"



import clsx from 'clsx'


function CourseDetail() {
    const [info, setInfo] = useState([]);
    const [listExercises, setListExercises] = useState([]);
    const [teacherInfos, setTeacherInfos] = useState([]);
    const { id } = useParams();

    let navigate = useNavigate();

    const handleBtnMember = () => {
        navigate(`/member/credit_class_id=${id}`)
    }

    const handleBtnShowFolder = () => {
        navigate(`/folderShare/credit_class_id=${id}/subject_name=${info.creditClassName}`, { state: { teacherInfos } })
    }

    const handleBtnShowExercises = () => {
        navigate(`/exerciseAssigned/credit_class_id=${id}/subject_name=${info.creditClassName}`, { state: { teacherInfos, listExercises } })
    }



    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get(`/api/credit-class/creditclass-detail?creditclass_id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setInfo(response.data)
            setTeacherInfos(response.data.teacherInfos)
            setListExercises(response.data.excercises)
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
                                <Typography variant='h5' component='div' sx={{ fontSize: 30 }} className={style.heading}>{info.creditClassName}</Typography>
                                <Typography variant='h6' className={clsx(style.btnMember, style.flex)} onClick={handleBtnMember}>
                                    <img className={style.imgMember} src={member} alt='member img' />
                                    <div className={style.btnMemberContent}>Xem thành viên</div>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true}>
                                <Typography gutterBottom variant="h5" component="div" color="#2980B9" className={style.title}>Thông tin môn học</Typography>
                                <Typography component="div" className={style.listInfoContainer}>
                                    <CreditClassInfo info={info} />
                                </Typography>
                            </Grid>
                            <Grid item={true}>
                                <Typography gutterBottom variant="h5" component="div" color="#2980B9" className={style.title}>POSTS</Typography>
                                <Typography component="div" className={style.listPostContainer}>
                                    <CreditClassPosts posts={info.listPost} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={3} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className={style.title}>
                                    <Typography gutterBottom component="div" color="#2980B9" fontSize="20px" fontWeight="bold">Tài liệu chia sẻ</Typography>
                                    <Typography gutterBottom className={style.btnShowAll} onClick={handleBtnShowFolder} component="div" color="#FF0000" fontSize="13px" fontWeight="bold">Xem tất cả {'>>'}</Typography>
                                </div>
                                <Typography component="div" className={style.listInfoContainer}>
                                    <CreditClassFolder folders={info.folders} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className={style.title}>
                                    <Typography gutterBottom component="div" color="#2980B9" fontSize="20px" fontWeight="bold">Bài tập đã giao</Typography>
                                    <Typography gutterBottom className={style.btnShowAll} onClick={handleBtnShowExercises} component="div" color="#FF0000" fontSize="13px" fontWeight="bold">Xem tất cả {'>>'}</Typography>
                                </div>

                                <Typography component="div" className={style.listInfoContainer}>
                                    <CreditClassExercise listExercises={listExercises} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment >
    )
}

export default CourseDetail