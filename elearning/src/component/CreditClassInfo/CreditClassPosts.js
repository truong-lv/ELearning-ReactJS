

import { Fragment } from 'react'

import { Typography, CardMedia } from '@mui/material'

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
                                    {/* <CardMedia src={"https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-1/271134495_3188855558021171_815459121846950008_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-5&_nc_sid=7206a8&_nc_ohc=R1-xD0FyPkcAX8X-ynu&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT_RS2GC0t0O9oM6enAEi_tOEy_Cwme5pUwZuemPvMXJUg&oe=623C00F8"}></CardMedia> */}
                                </Typography>
                            </Fragment>
                        )
                    })}
                </div>
            }
        </Fragment>
    )
}