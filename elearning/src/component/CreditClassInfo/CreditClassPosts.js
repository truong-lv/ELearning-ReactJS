import axios from "axios"
import PostRep from './PostRep'
import { Fragment, useEffect, useState } from 'react'
import style from './CreditClass.module.scss'
import stringAvatar from '../../myTool/handleAvatar';
import FomatDateTime from '../../myTool/fomatDateTime'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography, CardMedia } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function CreditClassPosts({ posts }) {

    const [postID, setPostID] = useState(0);
    const [postRep, setPostRep] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('accessToken')

        axios.get(`/api/post/all-comment?post-id=${postID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            setPostRep(response.data)
        }).catch(error => console.log(error))

    }, [postID])

    return (
        <Fragment>
            {posts === undefined ? "" :
                <div style={{ paddingRight: 16 }}>
                    <Fragment>
                        {posts.length === 0 ? <div className={style.noPostToDisPlay}>Không có post nào để hiển thị</div> :
                            posts.map((value) => {
                                return (
                                    <Typography sx={{ mt: 3 }} component="div" key={value.postId} className={style.postContainer}>
                                        < Typography variant="div" component="div" className={style.pd20} >
                                            <Typography variant="div" component="div" className={style.dlFlex}>
                                                <div className={style.userAvatar}>
                                                    {/* <Avatar {...stringAvatar(value.fullname)} /> */}
                                                    {/* <Avatar show={stringAvatar(value.fullname).show} onHide={stringAvatar(value.fullname).onHide} /> */}
                                                </div>
                                                <Typography variant="div" component="div" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>{value.fullname}</Typography>
                                                <Typography variant="div" component="div" className={style.postTime}>
                                                    <FomatDateTime datetime={value.postedTime} />
                                                </Typography>
                                            </Typography>
                                            <Typography sx={{ pt: 3 }} component={'span'} className={style.postContent}>{value.postContent}</Typography>
                                        </Typography>
                                        {/* {console.log('chay toi day 1')} */}
                                        {/* <PostRep id={value.postId}></PostRep> */}
                                        {/* {console.log('chay toi day 2')} */}
                                        <Typography component="div" className={style.postRepContainer}>
                                            <Typography component="div" >
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                                                    <AccountCircle sx={{ color: 'action.active', mr: 2.5, ml: 0.5, width: 32, height: 32, justifyContent: 'center' }} />
                                                    <TextField sx={{ width: '100%' }} id="input-with-sx" label="Thêm nhận xét cho bài viết này" variant="standard" />
                                                </Box>
                                            </Typography>
                                            {/* {setPostID(value.postId)} */}
                                            {/* {postRep.map(value => {
                                                return (
                                                    <Typography sx={{ mt: 3.5 }} variant="div" component="div" key={value.commentId} className={style.dlFlex}>
                                                        <div className={style.userAvatar}>
                                                            <Avatar {...stringAvatar(value.userName)} />
                                                        </div>
                                                        <div>
                                                            <Typography variant="div" component="div" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>{value.userName} - {value.code}</Typography>
                                                            <Typography component="div">{value.content}</Typography>
                                                        </div>
                                                        <Typography variant="div" component="div" className={style.postTime}>
                                                            {value.createdAt}
                                                        </Typography>
                                                    </Typography>
                                                )
                                            })
                                            } */}
                                        </Typography>
                                    </Typography>
                                )
                            })
                        }
                    </Fragment>
                </div>
            }
        </Fragment >
    )
}