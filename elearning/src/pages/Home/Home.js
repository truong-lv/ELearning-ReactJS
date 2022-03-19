import './homeStyle.css'
import Post from "../../component/TopPost/Post";
import Navbar from "../../component/Navbar/Nabar"
import CouresAvaiable from "../../component/CourseAvaiable/CourseAvaiable";

import axios from "axios";

import { Fragment } from "react";
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CalendarPicker from '@mui/lab/CalendarPicker';

import './homeStyle.css'
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function Home() {
    const [listTopCourse, setListTopCourse] = useState([])
    const [listNewPost, setListNewPost] = useState([])
    const [date, setDate] = useState(new Date());
    const [unseenNoti,setUnseenNoti]=useState(0)
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        // setLoading(true)
        const token=localStorage.getItem('accessToken')
        axios.get('/api/credit-class/',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            
            setListTopCourse(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/user/top-five-post-currently?creditClassId=1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // console.log(response.data)
            setListNewPost(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const token=localStorage.getItem('accessToken')
        axios.get('/api/notification/unseen-notification',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
          }).then((res) => {
            setUnseenNoti(res.data)
          })
      },[])
    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item="true" md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item="true" >
                                <div className="course-component">
                                    <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                                        KHÓA HỌC HIỆN CÓ
                                    </Typography>
                                    <CouresAvaiable courses={listTopCourse} />
                                </div>
                            </Grid>
                            <Grid item="true">
                                <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                                    BÀI ĐĂNG MỚI NHẤT
                                </Typography>
                                <div className="top-post">
                                    {/* <Post listPost={listNewPost} /> */}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container item="true" md={3} xs={12} direction='column' rowSpacing={2}>
                            <Grid item="true">
                                <div className="course-component time-picker">
                                    <p className="time-picker__text">LỊCH</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                            <Grid item="true" >
                                <div className="course-component">
                                    <p style={{ fontWeight: '600', padding: '5px' }}>Thông báo</p>
                                    <div className="notifi-text">{unseenNoti} Mail(s)</div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    )
}
export default Home