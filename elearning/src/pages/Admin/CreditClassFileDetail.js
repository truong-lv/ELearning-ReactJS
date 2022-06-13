import { React, useState, useEffect, Fragment, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import AppAvatar from '../../myTool/handleAvatar';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import AppToast from '../../myTool/AppToast'

export default function CreditClassPostDetail() {
  const { id, name } = useParams();
  const [listFolder, setListFolder] = useState([])
  const [isOpenAddFolder, setIsOpenAddFolder] = useState(false);
  const [openDeleteFolderConfirm, setOpenDeleteFolderConfirm] = useState(false);
  const [folderFocus, setFolderFocus] = useState({})
  const handleDeleteFolder = useCallback((folder) => { setFolderFocus(folder); setOpenDeleteFolderConfirm(true); }, [folderFocus])
  const handleAddFileDone = useCallback(() => { handleAddFile() }, [listFolder])
  const handleDeleteFileDone = useCallback(() => { handleDeleteFile() }, [listFolder])
  let newDocument = '';

  const [openToast, setOpenToast] = useState(false);
  const [toastMess, setToastMess] = useState('');
  const [loadding, setLoadding] = useState(false)

  const loadDocuments = () => {
    setLoadding(true);
    const token = localStorage.getItem('accessToken')
    axios.get('api/credit-class/creditclass-detail?creditclass_id=' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {

      setListFolder(response.data.folders)
      setLoadding(false);

    }).catch(error => {
      console.log(error)
      setLoadding(false);
    })
  }

  useEffect(() => {
    loadDocuments();

  }, [])

  const handleCloseLoadding = () => {
    setLoadding(false);
  };



  // ==================Handle FOLDER===================
  //----handle add folder-----------------
  const handleAddFolder = () => {
    setIsOpenAddFolder(true)

  }
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
          loadDocuments();
          setOpenToast(true);
          setToastMess("Thêm thư mục thành công")
        }
      })
      .catch(function (error) {
        console.log(error);
        setOpenToast(true);
        setToastMess("Thêm thư mục thất bại")
      });
  }
  const handleCloseAddFolder = () => {
    setIsOpenAddFolder(false)
  }

  //----handle delete folder-----------------
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
          loadDocuments();
          handleCloseDeleteFolder();
          setOpenToast(true);
          setToastMess("Xóa thư mục thành công")
        }
      })
      .catch(function (error) {
        console.log(error);
        setOpenToast(true);
        setToastMess("Xóa thư mục thất bại")
      });
  };
  const handleCloseDeleteFolder = () => {
    setOpenDeleteFolderConfirm(false);
  }

  //========HANDLE FILE================
  //-------Add file----------
  const handleAddFile = () => {
    loadDocuments();
    setOpenToast(true);
    setToastMess("Thêm tài liệu thành công")
  }
  //-------Delete file----------
  const handleDeleteFile = () => {
    loadDocuments();
    setOpenToast(true);
    setToastMess("Xóa tài liệu thành công")
  }

  return (
    <div style={{ padding: 14 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "15px" }}>
        <Typography variant='h6' component='div' color="#2980B9">Tài liệu của lớp: {id} - {name}</Typography>
        <Button color="success" variant="contained" endIcon={<AddIcon />} onClick={() => { handleAddFolder() }}>
          Thêm thư mục
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell></TableCell>
              <TableCell>Tên thư mục</TableCell>
              <TableCell align="right">Thời gian</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listFolder.map((folder) => (
              <Row key={folder.folderId} folder={folder}
                handleDeleteFolder={handleDeleteFolder}
                handleAddFileDone={handleAddFileDone}
                handleDeleteFileDone={handleDeleteFileDone} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* =========================DIALOG ADD FOLDER=============================== */}
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

      {/* DIALOG CONFIRM DELETE FOLDER */}
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

      {/* SHOW TOAST THÔNG BÁO KẾT QUẢ */}
      <AppToast content={toastMess} type={0} isOpen={openToast} callback={() => {
        setOpenToast(false);
      }} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadding}
        onClick={handleCloseLoadding}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}




function Row(props) {
  const { folder, handleDeleteFolder, handleAddFileDone, handleDeleteFileDone } = props;
  const [open, setOpen] = useState(false);
  const [seletedFile, setSelectedFile] = useState();
  const inputFile = useRef(null)
  const [isOpenAddFile, setIsOpenAddFile] = useState(false);
  const [openDeleteFileConfirm, setOpenDeleteFileConfirm] = useState(false);
  const [fileFocus, setFileFocus] = useState({})
  // ==================Handle File===================
  //----handle add File-----------------
  const handleAddFile = () => {
    inputFile.current.click();
  }

  const onChangeFile = (event) => {
    event.preventDefault()
    handleConfirmAddFile(event.target.files[0]);
  }

  const handleConfirmAddFile = (file) => {
    const token = localStorage.getItem('accessToken')
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
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
          handleCloseAddFile();
          handleAddFileDone();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleCloseAddFile = () => {
    setIsOpenAddFile(false)
  }

  //----handle delete File-----------------
  const handleDeleteFile = (file) => {
    setFileFocus(file);
    setOpenDeleteFileConfirm(true);
  }

  const handleConfirmDeleteFile = () => {
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
          handleCloseDeleteFile();
          handleDeleteFileDone();
        }
      })
      .catch(function (error) {
        console.log(error);

      });
  };
  const handleCloseDeleteFile = () => {
    setOpenDeleteFileConfirm(false);
  }

  //----HANDLE DOWLOAD FILE-----------------------
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
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <FolderIcon fontSize="large" color="warning" />
        </TableCell>
        <TableCell component="th" scope="row">
          {folder.folderName}
        </TableCell>
        <TableCell align="right">
          {folder.upTime.substring(0, folder.upTime.indexOf('T')) + " "
            + folder.upTime.substring(folder.upTime.indexOf(':') + 1, folder.upTime.lastIndexOf('.'))}
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" size="large" color='error' onClick={() => { handleDeleteFolder(folder) }} >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, border: '1px dashed blue', padding: "8px" }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "15px" }}>
                <Typography variant="h6" gutterBottom component="div">
                  Danh sách các tài liệu
                </Typography>
                <Button color="success" variant="contained" endIcon={<AddIcon />} onClick={() => { handleAddFile() }}>
                  Thêm tài liệu
                </Button>
              </div>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
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
                      <TableCell>{document.documentName}</TableCell>
                      <TableCell align="right">
                        {document.createAt.substring(0, document.createAt.indexOf('T')) + " "
                          + document.createAt.substring(document.createAt.indexOf(':') + 1, document.createAt.lastIndexOf('.'))}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="download" size="large" color='success' onClick={() => { getFileToDownload(document) }} >
                          <DownloadIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="large" color='error' onClick={() => { handleDeleteFile(document) }} >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography sx={{ textAlign: 'right', margin: "8px" }} variant="p" gutterBottom component="div">
                Số lượng: {folder.documents.length}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={(event) => onChangeFile(event)} />
      {/* DIALOG CONFIRM DELETE File */}
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
    </Fragment>
  );
}
