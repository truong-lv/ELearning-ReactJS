
import { Fragment } from 'react'
import { Typography } from '@mui/material'

import clsx from 'clsx'

import style from './CreditClass.module.scss'

export default function CreditClassFolder({ folders }) {
    console.log(folders);
    return (
        <Fragment>
            {folders === undefined ? console.log('folder undefined') :
                <ul className={style.listFolder}>
                    {folders.map((value) => {
                        return (
                            <li className={clsx(style.listFolderItem, style.fwBold)} key={value.folderId}>{value.folderName}</li>
                        )
                    })}
                </ul>
            }
        </Fragment>
    )
}