
import { Fragment } from 'react'
import { Typography } from '@mui/material'

import clsx from 'clsx'

import folder from '../../assets/image/folder.png'

import style from './CreditClass.module.scss'
export default function CreditClassFolder({ folders }) {
    return (
        <Fragment>
            {folders === undefined ? "" :
                <ul className={style.listFolder}>
                    {folders.map((value) => {
                        if (folders.indexOf(value) > 3) {
                            return ""
                        }
                        return (
                            <li className={clsx(style.listFolderItem, style.fwBold)} key={value.folderId}>
                                <img className={style.imgFolder} src={folder} alt='folder img' />
                                <span style={{ marginLeft: '20px' }}>{value.folderName}</span>
                            </li>
                        )
                    })}
                </ul>
            }
        </Fragment >
    )
}