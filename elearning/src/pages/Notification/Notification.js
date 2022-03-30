import Navbar from "../../component/Navbar/Nabar"
import { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import IconButton from '@mui/material/IconButton';
import { red, yellow,blue  } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import style from "./style.module.scss"
import {fomatDateTimeText} from "../../myTool/fomatDateTime"
import AppToast from '../../myTool/AppToast'


function Notification(){
  const [pageNo, setPageNo] = useState(0)
  const [listNotifi, setListNotifi] = useState([])
  const [unseenNoti,setUnseenNoti]=useState(0)
  const [messApi, setMessApi] = useState({})
  const [detailContent, setDetailContent] = useState('')
  const [openToast, setOpenToast] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const token=localStorage.getItem('accessToken')
        axios.get('/api/notification/all-notification/',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            
          setListNotifi(response.data)
        }).catch(error => console.log(error))
  }, [refresh]);

  useEffect(() => {
    const token=localStorage.getItem('accessToken')
    axios.get('/api/notification/unseen-notification',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        setUnseenNoti(res.data)
      })
  },[refresh])
  
  const handleDeleteNotifi=(event) => {
    let targetEle=event.target
    while(!targetEle.getAttribute("data-key")){
      targetEle=targetEle.parentElement
    }
    const idNotifi=targetEle.getAttribute("data-key");
    const token=localStorage.getItem('accessToken')
    var config = {
      method: 'delete',
      url: 'http://localhost:8080/api/notification/?notification-id='+idNotifi,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      setMessApi({mess:response.data,type:0})
      setOpenToast(true)
      setRefresh(!refresh)
    })
    .catch(function (error) {
      setMessApi({mess:error.response.data,type:1})
      setOpenToast(true)
    });
    
  }

  const handleClickOpen = (event) => {
    let targetEle=event.target
    while(!targetEle.getAttribute("data-key")){
      targetEle=targetEle.parentElement
    }
    const idNotifi=targetEle.getAttribute("data-key");
    const token=localStorage.getItem('accessToken')
    var config = {
      method: 'put',
      url: 'http://localhost:8080/api/notification/seen/?notification-id='+idNotifi,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      setDetailContent(response.data)
      setRefresh(!refresh)
    })
    .catch(function (error) {
      console.log(error);
    });
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

    return (
        <Fragment>
        <Navbar/>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1}} className={style.boxContainer}>
            <Typography gutterBottom variant="h6" component="span" color="#2980B9">
                THÔNG BÁO
            </Typography>
            <Typography gutterBottom variant="span" component="span" color="#d0d44a">
                (*có {unseenNoti} thông báo chưa xem)
            </Typography>
            <CssBaseline />
            <List >
              {listNotifi.map((notifi, index) => (
                <ListItem className={style.listNotifi}  
                key={notifi.notificationId} data-key={notifi.notificationId}
                style={{border:`1px solid ${notifi.status?'#0D20C5':'#FFF620'}`,marginBottom:'10px'}}>
                  <ListItem button onClick={handleClickOpen}>
                    <div className={style.verticalBar} style={{background: notifi.status?'#0D20C5':'#FFF620'}}></div>
                    <ListItemAvatar >
                      <ReportGmailerrorredIcon sx={{fontSize:35,color: notifi.status?blue[500]:yellow[500]}}/>
                    </ListItemAvatar>
                    <ListItemText primary={"PTIT-Elearning * fixing time"} secondary={notifi.notificationContent} />
                  </ListItem>
                  <IconButton
                  onClick={handleDeleteNotifi}
                  > 
                    <DeleteForeverIcon sx={{ color: red[500] }}/>
                  </IconButton>
                </ListItem>
              ))}
            </List>
            
          </Box>
          </Container>
          <AppToast content={messApi.mess} type={messApi.type} isOpen={openToast} callback={() => {
            setOpenToast(false);
          }}/>
          <Dialog
          open={openDetail}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thông báo từ hệ thống"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {detailContent}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
    )
}

export default Notification