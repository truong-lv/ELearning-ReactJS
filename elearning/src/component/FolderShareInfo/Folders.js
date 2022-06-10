

import Typography from '@mui/material/Typography'
import { Fragment } from 'react'


import style from './Folders.module.scss'
import folder from '../../assets/image/folder.png'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'

export default function Folders({ folders, teacherName }) {
    return (
        <Fragment>
            <div style={{ minHeight: '500px' }}>
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
                            <ul className={style.foldersItem} key={value.folderId}>
                                <li className={style.folderName}>
                                    <img className={style.imgFolder} src={folder} alt='folder img' />
                                    <div>{value.folderName}</div>
                                </li>
                                <li className={style.teacherName}>{teacherName}</li>
                                <li className={style.upTime}>{getOnlyDateISO(value.upTime)}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}
