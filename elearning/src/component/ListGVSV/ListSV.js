
import clsx from 'clsx'

import { Fragment } from 'react'

import { useRef } from 'react'
import Typography from '@mui/material/Typography'

import style from './listSV.module.scss'

function Member({ value }) {
    const array = useRef([value])
    let svCount = useRef(0)
    let gvCount = useRef(0)
    return (
        <Typography component='div'>
            {array.current.map((value) => {
                if (value.teacherInfos === undefined || value.students === undefined) {
                }
                else {
                    gvCount = value.teacherInfos.length
                    svCount = value.students.length
                    return (
                        <Fragment key={value}>
                            <div className={style.headingContainer}>
                                <Typography variant='h6' component='div' className={style.headingRole}> GIẢNG VIÊN </Typography>
                                <Typography component='div' className={clsx(style.headingRole, style.grayText)}> {gvCount} giảng viên </Typography>
                            </div>

                            {value.teacherInfos.map((info) => {
                                return (
                                    <Typography key={value.teacherInfos.phones} className={style.listMember}>
                                        Avatar - {info.fullname}
                                    </Typography>
                                )
                            })}
                            <div className={style.headingContainer}>
                                <Typography variant='h6' component='div' className={style.headingRole}>SINH VIÊN</Typography>
                                <Typography component='div' className={clsx(style.headingRole, style.grayText)}> {svCount} sinh viên </Typography>
                            </div>
                            {value.students.map((info2) => {
                                return (
                                    <Typography key={value.students.studentCode} className={style.listMember}>
                                        Avatar - {info2.studentCode} - {info2.fullnanme}
                                    </Typography>
                                )
                            })}
                        </Fragment>
                    )
                }
            })}
        </Typography>
    )
}


export default function ListSV(listSV) {
    const list = [listSV.listSV]
    return (
        <div>
            {list.map((value) => {
                return <Member key={value} value={value} />
            })}
        </div>
    )

}
