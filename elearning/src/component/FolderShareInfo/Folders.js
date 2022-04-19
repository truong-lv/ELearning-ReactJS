

import Typography from '@mui/material/Typography'
import { Fragment } from 'react'


import style from './Folders.module.scss'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'

export default function Folders({ folders }) {
    console.log(folders)
    return (
        <Fragment>
            <Typography component="div" className={style.foldersTitle}>
                <Typography sx={{ ml: 12 }} component="div">Tên</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '500px' }}>
                    <Typography component="div">Người Chỉnh Sửa</Typography>
                    <Typography sx={{ mr: 3 }} component="div" >Chỉnh sửa lần cuối</Typography>
                </div>
            </Typography>
            <div>
                {folders.map(value => {
                    return (
                        <ul className={style.foldersItem}>
                            <li className={style.folderName}>Avatar?? - {value.folderName}</li>
                            <li className={style.teacherName}>TeacherName?</li>
                            <li className={style.upTime}>{getOnlyDateISO(value.upTime)}</li>
                        </ul>
                    )
                })}
            </div>
        </Fragment>
    )
}
