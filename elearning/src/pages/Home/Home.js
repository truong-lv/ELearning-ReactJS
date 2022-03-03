import Navbar from "../../component/Navbar/Nabar"
import Container from '@mui/material/Container';
import { Fragment } from "react";
import CouresAvaiable from "../../component/CourseAvaiable/CourseAvaiable";
import Post from "../../component/TopPost/Post";
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react'
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import './homeStyle.css'

function Home(){
    const [listTopCourse, setListTopCourse]=useState([])
    const [listNewPost, setListNewPost]=useState([])
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const token=localStorage.getItem('accessToken')
        axios.get('/api/credit-class/',{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }).then((response) => {
            // console.log(response.data)
            setListTopCourse(response.data)
        }).catch(error => console.log(error))
    },[])

    useEffect(() => {
        const token=localStorage.getItem('accessToken')
        axios.get('/api/user/top-five-post-currently?creditClassId=1',{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }).then((response) => {
             console.log(response.data)
            setListNewPost(response.data)
        }).catch(error => console.log(error))
    },[])


    return (
        <Fragment>
            <Navbar/>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item >
                                <div className="course-component">
                                    <CouresAvaiable courses={listTopCourse}/>
                                </div>
                            </Grid>
                            <Grid item>
                            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                               BÀI ĐĂNG MỚI NHẤT
                            </Typography>
                                <div className="top-post">
                                    <Post listPost={listNewPost}/>
                                </div>
                                
                            </Grid>
                        </Grid>
                        <Grid container item md={3} xs={12} direction='column' rowSpacing={2}>
                            <Grid item>
                                <div className="course-component time-picker">
                                    <p className="time-picker__text">LỊCH</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                                    </LocalizationProvider> 
                                </div>
                            </Grid>
                            <Grid item >
                                <div className="course-component">
                                    <p style={{fontWeight: '600',padding:'5px'}}>Thông báo</p>
                                    <div className="notifi-text">10 Mail(s)</div>
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