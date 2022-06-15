import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import axios from 'axios'
import AppToast from '../../myTool/AppToast'
import CourseDetail from '../../pages/Coures/CourseDetail'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import './style.css'
import courseIcon from "../../assets/image/course-icon.png"
import star from "../../assets/image/star.png"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

import { useSelector } from 'react-redux'


function Course({ course, fullWidth, displayStar }) {

    const userRoles = useSelector(state => state.infor.roles || [])
    const isModer = userRoles.some(role => role === 'ROLE_MODERATOR')
    const isTeacher = userRoles.some(role => role === 'ROLE_TEACHER')

    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inviteCode, setInviteCode] = useState('');
    const [contentError, setContentError] = useState('');
    const [openToastError, setOpenToastError] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseTeacherDialog = () => {
        setOpenTeacherDialog(false);
    };

    const handleFillInviteCode = (e) => {

        if (e.target.value === "") {
            setIsError(true);
        }
        else {
            setIsError(false);
            setInviteCode(parseFloat(e.target.value))
        }
    }

    const handleJoinClass = (creditClassId) => {
        const token = localStorage.getItem('accessToken');
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + `/api/user/join-class`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ "creditClassId": creditClassId, "joinCode": inviteCode })
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    navigate(`/CourseDetail/credit_class_id=${creditClassId}`)
                }
            })
            .catch(function (error) {
                setOpenToastError(true);
                setContentError("Mã mời không chính xác");
            });

    }

    const handleCourseItem = (creditClassId) => {
        if(isModer) navigate(`/CourseDetail/credit_class_id=${creditClassId}`);
        if(isTeacher && displayStar === false) {
            setOpenTeacherDialog(true);
        }
        else if(isTeacher)
        {
            navigate(`/CourseDetail/credit_class_id=${creditClassId}`);
        }
        else
        {

            const token = localStorage.getItem('accessToken')
            var config = {
                method: 'post',
                url: axios.defaults.baseURL + `/api/user/check-joined?creditclass-id=${creditClassId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
    
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        navigate(`/CourseDetail/credit_class_id=${creditClassId}`)
                    }
                })
                .catch(function (error) {
                    setOpen(true);
                });
        }

    }

    return (
        <Grid item={true} xs={4} md={fullWidth === false ? 3 : 2.4}  >
            <Card className="course-box" title={course.subjectName} onClick={() => handleCourseItem(course.creditClassId)}>
                <CardActionArea>
                    <div className="course-star-img" style={{display: displayStar ? "inherit" : "none"}}>
                        <StarOutlinedIcon color="warning"/>
                    </div>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Vui lòng nhập mã mời để vào lớp</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Mã mời"
                        type="value"
                        fullWidth
                        variant="standard"
                        helperText={isError ? "Mã mời không được bỏ trống" : ""}
                        onChange={(e) => handleFillInviteCode(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={() => handleJoinClass(course.creditClassId)}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openTeacherDialog} onClose={handleCloseTeacherDialog}>
                <DialogTitle>Thông báo</DialogTitle>
                <DialogContent>
                    Bạn không dạy lớp này nên không thể vào!!
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTeacherDialog}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
            <AppToast content={contentError} type={1} isOpen={openToastError} callback={() => {
                setOpenToastError(false);
            }} />
        </Grid>
    )
}

export default function CouresAvaiable({ courses, courseJoined, fullWidth }) {
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                {/* KHÓA HỌC HIỆN CÓ */}
            </Typography>
            {console.log(courses)}
            {console.log(courseJoined)}
            <Grid container columnSpacing={2} rowSpacing={2}>
                {courses.map((course) => {
                    return <Course key={course.creditClassId} course={course} fullWidth={fullWidth} 
                    displayStar={courseJoined === undefined ? false :courseJoined.some((c) => c.creditClassId === course.creditClassId)}/>
                })}
            </Grid>
        </React.Fragment>

    )
}