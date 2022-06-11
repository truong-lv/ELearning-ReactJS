
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import stringAvatar from '../../myTool/handleAvatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';

import style from './CreditClass.module.scss'

import clsx from 'clsx'

import FomatDateTime from '../../myTool/fomatDateTime'

export default function PostRep({ id }) {

    console.log(id);

    const [postRep, setPostRep] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('accessToken')

        axios.get(`/api/post/all-comment?post-id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            setPostRep(response.data)
        }).catch(error => console.log(error))

    }, [id])


    return (
        <Typography component="div" className={style.postRepContainer}>
            <Typography component="div" >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 2.5, ml: 0.5, width: 32, height: 32, justifyContent: 'center' }} />
                    <TextField sx={{ width: '100%' }} id="input-with-sx" label="Thêm nhận xét cho bài viết này" variant="standard" />
                </Box>
            </Typography>
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
    )
}