
import style from './ExerciseInfo.module.scss'

import { Fragment } from 'react'

import clsx from 'clsx'
import axios from 'axios';

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

    const getFileToDownload = (doc) => {
        const token = localStorage.getItem('accessToken')
        axios.get('api/admin/document/dowload/' + doc.documentId, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = doc.documentName
            link.click()
        }).catch(error => console.log(error))
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
                                    <li onClick={() => getFileToDownload(value)}
                                        className={clsx(style.listFolderItem, style.bold, style.absolute, style.flex)} key={value.documentId}>
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