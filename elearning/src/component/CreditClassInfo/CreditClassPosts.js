

import { Fragment } from 'react'

import { Typography, CardMedia } from '@mui/material'
import Avatar from '@mui/material/Avatar';

import style from './CreditClass.module.scss'

import FomatDateTime from '../../myTool/fomatDateTime'

import stringAvatar from '../../myTool/handleAvatar';

import axios from "axios"

import PostRep from './PostRep'

export default function CreditClassPosts({ posts }) {
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
                                        <PostRep id={value.postId}></PostRep>
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