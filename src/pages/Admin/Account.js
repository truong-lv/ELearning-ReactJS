
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
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
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
function Account(){
  const [listAccount,setListAccount]=useState([]);

  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [userId,setUserId]=useState(0)
  const handleSetUserId=useCallback((userId)=>{setUserId(userId)},[userId]);
  const [pageNo,setPageNo]=useState(1);
  const [pageSum,setPageSum]=useState(0);
  const [accountFocus,setAccountFocus]=useState(0)

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdatePass, setIsOpenUpdatePass] = useState(false);
  
  const listRole=[{id:"teacher",roleName:"Giáo viên"},
                  {id:"mod",roleName:"Quản trị"},
                  {id:"student",roleName:"Sinh viên"}];
  const [roleSelecteds,setRoleSelecteds]=useState([]);
  const [erorrMess,setErorrMess]=useState('')
  const [openToast, setOpenToast] = useState(false);
  const [toastMess, setToastMess] = useState('');
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
const resetFieldState=()=>{
  setUsername('')
  setPassword('')
  setUserId(0)
  setRoleSelecteds([])
  setErorrMess('')
}

function checkValidInput(){
  let erorrStr=[];
  let checkErorr=false;
  if(roleSelecteds.length===0){erorrStr.push('Quyền không được để trống');checkErorr=true}
  if(setUserId===0){erorrStr.push('Thông tin người dùng không được để trống');checkErorr=true}
  if(username===''){erorrStr.push('Tên tài khoản không được để trống');checkErorr=true}
  if(password===''){erorrStr.push('Mật khẩu không được để trống');checkErorr=true}
  else if(password.length<6) {erorrStr.push('Mật khẩu tối thiểu 6 kí tự');checkErorr=true}
  setErorrMess(erorrStr.join(', '));
  return checkErorr;
}

  function getStyles(name, teacherSelects, theme) {
    return {
      fontWeight:
        teacherSelects.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const loadAccount=()=>{
    const token=localStorage.getItem('accessToken')
    axios.get('api/auth/get-all-account-info/'+pageNo,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {

        setPageSum(response.data.totalPage)
        setListAccount(response.data.accountsInfo)
    }).catch(error => console.log(error))
  }
    
    useEffect(() => {
      loadAccount();
    },[pageNo])

    

    const handleChangePage = (event, value) => {
      setPageNo(value);
    };

    const handleChangeRole = (event) => {
      const { target: { value }, } = event;
      setRoleSelecteds(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleConfirm = () => {
      if(checkValidInput())return;

      const token=localStorage.getItem('accessToken')
      const data={
        username:username,
        role:roleSelecteds,
        password:password,
        key:"000000",
        codeValue:"000000"
      }
      var config = {
        method: 'post',
        url: axios.defaults.baseURL + '/api/auth/create-new-account?user-id='+userId,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };
      console.log(JSON.stringify(data))
      axios(config)
        .then(function (response) {
          if(response.status===200){
            loadAccount();
            resetFieldState();
            handleCloseConfirm();
            setToastMess("Thêm tài khoản thành công")
            setOpenToast(true);
            
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
          setErorrMess(error.response.data.message)
        });
    }
    const handleCloseConfirm = () => {
      setIsOpen(false)
      resetFieldState();
    }

    //HANDLE UPDATE PASSWORD
    const handleUpdatePass=(name)=> {
      setUsername(name);
      setIsOpenUpdatePass(true)
    }
    const handleConfirmUpdatePass=()=> {
      const token=localStorage.getItem('accessToken')
      const data={
        username:username,
        password:password
      }
      var config = {
        method: 'put',
        url: axios.defaults.baseURL + '/api/auth/update-new-password',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };
      console.log(JSON.stringify(data))
      axios(config)
        .then(function (response) {
          if(response.status===200){
            loadAccount();
            handleCloseUpdatePass();
            resetFieldState();
            setToastMess("Cập nhập mật khẩu thành công")
            setOpenToast(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const handleCloseUpdatePass= () => {
      setIsOpenUpdatePass(false)
      resetFieldState();
    }

  return (
      <Fragment>
        <div style={{ display:'flex',justifyContent:'space-between', marginBottom:"15px"}}>
          <Typography variant='h6' component='div' color="#2980B9">QUẢN LÝ TÀI KHOẢN</Typography>
          <Button color="success" variant="contained"endIcon={<AddIcon />} onClick={()=>{setIsOpen(true)}}>
              Thêm tài khoản
          </Button>
        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
          <TableRow>
            <StyledTableCell align="center">Mã tài khoản</StyledTableCell>
            <StyledTableCell align="center">Tên tài khoản</StyledTableCell>
            <StyledTableCell align="center">Họ tên người dùng</StyledTableCell>
            <StyledTableCell align="center">Quyền</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Điện thoại</StyledTableCell>
            <StyledTableCell align="center">Cập nhật mật khẩu</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAccount.map((accountInfor) => (
            <StyledTableRow key={accountInfor.accountId}>
              <StyledTableCell component="th" scope="row">
                {accountInfor.accountId}
              </StyledTableCell>
              <StyledTableCell align="center">{accountInfor.username}</StyledTableCell>
              <StyledTableCell align="left">{accountInfor.userInfoDTO.fullname}</StyledTableCell>
              <StyledTableCell align="left">{accountInfor.userInfoDTO.roles.join(", ")}</StyledTableCell>
              <StyledTableCell align="left">{accountInfor.userInfoDTO.email}</StyledTableCell>
              <StyledTableCell align="center">{accountInfor.userInfoDTO.phone}</StyledTableCell>
              <StyledTableCell align="center">
                  <IconButton aria-label="edit" size="large" color='secondary' onClick={() =>handleUpdatePass(accountInfor.username)}>
                      <EditOutlinedIcon fontSize="inherit" />
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

    {/* =========================DIALOG THÊM ACCOUNT========================= */}
    <Dialog open={isOpen} onClose={handleCloseConfirm} 
    component="form"
    fullWidth
    maxWidth={'md'}
    noValidate
    >
      <DialogTitle>Thêm tài khoản</DialogTitle>
      <DialogContent>
        <FormControl sx={{  width: '100%' ,margin:'8px 0'}}>
          <InputLabel id="demo-multiple-name-label">Quyền</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={roleSelecteds}
            onChange={handleChangeRole}
            input={<OutlinedInput label="Quyền" />}
            MenuProps={MenuProps}
          >
            {listRole.map((role) => (
              <MenuItem
                key={role.id}
                value={role.id}
                style={getStyles(role.roleName, roleSelecteds, theme)}
              >
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Asynchronous handleSetUserId={handleSetUserId}/>

        <FormControl sx={{  width: '100%' ,margin:'8px 0'}}>
          <TextField 
            value={username} onChange={(event) => {setUsername(event.target.value)}}
            id="outlined-basic" label="Tài khoản" 
            variant="outlined" type="text"/>
        </FormControl>
        <FormControl sx={{  width: '100%' ,margin:'8px 0'}}>
          <TextField 
            value={password} onChange={(event) => {setPassword(event.target.value)}}
            id="outlined-basic2" label="Mật khẩu" 
            variant="outlined" type="text" />
        </FormControl>
        <Typography style={{margin:'8px'}} variant='p' component='div' color="#f0350c">{erorrMess}</Typography>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleCloseConfirm}>Hủy</Button>
          <Button onClick={() => {handleConfirm()}}>Xác nhận</Button>
      </DialogActions>
    </Dialog>

    {/* =========================DIALOG UPDATE PASSWORD=============================== */}
    <Dialog  fullWidth
            maxWidth={'sm'} open={isOpenUpdatePass} onClose={handleCloseUpdatePass}>
        <DialogTitle>Cập nhập mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hãy nhập mật khẩu mới
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="name"
            label="Mật khẩu"
            type="text"
            value={password} onChange={(event) => {setPassword(event.target.value)}}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdatePass}>Hủy</Button>
          <Button onClick={handleConfirmUpdatePass}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
       {/* SHOW TOAST THÔNG BÁO KẾT QUẢ */}
       <AppToast content={toastMess} type={0} isOpen={openToast} callback={() => {
            setOpenToast(false);
            }}/>
  </Fragment>
  )
}
export default Account




function Asynchronous({handleSetUserId}) {
  const [open, setOpen] = useState(false);
  const [loading,setLoadding] = useState(false);;
  const [listUserInfo,setListUserInfo]=useState([]);
  const [keySearch,setKeySearch]=useState('');

  useEffect(() => {
    setLoadding(true)
    const token=localStorage.getItem('accessToken')
    axios.get('api/auth/search-user-info?key-search='+keySearch,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
      if(response.status===200){
        setListUserInfo(response.data)
        setLoadding(false)
      }
    }).catch(error => {console.log(error);setLoadding(false)})
  },[keySearch])

  useEffect(() => {
    if (!open) {
      setListUserInfo([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: "100%" ,margin: "8px 0"}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(listUserInfo) => listUserInfo.userId+", "+listUserInfo.fullname+", "+listUserInfo.email+", "+listUserInfo.phone}
      options={listUserInfo}
      loading={loading}
      renderInput={(params) =>{  
        if(params.inputProps.value!==''){
          let id=params.inputProps.value;
          id=id.substring(0, id.indexOf(','))
          if(!isNaN(id)){
            handleSetUserId(Number(id));
          }
        }
        return(
          <TextField
            {...params}
            
            label="Người cần tạo tài khoản(gợi ý nhập email, sđt hoặc tên để tìm kiếm)"
            value={keySearch}
            onChange={(event)=>setKeySearch(event.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}}
    />
  );
}