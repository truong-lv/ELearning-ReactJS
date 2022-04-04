
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import stringAvatar from '../../myTool/handleAvatar';

import style from './CreditClass.module.scss'

import FomatDateTime from '../../myTool/fomatDateTime'

export default function PostRep(id) {


    const [postRep, setPostRep] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('accessToken')

        axios.get(`/api/post/all-comment?post-id=${id.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            setPostRep(response.data)
        }).catch(error => console.log(error))

    }, [id])


    return (
        <Typography component="div" className={style.postRepContainer}>
            {postRep.map(value => {
                return (
                    <Typography variant="div" component="div" key={value.commentId} className={style.dlFlex}>
                        <div className={style.userAvatar}>
                            <Avatar {...stringAvatar(value.userName)} />
                        </div>
                        <div>
                            <Typography variant="div" component="div" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>{value.userName} - {value.code}</Typography>
                            <Typography component="div">{value.content}</Typography>
                        </div>
                        <Typography variant="div" component="div" className={style.postTime}>
                            {value.createdAt}
                        </Typography>
                    </Typography>
                )
            })
            }
        </Typography>
    )
}