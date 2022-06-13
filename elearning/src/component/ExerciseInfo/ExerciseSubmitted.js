
import FomatDateTime from '../../myTool/fomatDateTime'
import style from './ExerciseInfo.module.scss'

import { Fragment } from 'react'

import clsx from 'clsx'
import axios from 'axios'
import { useEffect, useState } from 'react'

import jpg from '../../assets/image/jpg.png'
import doc from '../../assets/image/doc.png'
import xlsx from '../../assets/image/xlsx.png'
import pdf from '../../assets/image/pdf.png'
import ppxt from '../../assets/image/ppxt.png'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';

import { useParams } from 'react-router-dom';



export default function ExerciseSubmitted({ exercise, endTime }) {

    console.log(exercise);
    const { id } = useParams();
    const token = localStorage.getItem('accessToken')

    const folder = exercise.submitFile;
    const submit = exercise.submitTime;

    const submitDeadline = new Date(endTime);
    const toDay = new Date();

    const Input = styled('input')({
        display: 'none',
    });

    const handleImg = (imgtype) => {
        let value = "";
        imgtype === 'jpg' || imgtype === 'png' ? value = jpg :
            imgtype === 'xlsx' ? value = xlsx :
                imgtype === 'pdf' ? value = pdf :
                    imgtype === 'ppxt' ? value = ppxt : value = doc


        return value;
    }

    function submitExercise(file) {
        var data = new FormData();
        data.append('excerciseId', id);
        data.append('file', file);
        data.append('submitContent', 'Hello');

        var config = {
            method: 'post',
            url: axios.defaults.baseURL + '/api/submit/index',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onChange = (e) => {
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            submitExercise(files[0]);
        }
    }

    return (
        <Fragment>
            <Typography component="div" className={style.submitPadding}>
                <Typography component="div" className={style.flex}>
                    <Typography variant="div" component="div" className={style.bold}>Bài tập của bạn</Typography>
                    <Typography component="div">
                        <Typography variant="div" component="div"
                            className={clsx(style.bold, typeof submit === 'undefined' ? style.notSubmit : style.submitted)}>
                            {typeof submit === 'undefined' ? 'Chưa nộp' : 'Đã nộp'}
                        </Typography>
                        {typeof submit === 'undefined' ? "" :
                            <Typography component="div" className={style.submitTime}>
                                <FomatDateTime datetime={submit} />
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
                <label htmlFor="contained-button-file">
                    <Input accept="*/*" id="contained-button-file" multiple type="file" onChange={(e) => onChange(e)} />
                    <Button variant="contained" component="span" size="small"
                        disabled={submit !== undefined || toDay > submitDeadline}
                        color='success' style={{ fontWeight: "bold", padding: "3px 20px" }}
                        className={clsx(style.absolute, style.bold, style.btnSubmit)}>
                        {typeof submit !== 'undefined' ? 'Hủy nộp bài' : toDay > submitDeadline ? 'Hết hạn' : 'Nộp bài'}
                    </Button>
                </label>

            </Typography>
        </Fragment >
    )
}