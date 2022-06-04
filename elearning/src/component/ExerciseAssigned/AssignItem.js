

import Typography from '@mui/material/Typography'
import { Fragment } from 'react'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'

export default function AssignItem() {
    return (
        <Fragment>
            <Typography component="div">
                <Typography sx={{ ml: 12 }} component="div">Bài tập</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '500px' }}>
                    <Typography component="div">Ngày đăng</Typography>
                    <Typography sx={{ mr: 3 }} component="div" >Hạn nộp</Typography>
                </div>
            </Typography>
            <div>
                {/* {folders.map(value => {
                    return (
                        <ul className={style.foldersItem}>
                            <li className={style.folderName}>Avatar?? - {value.folderName}</li>
                            <li className={style.teacherName}>TeacherName?</li>
                            <li className={style.upTime}>{getOnlyDateISO(value.upTime)}</li>
                        </ul>
                    )
                })} */}
            </div>
        </Fragment>
    )
}
