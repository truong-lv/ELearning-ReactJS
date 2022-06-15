

import Typography from '@mui/material/Typography'
import { Fragment } from 'react'

import exercise from '../../assets/image/exercise.png'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'

import { useNavigate } from 'react-router-dom'

import style from './style.module.scss'

export default function AssignItem({ listExercise }) {

    let navigate = useNavigate();

    return (
        <Fragment>
            <div style={{ minHeight: '500px' }}>
                <Typography component="div" className={style.foldersTitle}>
                    <Typography sx={{ ml: 12 }} component="div">Bài tập</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '500px' }}>
                        <Typography component="div">Ngày đăng</Typography>
                        <Typography sx={{ mr: 8 }} component="div" >Hạn nộp</Typography>
                    </div>
                </Typography>
                <div>
                    <ul >
                        {listExercise.map(value => {
                            return (
                                <li className={style.foldersItem} key={value.folderId} onClick={() => {
                                    navigate(`/exerciseDetail/exercise_id=${value.excerciseId}`, { state: value })
                                }}>
                                    <li className={style.folderName}>
                                        <img className={style.imgFolder} src={exercise} alt='folder img' />
                                        <div>{value.title}</div>
                                    </li>
                                    <li className={style.upTime}>{getOnlyDateISO(value.startTime)}</li>
                                    <li className={style.upTime}>{getOnlyDateISO(value.endTime)}</li>
                                </li>

                            )
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
