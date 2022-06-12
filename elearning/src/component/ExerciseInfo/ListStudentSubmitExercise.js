import clsx from 'clsx'
import axios from 'axios'
import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom';

import AppToast from '../../myTool/AppToast'
import style from './ExerciseInfo.module.scss'
import { getOnlyDateISO } from '../../myTool/fomatDateTime'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadIcon from '@mui/icons-material/Download';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import DialogContentText from '@mui/material/DialogContentText';


export default function ListStudentSubmitExercise({ listStudent, exerciseName }) {

    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [mark, setMark] = useState(0);
    const [isError, setIsError] = useState(false);
    const [contentError, setContentError] = useState('');
    const [userIdStudent, setUserIdStudent] = useState(0);
    const [openToastError, setOpenToastError] = useState(false);
    const [openToastSuccess, setOpenToastSuccess] = useState(false);

    const handleClickOpen = (studentCode) => {
        setOpen(true);
        setUserIdStudent(studentCode);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFillMark = (e) => {

        if (e.target.value === "") {
            setIsError(true);
            setContentError("Điểm không được để trống")
        }
        else if (e.target.value < 0 || e.target.value > 10) {
            setIsError(true);
            setContentError("Điểm không hợp lệ")
        }
        else {
            setIsError(false);
            setMark(parseFloat(e.target.value))
        }
    }

    const handleUpdateScore = () => {
        if (isError) {
            setOpenToastError(true);
        }
        else {
            const token = localStorage.getItem('accessToken');
            var config = {
                method: 'put',
                url: axios.defaults.baseURL + `/api/submit/mark`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },

                data: JSON.stringify({ "excerciseId": id, "mark": mark, "userId": userIdStudent })
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        setOpenToastSuccess(true)
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const getFileToDownload = (URL, fullNameStudent) => {
        const token = localStorage.getItem('accessToken')
        axios.get(URL, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fullNameStudent + "_" + exerciseName
            link.click()
        }).catch(error => console.log(error))
    }

    return (
        <Fragment>
            <Container maxWidth="lg" sx={{ mb: 10 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>DANH SÁCH SINH VIÊN NỘP BÀI TẬP</Typography>
                            </Grid>
                            <TableContainer component={Paper} sx={{ mt: 5 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow className={style.listStudentSubmitTitle}>
                                            <TableCell className={style.bold} align="center">STT</TableCell>
                                            <TableCell className={style.bold} align="center">Mã</TableCell>
                                            <TableCell className={style.bold} align="center">Họ và Tên</TableCell>
                                            <TableCell className={style.bold} align="center">Thời gian nộp</TableCell>
                                            <TableCell className={style.bold} align="center">Điểm</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listStudent.map((value) => (
                                            <TableRow
                                                key={value.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">
                                                    {listStudent.indexOf(value) + 1}
                                                </TableCell>
                                                <TableCell align="center">{value.studentCode}</TableCell>
                                                <TableCell align="center">{value.fullname}</TableCell>
                                                <TableCell align="center">{getOnlyDateISO(value.submitTime)}</TableCell>
                                                <TableCell align="center">{value.mark}</TableCell>
                                                <TableCell align="center" style={{ width: '140px' }}>
                                                    <IconButton aria-label="download" size="large" color='error' onClick={() => handleClickOpen(value.userId)}>
                                                        <EditIcon fontSize="inherit" />
                                                    </IconButton>
                                                    <IconButton aria-label="download" size="large" color='success'
                                                        onClick={() => { getFileToDownload(value.documentURL, value.fullname) }}
                                                    >
                                                        <DownloadIcon fontSize="inherit" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <AppToast content={"Sửa điểm thành công"} type={0} isOpen={openToastSuccess} callback={() => {
                setOpenToastSuccess(false);
            }} />
            <AppToast content={contentError} type={1} isOpen={openToastError} callback={() => {
                setOpenToastError(false);
            }} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nhập điểm</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Điểm"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleFillMark(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleUpdateScore}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}