import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import CourseDetail from '../../pages/Coures/CourseDetail'

import { useNavigate } from 'react-router-dom'

import './style.css'
import courseIcon from "../../assets/image/course-icon.png"


function Course({ course, fullWidth }) {


    let navigate = useNavigate();

    const handleCourseItem = () => {
        navigate(`/CourseDetail/credit_class_id=${course.creditClassId}`)

    }

    return (
        <Grid item={true} xs={4} md={fullWidth === false ? 3 : 2.4}  >
            <Card className="course-box" title={course.subjectName} onClick={handleCourseItem}>
                <CardActionArea>
                    <div className="course-img" ><img src={courseIcon} alt="courseIcon" /></div>
                    <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" component="div" align="center" noWrap>
                            {course.subjectName}
                        </Typography>
                        {/* <Typography variant="body2" align="center">
                            {course.teachers.reduce((pre, cur) => (pre + '\n' + cur))}
                        </Typography> */}
                        <Typography variant="body2" align="center">
                            {course.departmentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" align="center">
                            HK {course.semester} - Năm học {course.schoolYear}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default function CouresAvaiable({ courses, fullWidth }) {
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                {/* KHÓA HỌC HIỆN CÓ */}
            </Typography>
            <Grid container columnSpacing={2} rowSpacing={2}>
                {courses.map((course) => {
                    return <Course key={course.creditClassId} course={course} fullWidth={fullWidth} />
                })}
            </Grid>
        </React.Fragment>

    )
}