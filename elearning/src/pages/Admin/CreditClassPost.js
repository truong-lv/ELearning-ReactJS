import * as React from 'react';
import {useState,useEffect, useCallback, Fragment} from 'react';
import axios from 'axios'

import { styled,alpha } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import SearchIcon from '@mui/icons-material/Search';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AppToast from '../../myTool/AppToast'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#C7D9FD', 0.15),
    '&:hover': {
      backgroundColor: alpha('#C7D9FD', 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#C7D9FD',
      color: theme.palette.common.black,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
function CreditClassPost(){
    const [listCreditClass,setListCreditClass]=useState([]);
    const [pageNo,setPageNo]=useState(1);
    const [pageSum,setPageSum]=useState(0);
    const [creditClassIdFocus,setCreditClassIdFocus]=useState(0)
    const loadCreditClass=()=>{
        const token=localStorage.getItem('accessToken')
            axios.get('api/admin/creditclass/get-credit-class-total-post/'+pageNo,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
    
                setPageSum(response.data.totalPage)
                setListCreditClass(response.data.creditClassDTOS)
    
            }).catch(error => console.log(error))
      }
      
      useEffect(() => {
        loadCreditClass();
      },[pageNo])

      const handleChangePage = (event, value) => {
        setPageNo(value);
      };

    return (
        <Fragment>
      <div style={{display:'flex',margin:'10px 0', justifyContent:'flex-end'}}>
      <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {/* <Button color="success" variant="contained" onClick={handleClickOpen} endIcon={<AddIcon />}>
            Thêm
          </Button> */}
          </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <TableRow>
              <StyledTableCell>Mã lớp</StyledTableCell>
              <StyledTableCell align="center">Môn học</StyledTableCell>
              <StyledTableCell align="center">Khoa</StyledTableCell>
              <StyledTableCell align="center">Niên khóa</StyledTableCell>
              <StyledTableCell align="center">Học kỳ</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Chi tiết</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCreditClass.map((creditClass) => (
              <StyledTableRow key={creditClass.creditClassId}>
                <StyledTableCell component="th" scope="row">
                  {creditClass.creditClassId}
                </StyledTableCell>
                <StyledTableCell align="left">{creditClass.subjectName}</StyledTableCell>
                <StyledTableCell align="left">{creditClass.departmentName}</StyledTableCell>
                <StyledTableCell align="center">{creditClass.schoolYear}</StyledTableCell>
                <StyledTableCell align="center">{creditClass.semester}</StyledTableCell>
                <StyledTableCell align="center">Posts: {creditClass.totalPost} - Comments: {creditClass.totalComment} </StyledTableCell>
                <StyledTableCell align="center">
                <IconButton aria-label="edit" size="large" color='secondary' >
                  <FeedOutlinedIcon fontSize="inherit" />
                </IconButton> 
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      <Stack spacing={2} sx={{margin:'20px'}}>
        <Pagination count={pageSum} variant="outlined" color="primary" onChange={handleChangePage}/>
      </Stack>
      {/* <FormDialog isOpen={open} 
                  handleClose={handleClose} 
                  creditClass={creditClassUpdate} 
                  timeline={timeline}/> */}
      {/* <AppToast content={"Xóa lớp có mã "+ creditClassIdFocus +" thành công"} type={0} isOpen={openToast} callback={() => {
            setOpenToast(false);
          }}/>
          <Dialog
          open={openDetail}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thông báo từ hệ thống"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có muốn xóa lớp có mã {creditClassIdFocus} không
              </DialogContentText>
            </DialogContent>

            <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
              <Button onClick={handleConfirm}>Ok</Button>
            </DialogActions>

          </Dialog> */}
    </Fragment>
    )
}
export default CreditClassPost