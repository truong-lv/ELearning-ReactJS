import clsx from 'clsx'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState, useEffect, Fragment } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import style from './style.module.scss'
import AppToast from '../../myTool/AppToast'
import Navbar from "../../component/Navbar/Nabar"
import AssignItem from '../../component/ExerciseAssigned/AssignItem'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

function ExerciseAssigned() {

    var startTimeExercise = '';
    var endTimeExercise = '';
    let teacherNames = '';
    let navigate = useNavigate();

    const { id, subjectName } = useParams();
    const [open, setOpen] = useState(false);
    const [fileSubmit, setFileSubmit] = useState([]);

    const location = useLocation();
    const teacherArray = location.state.teacherInfos;
    const exercisesArray = location.state.listExercises;

    const [startTime, setStartTime] = useState(startTimeExercise);
    const [endTime, setEndTime] = useState(endTimeExercise);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [toastMess, setToastMess] = useState('');

    const userRoles = useSelector(state => state.infor.roles || [])
    const isTeacherModer = userRoles.some(role => role === 'ROLE_TEACHER' || role === 'ROLE_MODERATOR')


    const Input = styled('input')({
        display: 'none',
    });

    const handleTeacherArray = (() => {
        teacherArray.map((value) => {
            if (teacherArray.indexOf(value) === 0)
                teacherNames += value.fullname
            else
                teacherNames += `/${value.fullname}`

            return teacherNames;
        })
    })();

    //  dd/MM/yyyy => yyyy-MM-dd
    const convertToTimeStamp = (time) => {
        console.log(time);
        let arrayTime = time.split('-');
        console.log(arrayTime[2] + '-' + arrayTime[1] + '-' + arrayTime[0])
        return arrayTime[2] + '-' + arrayTime[1] + '-' + arrayTime[0];
    }

    const handleAddExercise = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFileSubmit([]);
    };

    const onChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            setFileSubmit(files[0]);
        }
    }

    const handleConfirmAddExercise = () => {
        const token = localStorage.getItem('accessToken')
        var formData = new FormData();
        formData.append('startTime', startTime + ' 00:00:00');
        formData.append('endTime', endTime + ' 00:00:00');
        formData.append('title', title);
        formData.append('creditClassId', id);
        formData.append('excerciseContent', content);
        if (JSON.stringify(fileSubmit) !== JSON.stringify([])) {
            formData.append('files', fileSubmit);
        }
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/excercise/create-new',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    navigate(`/CourseDetail/credit_class_id=${id}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true} sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>DANH SÁCH BÀI TẬP</Typography>
                            </Grid>
                            <Grid item={true} sx={{ mb: 6 }} className={clsx(style.exerciseInfo, style.flex)}>
                                <Typography component="div" >
                                    {subjectName} - {teacherNames}
                                </Typography>
                                <Button onClick={() => handleAddExercise()} variant="contained" startIcon={<AddCircleOutlineIcon />} component="span" size="small" color='success' style={{ fontWeight: "bold", padding: "3px 20px", display: isTeacherModer ? "inherit" : "none" }}>
                                    Thêm bài tập
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <AssignItem listExercise={exercisesArray}></AssignItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thêm bài tập"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: 800,
                            maxWidth: '100%',
                            mt: 2
                        }}
                    >
                        <TextField onChange={(e) => setTitle(e.target.value)} fullWidth label="Tên bài tập" id="fullWidth" />
                    </Box>

                    <div className={style.selectDateTime}>
                        <FormControl sx={{ width: '50%', pr: '16px' }}>
                            <TextField
                                // InputProps={{ inputProps: { min: today } }}
                                type="date"
                                error={false}
                                value={startTime}
                                onChange={(event) => { setStartTime(event.target.value); startTimeExercise = event.target.value + " 00:00:00" }}
                                id="outlined-basic"
                                label="Thời gian bắt đầu"
                                focused={true}
                            />
                        </FormControl>

                        <FormControl sx={{ width: '50%', pl: '16px' }}>
                            <TextField
                                InputProps={{ inputProps: { min: startTime } }}
                                type="date"
                                error={false}
                                value={endTime}
                                onChange={(event) => { setEndTime(event.target.value); endTimeExercise = event.target.value + " 00:00:00"; }}
                                id="outlined-basic"
                                label="Thời gian kết thúc"
                                focused={true}
                            />
                        </FormControl>
                    </div>
                    {/* </Box> */}
                    <Box
                        sx={{
                            width: 800,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField
                            onChange={(e) => setContent(e.target.value)}
                            id="outlined-multiline-static"
                            label="Nội dung bài tập"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>
                    <div id="File name">{fileSubmit === undefined || JSON.stringify(fileSubmit) === JSON.stringify([]) ? "" : "File đã chọn: " + (fileSubmit.name === undefined ? "" : fileSubmit.name)}</div>
                    <label htmlFor="contained-button-file">
                        <Input accept="*/*" id="contained-button-file" multiple type="file" onChange={(e) => onChange(e)} />
                        <Button variant="contained" component="span" size="small"
                            color='success' style={{ fontWeight: "bold", padding: "3px 20px", marginTop: 20 }}
                            className={clsx(style.absolute, style.bold, style.btnSubmit)}>
                            Chọn file
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={handleConfirmAddExercise} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            <AppToast content={toastMess} type={0} isOpen={openToast} callback={() => {
                setOpenToast(false);
            }} />
        </Fragment >


    )

}


export default ExerciseAssigned