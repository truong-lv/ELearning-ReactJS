import clsx from 'clsx'

import style from './listSV.module.scss'

import { useSelector } from 'react-redux'

import teacher from '../../assets/image/teacher.png'
import student from '../../assets/image/student.png'

import { useEffect, useState, Fragment, useRef } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



function Member({ value }) {

    const [studentNameFocus, setStudentNameFocus] = useState('')
    const [studentCodeFocus, setStudentCodeFocus] = useState(0)
    const userRoles = useSelector(state => state.infor.roles || [])
    const isTeacherModer = userRoles.some(role => role === 'ROLE_TEACHER' || role === 'ROLE_MODERATOR')

    const [open, setOpen] = useState(false);

    const handleDelete = (id, name) => {
        setStudentCodeFocus(id)
        setStudentNameFocus(name)
        setOpen(true);

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const array = useRef([value])
    let svCount = useRef(0)
    let gvCount = useRef(0)
    return (
        <Typography component='div'>
            {array.current.map((value) => {
                if (value.teacherInfos === undefined || value.students === undefined) {
                }
                else {
                    gvCount = value.teacherInfos.length
                    svCount = value.students.length
                    return (
                        <Fragment key={value}>
                            <div className={clsx(style.headingContainer, style.flex, style.spaceBetween, style.mt50)}>
                                <Typography variant='h6' component='div' className={style.bold}> GIẢNG VIÊN </Typography>
                                <Typography component='div' className={clsx(style.grayText, style.bold)}> {gvCount} giảng viên </Typography>
                            </div>

                            {value.teacherInfos.map((info) => {
                                return (
                                    <Typography key={value.teacherInfos.phones} className={clsx(style.listMember, style.flex)}>
                                        <img className={style.imgTeacher} src={teacher} alt='teacher img' />
                                        <span>{info.fullname}</span>
                                    </Typography>
                                )
                            })}
                            <div className={clsx(style.headingContainer, style.flex, style.spaceBetween, style.mt50)}>
                                <Typography variant='h6' component='div' className={style.bold}>SINH VIÊN</Typography>
                                <div className={clsx(style.flex, style.spaceBetween)}>
                                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} component="span" size="small" color='success' style={{ fontWeight: "bold", padding: "3px 20px", marginRight: 16 }}>
                                        Thêm sinh viên
                                    </Button>
                                    <Typography component='div' className={clsx(style.grayText, style.bold)}> {svCount} sinh viên </Typography>
                                </div>
                            </div>
                            {value.students.map((info) => {
                                return (
                                    <Typography key={value.students.studentCode} className={clsx(style.listMember, style.flex, style.spaceBetween)}>
                                        <div className={clsx(style.flex, style.spaceBetween)}>
                                            <img style={{ width: 24, height: 24, marginRight: 16 }} src={student} alt='student img' />
                                            <span>{info.studentCode} - {info.fullnanme}</span>
                                        </div>
                                        <IconButton aria-label="delete" size="large" color='error' sx={{ marginRight: 4 }} style={{ display: isTeacherModer ? "inherit" : "none" }}
                                            onClick={() => (handleDelete(info.studentCode, info.fullnanme))}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Typography>
                                )
                            })}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Xóa học sinh?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Bạn có chắc chắn xóa học sinh {studentNameFocus} mã số {studentCodeFocus} không?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Hủy bỏ</Button>
                                    <Button onClick={handleClose} autoFocus>
                                        Đông ý
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Fragment>
                    )
                }
            })}
        </Typography >
    )
}


export default function ListSV(listSV) {
    const list = [listSV.listSV]
    return (
        <div>
            {list.map((value) => {
                return <Member key={value} value={value} />
            })}
        </div>
    )

}
