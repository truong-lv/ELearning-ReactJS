import axios from 'axios'
import style from './CreditClass.module.scss'
import AppAvatar from '../../myTool/handleAvatar';
import { getOnlyDateISO } from '../../myTool/fomatDateTime'

import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle';



export default function PostRep({ id }) {
    const [postRep, setPostRep] = useState([])
    const [postIdFocus, setPostIdFocus] = useState(0)
    const [postContent, setPostContent] = useState('');

    const handleSendPostRep = (postID) => {
        setPostIdFocus(postID);
        callAPIAddComment();
    }

    const callAPIAddComment = () => {
        const token = localStorage.getItem('accessToken')
        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/post/comment',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ "content": postContent, "postId": postIdFocus })
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const hanlePostRepContent = (e) => {
        setPostContent(e.target.value)
    }

    useEffect(() => {

        const token = localStorage.getItem('accessToken')

        axios.get(`/api/post/all-comment?post-id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPostRep(response.data)
        }).catch(error => console.log(error))

    }, [id])

    return (
        <Typography component="div" className={style.postRepContainer}>
            <Typography component="div" >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 2.5, ml: 0.5, width: 32, height: 32, justifyContent: 'center' }} />
                    <TextField sx={{ width: '85%' }} id="input-with-sx" onChange={(e) => hanlePostRepContent(e)} label="Thêm nhận xét cho bài viết này" variant="standard" />
                    <Button varient='text' color="primary" endIcon={<SendIcon />} onClick={() => handleSendPostRep(id)}>
                        Gửi
                    </Button>
                </Box>
            </Typography>
            {postRep.map(value => {
                return (
                    <Typography sx={{ mt: 3.5 }} variant="div" component="div" key={value.commentId} className={style.dlFlex}>
                        <div className={style.styleAvatar}>
                            <AppAvatar url={value.avatar} imgSize={40} />
                        </div>
                        <div>
                            <Typography variant="div" component="div" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>{value.userName} - {value.code}</Typography>
                            <Typography component="div">{value.content}</Typography>
                        </div>
                        <Typography variant="div" component="div" className={style.postTime}>
                            {getOnlyDateISO(value.createdAt)}
                        </Typography>
                    </Typography>
                )
            })
            }
        </Typography>
    )
}