import {React, useState, useEffect, Fragment} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import AppAvatar from '../../myTool/handleAvatar';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

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
    const { id,name } = useParams();
    const [listPost,setListPost]=useState([]);
    const [listComment,setListComment]=useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    let newPost = '';
    const [openToast, setOpenToast] = useState(false);
    const [toastMess, setToastMess] = useState('');
    const [openDeleteForm, setOpenDeleteForm] = useState(false);

    const [postFocus,setPostFocus]=useState({
        postId:0,
        avartarPublisher:'',
        fullname:'',
        creditClassId:0,
        subjectName:'',
        postedTime:'',
        postContent:'',
        quantityComments:0
    });
    const [loadding, setLoadding] = useState(false)
    const handleCloseLoadding = () => {
        setLoadding(false);
      };
    const loadPosts=() => {
        const token=localStorage.getItem('accessToken')
        axios.get('api/credit-class/creditclass-list-post?creditclass_id='+id,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            
            setListPost(response.data)
        }).catch(error => console.log(error))
    }

    const loadComment=(postId) => {
        setLoadding(true);
        const token=localStorage.getItem('accessToken')
        axios.get('api/post/all-comment?post-id='+postId,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status===200){
                setListComment(response.data)
                setIsOpen(true)
            }
            setLoadding(false)
            
        }).catch(error => {
            setLoadding(false)
            console.log(error)
        })
    }

    useEffect(() => {
        loadPosts();
    },[])

    //HANDLE DIALOG POST COMMENT
    const handleClose= () => {
        setIsOpen(false)
    }
    const handleLoadComment=(post)=>{
        setPostFocus(post)
        loadComment(post.postId)
        
        
    }
    const handleSendComment = () => {
        const token=localStorage.getItem('accessToken')
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/post/comment',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({postId: postFocus.postId, content: newPost})
          };
          axios(config)
            .then(function (response) {
              if(response.status===200){
                loadComment(postFocus.postId);
                loadPosts();
                setOpenToast(true);
                setToastMess("Thêm bình luận thành công")
                
              }
            })
            .catch(function (error) {
              console.log(error);
              setOpenToast(true);
               setToastMess("Thêm bình luận thất bại")
            });
    }

    const handleDeleteComment=(idComment)=>{
        console.log(idComment);
        const token=localStorage.getItem('accessToken')
        var config = {
            method: 'delete',
            url: axios.defaults.baseURL + '/api/post/delete-comment?post-comment-id='+idComment,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          axios(config)
            .then(function (response) {
              if(response.status===200){
                loadComment(postFocus.postId);
                loadPosts();
                setOpenToast(true);
                setToastMess("Xóa bình luận thành công");
                
              }
            })
            .catch(function (error) {
              console.log(error);
              setOpenToast(true);
               setToastMess("Xóa bình luận thất bại")
            });
    }
    
    //HANDLE ADD/DELTE POST
    const handleAddPost=()=>{
        setIsOpenAdd(true)
        
    }

    const handleConfirmAddPost=()=>{
        const token=localStorage.getItem('accessToken')
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/post/create-new-post?credit-class-id='+id,
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({postContent: newPost})
          };
          axios(config)
            .then(function (response) {
              if(response.status===200){
                loadPosts();
                handleCloseAdd();
                setOpenToast(true);
                setToastMess("Thêm bài viết thành công")
              }
            })
            .catch(function (error) {
              console.log(error);
              setOpenToast(true);
               setToastMess("Thêm bài viết thất bại")
            });
    }
    const handleCloseAdd= () => {
        setIsOpenAdd(false)
    }

    const handleDeletePost=(post)=>{
        setPostFocus(post)
        setOpenDeleteForm(true);
    }
    const handleConfirmDelete = () => {
        const token=localStorage.getItem('accessToken')
        var config = {
            method: 'put',
            url: axios.defaults.baseURL + '/api/post/delete-post?post-id='+postFocus.postId,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          axios(config)
            .then(function (response) {
              if(response.status===200){
                loadPosts();
                handleCloseDeleteDialog();
                setOpenToast(true);
                setToastMess("Xóa bài viết thành công")
              }
            })
            .catch(function (error) {
              console.log(error);
              setOpenToast(true);
              setToastMess("Xóa bài viết thất bại")
            });
      };
    const handleCloseDeleteDialog=()=>{
        setOpenDeleteForm(false);
    }

  return (
    <div style={{ padding: 14 }}>
        <div style={{ display:'flex',justifyContent:'space-between'}}>
            <Typography variant='h6' component='div' color="#2980B9">Các bài đăng của lớp: {id} - {name}</Typography>
            <Button color="success" variant="contained"endIcon={<AddIcon />} onClick={()=>{handleAddPost()}}>
                Thêm bài đăng
            </Button>
        </div>
      {listPost.map((post) => (
      <Paper key={post.postId} hover="true" style={{ padding: "20px 10px", marginTop: 10 }} >
      
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <AppAvatar url={post.avartarPublisher} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h4 style={{ margin: 0, textAlign: "left", fontWeight: "bold"}}>{post.fullname}</h4>
                    <IconButton aria-label="delete" color='error' onClick={() =>{handleDeletePost(post)}}>
                        <DeleteIcon />
                    </IconButton>
                    </div>
                    <p style={{ textAlign: "left" }}>
                    {post.postContent}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    {post.postedTime.substring(0,post.postedTime.lastIndexOf(':'))}
                    </p>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
            
            <Button startIcon={<ArrowRightIcon/> } onClick={() =>handleLoadComment(post)}>
            {post.quantityComments} bình luận
                </Button>
      </Paper>
       ))}
        {/* =========================DIALOG POST DETAIL=============================== */}
        <Dialog open={isOpen} onClose={handleClose} 
            component="form"
            fullWidth
            maxWidth={'md'}
           
            noValidate
            autoComplete="off">
            <DialogTitle>Chi tiết bình luận</DialogTitle>
            <DialogContent>
                <Paper hover="true" style={{ padding: "10px 10px"}} >
        
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <AppAvatar url={postFocus.avartarPublisher }/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left", fontWeight: "bold"}}>{postFocus.fullname}</h4>
                            
                            <p style={{ textAlign: "left" }}>
                            {postFocus.postContent}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                            {postFocus.postedTime.substring(0,postFocus.postedTime.lastIndexOf(':'))}
                            </p>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="name"
                        label="Bình luận"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {newPost=event.target.value}}
                    />
                        <Button startIcon={<SendIcon/> } size="large" onClick={() => {handleSendComment()}}/>
                        </div>
                </Paper>
                {listComment.map((comment) => (
                <Paper  variant="outlined" key={comment.commentId} style={{padding: "10px 10px", marginTop: 5 }} >
                
                        <Grid container wrap="nowrap" spacing={1}>
                            <Grid item>
                                <AppAvatar url={comment.avatar} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        <strong>{comment.userName}</strong> 
                                        {" - " + comment.createdAt.substring(0,comment.createdAt.indexOf('T'))+" "
                                        +comment.createdAt.substring(comment.createdAt.indexOf(':')+1,comment.createdAt.lastIndexOf('.'))}
                                    </p>
                                    <IconButton aria-label="delete" color='error' 
                                            onClick={() =>handleDeleteComment(comment.commentId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                <p style={{ textAlign: "left" }}>
                                {comment.content}
                                </p>
                                
                            </Grid>
                        </Grid>
                       
                </Paper>
                ))}
            </DialogContent>
        </Dialog>

        {/* =========================DIALOG ADD POST=============================== */}
        <Dialog  fullWidth
            maxWidth={'sm'} open={isOpenAdd} onClose={handleCloseAdd}>
        <DialogTitle>Thêm bài post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hãy nhập nội dung bài post
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="name"
            label="Nội dung"
            type="text"
            onChange={(event) => {newPost=event.target.value}}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Hủy</Button>
          <Button onClick={handleConfirmAddPost}>Xác nhận</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG CONFIRM DELETE POST */}
        <Dialog
        open={openDeleteForm}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {"Thông báo từ hệ thống"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa bài đăng của {postFocus.fullname} không ?
            </DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={handleConfirmDelete}>Ok</Button>
        </DialogActions>

        </Dialog>

        {/* SHOW TOAST THÔNG BÁO KẾT QUẢ */}
        <AppToast content={toastMess} type={0} isOpen={openToast} callback={() => {
            setOpenToast(false);
            }}/>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadding}
            onClick={handleCloseLoadding}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  );
}