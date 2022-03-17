import style from '../../pages/Coures/style.module.scss'


import { Fragment } from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'


function Content(value) {
    console.log(value)
}

export default function CreditClassInfo({ info }) {
    const array = [info]
    console.log(array)
    return (
        <Fragment>
            <Typography>

            </Typography>

            {array.map((value) => {
                console.log(value)
                return (
                    <ul className={style.listInfo} key={value}>
                        {/* <li>GIẢNG VIÊN: {value.teacherInfos.map((ab) => { return ab.fullname })}</li>
                        <li>EMAIL: {value.teacherInfos.map((ab) => { return ab.email })}</li>
                        <li>SĐT: {value.teacherInfos.map((ab) => { return ab.phone })}</li> */}
                        <li>KHOA: {value.departmentName}</li>
                        <li>THỜI GIAN BẮT ĐẦU: {value.startTime}</li>
                        <li>THỜI GIAN KẾT THÚC: {value.endTime}</li>
                    </ul>
                )
            })}



        </Fragment>

    )
}