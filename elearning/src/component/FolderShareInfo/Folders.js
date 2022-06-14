import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import clsx from 'clsx';
import axios from 'axios';

import { Fragment, useRef } from 'react'


import style from './Folders.module.scss'
import folderImg from '../../assets/image/folder.png'

import { getOnlyDateISO } from '../../myTool/fomatDateTime'



export default function Folders({ folders, teacherName }) {

    return (
        <TableContainer component={Paper}>
            {console.log(folders)}
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className={style.tableHeader} />
                        <TableCell className={style.tableHeader} />
                        <TableCell className={clsx(style.tableHeader, style.bold)}>Tên</TableCell>
                        <TableCell className={clsx(style.tableHeader, style.bold)} align="center">Người Chỉnh Sửa</TableCell>
                        <TableCell className={clsx(style.tableHeader, style.bold)} align="center">Chỉnh sửa lần cuối</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {folders.map((folder) => (
                        <Row key={folder.folderId} folder={folder} teacherName={teacherName} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function Row(props) {
    const { folder, teacherName } = props;
    const [open, setOpen] = React.useState(false);

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
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <img className={style.imgFolder} src={folderImg} alt='folder img' />
                </TableCell>
                <TableCell>{folder.folderName}</TableCell>
                <TableCell align="center">{teacherName}</TableCell>
                <TableCell align="center">{getOnlyDateISO(folder.upTime)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tài liệu
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Tên tài liệu</TableCell>
                                        <TableCell align="right">Ngày tạo</TableCell>
                                        <TableCell align="right">
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {folder.documents.map((document) => (
                                        <TableRow key={document.documentId}>
                                            <TableCell component="th" scope="row">
                                                <IconButton aria-label="delete" size="large" color='error' >
                                                    <ArticleIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell >{document.documentName}</TableCell>
                                            <TableCell align="right">
                                                {document.createAt.substring(0, document.createAt.indexOf('T')) + " "
                                                    + document.createAt.substring(document.createAt.indexOf(':') + 1, document.createAt.lastIndexOf('.'))}
                                            </TableCell>
                                            <TableCell align="right">
                                                {console.log(document)}
                                                <IconButton aria-label="download" size="large" color='success' onClick={() => { getFileToDownload(document) }} >
                                                    <DownloadIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
