import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea } from '@mui/material';

import './style.css'
import courseIcon from "../../assets/image/course-icon.png"

function Course({course}){
    return(
        <Grid item xs={4} md={3} >
            <Card className="course-box" sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <div className="course-img" ><img src={courseIcon}/></div>
                    <CardContent>
                    <Typography variant="h6" component="div" align="center">
                        {course.subjectName}
                    </Typography>
                    <Typography variant="body2" align="center">
                    {course.teachers.reduce((pre,cur)=>(pre+', '+cur))}
                    </Typography>
                    <Typography variant="body2" align="center">
                    {course.departmentName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" align="center">
                    {'Học kỳ '+course.semester+'-'+'Năm học'+course.schoolYear}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card><br/>
        </Grid>
    )
}

export default function CouresAvaiable(courses){
    const [date, setDate] = React.useState(new Date());
    return(
        <React.Fragment>
            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                KHÓA HỌC HIỆN CÓ
            </Typography>
                <Grid container spacing={2}>
                    {courses.courses.map((course)=>{return <Course key={course.creditClassId} course={course}/>})}
                </Grid>
        </React.Fragment>
            
    )
}