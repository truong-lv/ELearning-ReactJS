
import style from './ExerciseInfo.module.scss'

import { Fragment } from 'react'

import clsx from 'clsx'

import jpg from '../../assets/image/jpg.png'
import doc from '../../assets/image/doc.png'
import xlsx from '../../assets/image/xlsx.png'
import pdf from '../../assets/image/pdf.png'
import ppxt from '../../assets/image/ppxt.png'
import Typography from '@mui/material/Typography'

export default function ExerciseContent({ exercise }) {

    const documents = exercise.documents;

    const handleImg = (imgtype) => {
        let value = "";
        imgtype === 'jpg' ? value = jpg :
            imgtype === 'xlsx' ? value = xlsx :
                imgtype === 'pdf' ? value = pdf :
                    imgtype === 'ppxt' ? value = ppxt : value = doc


        return value;
    }

    return (
        <Fragment>
            <Typography component="div" className={style.exerciseContainer}>
                <Typography component="div" > - {exercise.excerciseContent}</Typography>
                <Typography component="div">
                    {documents === undefined ? "" :
                        <ul className={clsx(style.listFolder, style.flex)}>
                            {documents.map((value) => {
                                const name = value.documentName.split('.')[0];
                                const type = value.documentName.split('.')[1];
                                return (
                                    <li className={clsx(style.listFolderItem, style.bold, style.absolute, style.flex)} key={value.documentId}>
                                        <img className={style.imgFileType} src={handleImg(type)} alt="file Type"></img>
                                        <div className={style.content}>{name}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </Typography>
            </Typography>
        </Fragment >
    )
}