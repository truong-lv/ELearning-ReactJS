

import { useState, useEffect } from 'react'

import axios from 'axios'

import { Fragment } from 'react'

import Navbar from "../../component/Navbar/Nabar"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
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

    const [loading, setLoading] = useState(false);

    const handleCloseLoadding = () => {
        setLoading(false);
    };

    const handleTeacherArray = (() => {
        teacherArray.map((value) => {
            if (teacherArray.indexOf(value) === 0)
                teacherNames += value.fullname
            else
                teacherNames += `/${value.fullname}`

            return teacherNames;
        })
    })()


    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('accessToken')
        axios.get(`/api/credit-class/creditclass-detail?creditclass_id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setLoading(false);
            setData(response.data.folders)
        }).catch(error => { console.log(error); setLoading(false); })
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleCloseLoadding}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment >
    )

}


export default FolderShare