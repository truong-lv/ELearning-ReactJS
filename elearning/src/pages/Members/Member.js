import { Fragment } from 'react'
import Navbar from "../../component/Navbar/Nabar"
import ListSV from "../../component/ListGVSV/ListSV"

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import style from './style.module.scss'

import { useState, useEffect } from 'react'
import axios from 'axios'


function Member() {

    const [listSV, setListSV] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get('/api/credit-class/creditclass-all-members?creditclass_id=2', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            setListSV(response.data)
        }).catch(error => console.log(error))
    }, [])

    return (
        <Fragment>
            <Navbar />
            <Container maxwidth='lg'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item className={style.headingContainer}>
                                <Typography variant='h5' className={style.heading}>QUẢN LÝ SINH VIÊN</Typography>
                                <Typography variant='h6' className={style.btnBack}>Quay lại</Typography>
                            </Grid>
                            <Grid item>
                                <ListSV listSV={listSV} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    )
}

export default Member