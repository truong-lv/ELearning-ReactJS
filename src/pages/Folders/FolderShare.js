import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import axios from 'axios'

import { Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Navbar from "../../component/Navbar/Nabar"
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import clsx from 'clsx'

import Folders from '../../component/FolderShareInfo/Folders'

import style from './style.module.scss'
import { useParams, useLocation } from 'react-router-dom'

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function FolderShare() {
    let newDocument = '';
    const [data, setData] = useState([])
    const { id, subjectName } = useParams();
    const [isOpenAddFolder, setIsOpenAddFolder] = useState(false);
    const location = useLocation();
    const teacherArray = location.state.teacherInfos;
    let teacherNames = '';

    const userRoles = useSelector(state => state.infor.roles || [])
    const isTeacherModer = userRoles.some(role => role === 'ROLE_TEACHER' || role === 'ROLE_MODERATOR')

    const [loading, setLoading] = useState(false);

    const handleCloseLoadding = () => {
        setLoading(false);
    };

    const handleAddFolder = () => {
        setIsOpenAddFolder(true)
    }

    const handleCloseAddFolder = () => {
        setIsOpenAddFolder(false)
      }

    const handleTeacherArray = (() => {
        teacherArray.map((value) => {
            if (teacherArray.indexOf(value) === 0)
                teacherNames += value.fullname
            else
                teacherNames += `/${value.fullname}`

            return teacherNames;
        })
    })()

    const handleConfirmAddFolder = () => {
        const token = localStorage.getItem('accessToken')
        var config = {
          method: 'post',
          url: axios.defaults.baseURL + '/api/folder/create-new-folder',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ creditClassId: id, folderName: newDocument, parentId: 0 })
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200 || response.status === 201) {
                handleCloseAddFolder();
                loadFolder();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    const loadFolder = () => {
        setLoading(true);
        const token = localStorage.getItem('accessToken')
        axios.get(`/api/credit-class/creditclass-detail?creditclass_id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setLoading(false);
            setData(response.data.folders)
        }).catch(error => { console.log(error); setLoading(false); })
    }

    useEffect(() => {
        loadFolder();
    }, [])

    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={12} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true} sx={{ pb: 1 }} className={clsx(style.headingContainer, style.flex)}>
                                <Typography variant='h5' className={style.heading}>TÀI LIỆU CHIA SẺ</Typography>
                            </Grid>
                            <Grid item={true} sx={{ mb: 6 }} className={clsx(style.folderShareInfo, style.flex)}>
                                <Typography component="div" >
                                    {subjectName} - {teacherNames}
                                </Typography>
                                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} component="span" size="small" color='success' style={{ fontWeight: "bold", padding: "3px 20px", display: isTeacherModer ? "inherit" : "none" }} onClick={() =>     {handleAddFolder() }}>
                                    Thêm thư mục
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <Folders folders={data} teacherName={teacherNames}></Folders>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleCloseLoadding}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog fullWidth
                maxWidth={'sm'} open={isOpenAddFolder} onClose={handleCloseAddFolder}>
                <DialogTitle>Thêm thư mục</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Hãy nhập tên thư mục
                </DialogContentText>
                <TextField
                    autoFocus
                    multiline
                    margin="dense"
                    id="name"
                    label="Tên"
                    type="text"
                    onChange={(event) => { newDocument = event.target.value }}
                    fullWidth
                    variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFolder}>Hủy</Button>
          <Button onClick={handleConfirmAddFolder}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
        </Fragment >
    )

}


export default FolderShare