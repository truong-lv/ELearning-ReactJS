
import clsx from 'clsx'

import { Fragment } from 'react'

import { Typography } from '@mui/material'

import style from './CreditClass.module.scss'


export default function CreditClassPosts({ posts }) {
    console.log(posts)
    return (
        <Fragment>
            {posts === undefined ? console.log('Post undefined') :
                <div>
                    {posts.map((value) => {
                        return (
                            <Fragment>
                                <Typography variant="div" component="div" className={style.postContainer}>
                                    <Typography variant="div" component="div" className={style.dlFlex}>
                                        <div className={style.userAvatar}>{value.avartarPublisher}</div>  {/* Thay bang the img va doi src = avatarpubliser */}
                                        <Typography variant="div" component="div">{value.fullname}</Typography>
                                        <Typography variant="div" component="div" className={style.postTime}>{value.postedTime}</Typography>
                                    </Typography>
                                    <p className={style.postContent}>{value.postContent}</p>
                                </Typography>
                            </Fragment>
                        )
                    })}
                </div>
            }
        </Fragment>
    )
}