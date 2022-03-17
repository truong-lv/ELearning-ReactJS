import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import './style.css'
import courseIcon from "../../assets/image/course-icon.png"

function Course({ course }) {
    console.log(course)
    return (
        <Grid item xs={4} md={3} >
            <Card className="course-box" >
                <CardActionArea>
                    <div className="course-img" ><img src={courseIcon} alt={course.subjectName} /></div>
                    <CardContent>
                        <Typography variant="body1" component="div" align="center" noWrap>
                            {course.subjectName}
                        </Typography>
                        <Typography variant="body2" align="center">
                            {console.log(course.teachers)}
                            {course.teachers.reduce((pre, cur) => (pre + '\n' + cur))}
                        </Typography>
                        <Typography variant="body2" align="center">
                            {course.departmentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" align="center">
                            Học kỳ {course.semester}-Năm học {course.schoolYear}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default function CouresAvaiable(courses) {
    console.log(courses.courses)
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                {/* KHÓA HỌC HIỆN CÓ */}
            </Typography>
            <Grid container columnSpacing={2}>
                {courses.courses.map((course) => {
                    return <Course key={course.creditClassId} course={course} />
                })}
            </Grid>
        </React.Fragment>

    )
}