
import style from './ExerciseInfo.module.scss'

import { Fragment } from 'react'

import clsx from 'clsx'

import Typography from '@mui/material/Typography'

export default function ExerciseContent({ exercise }) {

    const documents = exercise.documents;

    return (
        <Fragment>
            <Typography component="div" className={style.exerciseContainer}>
                <Typography component="div" > - {exercise.excerciseContent}</Typography>
                <Typography component="div">
                    {documents === undefined ? console.log('documents undefined') :
                        <ul className={clsx(style.listFolder, style.flex)}>
                            {documents.map((value) => {
                                return (
                                    <li className={clsx(style.listFolderItem, style.bold, style.absolute)} key={value.documentId}>{value.documentName}</li>
                                )
                            })}
                        </ul>
                    }
                </Typography>
            </Typography>
        </Fragment>
    )
}