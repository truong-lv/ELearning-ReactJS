import style from './CreditClass.module.scss'

import clsx from 'clsx'

import { Fragment } from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import { getOnlyDate } from '../../myTool/fomatDateTime'



export default function CreditClassInfo({ info }) {
    const array = [info]
    return (
        <Fragment>
            {array.map((value) => {
                if (value.teacherInfos !== undefined) {
                    return (
                        <ul className={style.listInfo} key={value}>
                            <li className={style.dlFlex}>
                                <Typography component="div" className={clsx(style.minWidthTitle, style.fwBold)}>GIẢNG VIÊN:</Typography>
                                {value.teacherInfos.map((info) => { return info.fullname })}
                            </li>
                            <li className={style.dlFlex}>
                                <Typography component="div" className={clsx(style.minWidthTitle, style.fwBold)}>EMAIL:</Typography>
                                {value.teacherInfos.map((info) => { return info.email })}
                            </li>
                            <li className={style.dlFlex}>
                                <Typography component="div" className={clsx(style.minWidthTitle, style.fwBold)}>SĐT:</Typography>
                                {value.teacherInfos.map((info) => { return info.phone })}
                            </li>
                            <li className={style.dlFlex}>
                                <Typography component="div" className={clsx(style.minWidthTitle, style.fwBold)}>KHOA:</Typography>
                                {value.departmentName}
                            </li>
                            <li className={style.dlFlex}>
                                <Typography component="div" className={clsx(style.minWidthTitle, style.fwBold)}>THỜI GIAN BẮT ĐẦU:</Typography>
                                {getOnlyDate(value.startTime)}
                            </li>
                            <li className={style.dlFlex}>
                                <Typography component="div" className={clsx(style.minWidthTitle, style.fwBold)}>THỜI GIAN KẾT THÚC:</Typography>
                                {getOnlyDate(value.endTime)}
                            </li>
                        </ul>
                    )
                }
            })}

        </Fragment>

    )
}