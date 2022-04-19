

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

function FolderShare() {

    const [data, setData] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/credit-class/creditclass-detail?creditclass_id=1', {
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
                                    {'SubjectName'} - {' TeacherName'}
                                </Typography>
                            </Grid>
                            <Grid item={true}>
                                <Folders folders={data}></Folders>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment >
    )

}


export default FolderShare