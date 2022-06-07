
import FomatDateTime from '../../myTool/fomatDateTime'
import style from './ExerciseInfo.module.scss'

import { Fragment } from 'react'

import clsx from 'clsx'

import jpg from '../../assets/image/jpg.png'
import doc from '../../assets/image/doc.png'
import xlsx from '../../assets/image/xlsx.png'
import pdf from '../../assets/image/pdf.png'
import ppxt from '../../assets/image/ppxt.png'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function ExerciseSubmitted({ exercise }) {

    const folder = exercise.submitFile;
    const summit = exercise.submitTime;

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
            <Typography component="div" className={style.submitPadding}>
                <Typography component="div" className={style.flex}>
                    <Typography variant="div" component="div" className={style.bold}>Bài tập của bạn</Typography>
                    <Typography component="div">
                        <Typography variant="div" component="div"
                            className={clsx(style.bold, typeof summit === 'undefined' ? style.notSubmit : style.submitted)}>
                            {typeof summit === 'undefined' ? 'Chưa nộp' : 'Đã nộp'}
                        </Typography>
                        {typeof summit === 'undefined' ? "" :
                            <Typography component="div" className={style.submitTime}>
                                <FomatDateTime datetime={summit} />
                            </Typography >}
                    </Typography>
                </Typography>
                <Fragment>

                    {folder === undefined ? "" :
                        <ul className={style.listFolder}>
                            <li className={clsx(style.listFolderItem, style.bold, style.flex)} key={folder.documentId}>
                                <img className={style.imgFileType} src={handleImg(folder.documentName.split('.')[1])} alt="file Type"></img>
                                {folder.documentName.split('.')[0]}
                            </li>
                        </ul>
                    }
                </Fragment>
                <Button variant="outlined" size="small" style={{ fontWeight: "bold", padding: "3px 20px", color: 'red' }} className={clsx(style.absolute, style.bold, style.btnSubmit)}>
                    {typeof summit === 'undefined' ? 'Nộp bài' : 'Hủy nộp bài'}
                </Button>
            </Typography>
        </Fragment>
    )
}