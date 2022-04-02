
import FomatDateTime from '../../myTool/fomatDateTime'
import style from './ExerciseInfo.module.scss'

import { Fragment } from 'react'

import clsx from 'clsx'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function ExerciseSubmitted({ exercise }) {

    const folder = exercise.submitFile;

    return (
        <Fragment>
            <Typography component="div" className={style.submitPadding}>
                <Typography component="div" className={style.flex}>
                    <Typography variant="div" component="div" className={style.bold}>Bài tập của bạn</Typography>
                    <Typography component="div">
                        <Typography variant="div" component="div" className={clsx(style.bold, style.submitted)}>Đã nộp</Typography>
                        {typeof exercise.submitTime === 'undefined' ? console.log('Time undefined') :
                            <Typography component="div" className={style.submitTime}>
                                <FomatDateTime datetime={exercise.submitTime} />
                            </Typography >}
                    </Typography>
                </Typography>
                <Fragment>
                    {console.log(folder)}
                    {folder === undefined ? console.log('submit document undefined') :
                        <ul className={style.listFolder}>
                            <li className={clsx(style.listFolderItem, style.bold)} key={folder.documentId}>{folder.documentName}</li>
                        </ul>
                    }
                </Fragment>
                <Button variant="outlined" size="small" style={{ fontWeight: "bold", padding: "3px 20px", color: 'red' }} className={clsx(style.absolute, style.bold, style.btnSubmit)}>Hủy nộp bài</Button>
            </Typography>
        </Fragment>
    )
}