
import { Fragment } from 'react'
import { Typography } from '@mui/material'

import style from './CreditClass.module.scss'

export default function CreditClassFolder({ folders }) {
    return (
        <Fragment>
            {folders === undefined ? console.log('folder undefined') :
                <ul className={style.listFolder}>
                    {folders.map((value) => {
                        return (
                            <li className={style.listFolderItem} key={value.folderId}>{value.folderName}</li>
                        )
                    })}
                </ul>
            }
        </Fragment>
    )
}