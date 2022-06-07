

import { useState, useEffect } from 'react'

import axios from 'axios'

import { Fragment } from 'react'

import Navbar from "../../component/Navbar/Nabar"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'

import Folders from '../../component/FolderShareInfo/Folders'

import style from './style.module.scss'
import { useParams, useLocation } from 'react-router-dom'

function FolderShare() {

    const [data, setData] = useState([])
    const { id, subjectName } = useParams();
    const location = useLocation();
    const teacherArray = location.state.teacherInfos;
    let teacherNames = '';



    const handleTeacherArray = () => {
        teacherArray.map((value) => {
            if (teacherArray.indexOf(value) === 0)
                teacherNames += value.fullname
            else
                teacherNames += `/${value.fullname}`

            return teacherNames;
        })
    }

    handleTeacherArray();


    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get(`/api/credit-class/creditclass-detail?creditclass_id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setData(response.data.folders)
        }).catch(error => console.log(error))
    }, [])

    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true} sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>TÀI LIỆU CHIA SẺ</Typography>
                                <Typography variant='h6' className={style.btnBack}>Quay lại</Typography>
                            </Grid>
                            <Grid item={true} sx={{ mb: 6 }} className={clsx(style.folderShareInfo, style.flex)}>
                                <Typography component="div" >
                                    {subjectName} - {teacherNames}
                                </Typography>
                            </Grid>
                            <Grid item={true}>
                                <Folders folders={data} teacherName={teacherNames}></Folders>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment >
    )

}


export default FolderShare