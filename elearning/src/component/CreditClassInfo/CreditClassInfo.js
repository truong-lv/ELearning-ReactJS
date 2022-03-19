import style from './CreditClass.module.scss'


import { Fragment } from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'



export default function CreditClassInfo({ info }) {
    const array = [info]
    return (
        <Fragment>
            {array.map((value) => {
                if (value.teacherInfos !== undefined) {
                    return (
                        <ul className={style.listInfo} key={value}>
                            <li>GIẢNG VIÊN: {value.teacherInfos.map((info) => { return info.fullname })}</li>
                            <li>EMAIL: {value.teacherInfos.map((info) => { return info.email })}</li>
                            <li>SĐT: {value.teacherInfos.map((info) => { return info.phone })}</li>
                            <li>KHOA: {value.departmentName}</li>
                            <li>THỜI GIAN BẮT ĐẦU: {value.startTime}</li>
                            <li>THỜI GIAN KẾT THÚC: {value.endTime}</li>
                        </ul>
                    )
                }
            })}

        </Fragment>

    )
}