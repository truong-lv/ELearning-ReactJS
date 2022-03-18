import Navbar from "../../component/Navbar/Nabar"
import Container from '@mui/material/Container';
import { Fragment, useEffect, useState } from "react";

import style from "./style.module.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import stringAvatar from '../../myTool/handleAvatar';
import axios from 'axios'

function Infor(){
    const [userInfo,setUserInfo]=useState({})
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const token=localStorage.getItem('accessToken')
        axios.get('/api/user/get-user-info',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            
            setUserInfo({...response.data})
        //console.log(response.data)
            
        }).catch(error => console.log(error))
    },[])
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function DialogChangePassword(isOpen){
        return (
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Đổi mật khẩu
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Fragment>
          <Navbar/>
          <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1 }} className={style.boxContainer}>
                <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                    THÔNG TIN CÁ NHÂN
                </Typography>
                <Container maxWidth="md" >
                <div className={style.styleAvatar}>
                    <Avatar
                        
                        alt="Remy Sharp"
                        {...stringAvatar("Vĩnh Trường",100,100)}
                    />
                </div>
                <Grid container rowSpacing={2}>
                    <Grid item container direction='row' columnSpacing={3}>
                        <Grid item="true"  md={6}>
                            <TextField label="Mã" color="primary" fullWidth="true"
                            focused
                            disabled={true}
                            value={userInfo.userId}
                            
                            />
                        </Grid>
                        <Grid item="true"  md={6}>
                            <TextField label="Họ tên" color="primary" fullWidth="true"
                            focused
                            disabled={true}
                            value={userInfo.fullname}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction='row' columnSpacing={3}>
                        <Grid item="true"  md={6}>
                            <TextField label="Giới tính" color="primary" fullWidth="true" 
                            focused
                            disabled={true}
                            value={userInfo.gender}
                            />
                        </Grid>
                        <Grid item="true"  md={6}>
                            <TextField label="Ngày sinh" color="primary" fullWidth="true"
                            focused
                            disabled={true}
                            value={userInfo.dateOfBirth}
                            />
                        </Grid>
                    </Grid>
                    <Grid item="true" md={12}>
                        <TextField label="Email" color="primary" fullWidth="true"
                        focused
                        disabled={true}
                        value={userInfo.email}
                        />
                    </Grid>
                    <Grid item="true" md={12}>
                        <TextField label="Điện thoại" color="primary" fullWidth="true"
                        focused
                        disabled={true}
                        value={userInfo.phone}
                        />
                    </Grid>
                    <Grid item="true" md={12}>
                        <TextField label="Địa chỉ" color="primary" fullWidth="true"
                        focused
                        disabled={true}
                        value={userInfo.address}
                        />
                    </Grid>
                    <Grid item="true" md={12}>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Đổi mật khẩu
                        </Button>
                        <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Đổi mật khẩu
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleClose} autoFocus>
                                Agree
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    
                </Grid>
            </Container>
            </Box>
          </Container>
      </Fragment>
    )
}
export default Infor