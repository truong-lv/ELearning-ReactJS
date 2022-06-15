import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import clsx from 'clsx';
import axios from 'axios';

import { useSelector } from 'react-redux'
import { Fragment, useRef, useState } from 'react'


import style from './Folders.module.scss'
import AppToast from '../../myTool/AppToast'
import folderImg from '../../assets/image/folder.png'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'



export default function Folders({ folders, teacherName}) {

    return (
        <TableContainer component={Paper}>
            {console.log(folders)}
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className={style.tableHeader} />
                        <TableCell className={style.tableHeader} />
                        <TableCell className={clsx(style.tableHeader, style.bold)}>Tên</TableCell>
                        <TableCell className={clsx(style.tableHeader, style.bold)} align="center">Người Chỉnh Sửa</TableCell>
                        <TableCell className={clsx(style.tableHeader, style.bold)} align="center">Chỉnh sửa lần cuối</TableCell>
                        <TableCell className={style.tableHeader} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {folders.map((folder) => (
                        <Row key={folder.folderId} folder={folder} teacherName={teacherName} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function Row(props) {
    const inputFile = useRef(null)
    const { folder, teacherName } = props;
    const [toastMess, setToastMess] = useState('');
    const [toastType, setToastType] = useState(0);
    const [openToast, setOpenToast] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [fileFocus, setFileFocus] = useState({})
    const [folderFocus, setFolderFocus] = useState({})
    const [openDeleteFolderConfirm, setOpenDeleteFolderConfirm] = useState(false);
    const [openDeleteFileConfirm, setOpenDeleteFileConfirm] = useState(false);

    const userRoles = useSelector(state => state.infor.roles || [])
    const isTeacherModer = userRoles.some(role => role === 'ROLE_TEACHER' || role === 'ROLE_MODERATOR')
    

    //handleAddFile
    const handleAddFile = () => {
        inputFile.current.click();
    }

    //handle delete file
    const handleDeleteFile = (file) => {
        setFileFocus(file);
        setOpenDeleteFileConfirm(true);
    }

    const handleDeleteFolder = (folder) => {
        setFolderFocus(folder); 
        setOpenDeleteFolderConfirm(true);
    }

    const handleCloseDeleteFolder = () => {
        setOpenDeleteFolderConfirm(false);
      }

    const handleCloseDeleteFile = () => {
        setOpenDeleteFileConfirm(false);
      }

    const onChangeFile = (event) => {
        event.preventDefault()
        handleConfirmAddFile(event.target.files[0]);
    }

    const handleConfirmDeleteFile = () => {
        handleCloseDeleteFile();
        // handleLoadding(true)
        const token = localStorage.getItem('accessToken')
        var config = {
          method: 'delete',
          url: axios.defaults.baseURL + '/api/admin/document/delete-document?document-id=' + fileFocus.documentId,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
                setToastMess("Xóa file thành công");
                setToastType(0);
                setOpenToast(true);
                window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
            // handleLoadding(false);
    
          });
      };

      const handleConfirmDeleteFolder = () => {
        const token = localStorage.getItem('accessToken')
        var config = {
          method: 'delete',
          url: axios.defaults.baseURL + '/api/folder/delete-folder?folder-id=' + folderFocus.folderId,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              handleCloseDeleteFolder();
              setToastType(0)
              setOpenToast(true);
              setToastMess("Xóa thư mục thành công")
              window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
            setToastType(1)
            setOpenToast(true);
            setToastMess(error.response.data)
          });
      };

    const handleConfirmAddFile = (file) => {
        if(file.size>(12*1024*1024)){
        //   handleShowToastErorr("File vượt quá kích thước 12MB")
          return;
        }
        
        // handleLoadding(true);
    
        const token = localStorage.getItem('accessToken')
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('file', file);
        var config = {
          method: 'post',
          url: axios.defaults.baseURL + '/api/admin/document/upload?folder-id=' + folder.folderId,
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
          data: formData
        };
        
        axios(config)
          .then(function (response) {
            if (response.status === 200 || response.status === 201) {
                setToastMess("Thêm file thành công");
                setToastType(0);
                setOpenToast(true);
                window.location.reload();
            }
          })
          .catch(function (error) {
            console.log({error});
          });
    }

    const getFileToDownload = (doc) => {
        const token = localStorage.getItem('accessToken')
        axios.get('api/admin/document/dowload/' + doc.documentId, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = doc.documentName
            link.click()
        }).catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <img className={style.imgFolder} src={folderImg} alt='folder img' />
                </TableCell>
                <TableCell>{folder.folderName}</TableCell>
                <TableCell align="center">{teacherName}</TableCell>
                <TableCell align="center">{getOnlyDateISO(folder.upTime)}</TableCell>
                <TableCell align="right">
                <IconButton aria-label="delete" size="large" color='error' style={{ display: isTeacherModer ? "inherit" : "none" }} onClick={() => { handleDeleteFolder(folder) }} >
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "15px" }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tài liệu
                            </Typography>
                            <Button color="success" variant="contained" endIcon={<AddIcon />} style={{ fontWeight: "bold", padding: "3px 20px", display: isTeacherModer ? "inherit" : "none" }} onClick={() => { handleAddFile() }}>
                            Thêm tài liệu
                            </Button>
                        </div>
                            
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Tên tài liệu</TableCell>
                                        <TableCell align="right">Ngày tạo</TableCell>
                                        <TableCell align="right">
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {folder.documents.map((document) => (
                                        <TableRow key={document.documentId}>
                                            <TableCell component="th" scope="row">
                                                <IconButton aria-label="delete" size="large" color='error' >
                                                    <ArticleIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell >{document.documentName}</TableCell>
                                            <TableCell align="right">
                                                {document.createAt.substring(0, document.createAt.indexOf('T')) + " "
                                                    + document.createAt.substring(document.createAt.indexOf(':') + 1, document.createAt.lastIndexOf('.'))}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="download" size="large" color='success' onClick={() => { getFileToDownload(document) }} >
                                                    <DownloadIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="large" color='error' style={{ display: isTeacherModer ? "inherit" : "none" }} onClick={() => { handleDeleteFile(document) }} >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <input type='file' id='file' ref={inputFile} 
            style={{ display: 'none' }} 
            onChange={(event) => onChangeFile(event)} />
            <AppToast content={toastMess} type={toastType} isOpen={openToast} callback={() => {
                setOpenToast(false);
            }} />
            <Dialog
        open={openDeleteFileConfirm}
        onClose={handleCloseDeleteFile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thông báo từ hệ thống"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa thư mục có tên: <strong>{fileFocus.documentName}</strong> không ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteFile}>Cancel</Button>
          <Button onClick={handleConfirmDeleteFile}>Ok</Button>
        </DialogActions>

      </Dialog>
      <Dialog
        open={openDeleteFolderConfirm}
        onClose={handleCloseDeleteFolder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thông báo từ hệ thống"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa thư mục có tên: <strong>{folderFocus.folderName}</strong> không ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteFolder}>Cancel</Button>
          <Button onClick={handleConfirmDeleteFolder}>Ok</Button>
        </DialogActions>

      </Dialog>
        </React.Fragment>
    );
}
