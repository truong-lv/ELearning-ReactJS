import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import clsx from 'clsx'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useEffect, useState, Fragment } from 'react'

import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'

import delete_img from '../../assets/image/delete_img.png'

import style from './listSV.module.scss'
import teacher from '../../assets/image/teacher.png'

function Member({ value }) {

    const userRoles = useSelector(state => state.infor.roles || [])
    const isTeacherModer = userRoles.some(role => role === 'ROLE_TEACHER' || role === 'ROLE_MODERATOR')

    const [open, setOpen] = useState(false);

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
                            <div className={clsx(style.headingContainer, style.flex, style.mt50)}>
                                <Typography variant='h6' component='div' className={style.bold}> GIẢNG VIÊN </Typography>
                                <Typography component='div' className={clsx(style.grayText, style.bold)}> {gvCount} giảng viên </Typography>
                            </div>

                            {value.teacherInfos.map((info) => {
                                return (
                                    <Typography key={value.teacherInfos.phones} className={style.listMember}>
                                        <img className={style.imgTeacher} src={teacher} alt='folder img' />
                                        <span>{info.fullname}</span>
                                    </Typography>
                                )
                            })}
                            <div className={clsx(style.headingContainer, style.flex, style.mt50)}>
                                <Typography variant='h6' component='div' className={style.bold}>SINH VIÊN</Typography>
                                <div className={style.flex}>
                                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} component="span" size="small" color='success' style={{ fontWeight: "bold", padding: "3px 20px", marginRight: 16 }}>
                                        Thêm sinh viên
                                    </Button>
                                    <Typography component='div' className={clsx(style.grayText, style.bold)}> {svCount} sinh viên </Typography>
                                </div>
                            </div>
                            {value.students.map((info) => {
                                return (
                                    <Typography key={value.students.studentCode} className={clsx(style.listMember, style.flex)}>
                                        <div className={style.flex}>
                                            <span>{info.studentCode} - {info.fullnanme}</span>
                                        </div>
                                        <img onClick={handleClickOpen} style={{ width: 28, height: 28, marginRight: 24, display: isTeacherModer ? "inline" : "none" }} src={delete_img} alt='folder img' />
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                        // aria-labelledby="alert-dialog-title"
                                        // aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Xóa học sinh?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Bạn có chắc chắn xóa học sinh {info.fullnanme} mã số {info.studentCode} không?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Hủy bỏ</Button>
                                                <Button onClick={handleClose} autoFocus>
                                                    Đông ý
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Typography>
                                )
                            })}
                        </Fragment>
                    )
                }
            })}
        </Typography>
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
