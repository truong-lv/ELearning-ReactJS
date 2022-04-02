import Navbar from "../../component/Navbar/Nabar"
import CourseAvaiable from "../../component/CourseAvaiable/CourseAvaiable"

import * as React from 'react';
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete';

import axios from "axios"

import style from "./style.module.scss"



function ComboBox({ label, className, setValue }) {
    return (
        <Autocomplete
            className={className}
            disablePortal
            id="combo-box-demo"
            options={label === 'Năm học' ? schoolYear : label === 'Khoa' ? departmentSelect : semester}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, newValue) =>
                label === 'Năm học' ? setValue(newValue) : label === 'Khoa' ? setValue(newValue) : setValue(newValue)
            }
        />
    )
}


const schoolYear = [
    '2020',
    '2021',
    '2022',
    '2023'
]

const semester = [
    '1',
    '2',
    '3'
]

var departmentSelect;



function Course() {

    const colHeight = 'value'
    const [schoolYear, setSchoolYear] = useState('')
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [listCurrentCourses, setListCurrentCourses] = useState([])
    const [listCurrentDifferenceCourse, setlistCurrentDifferenceCourse] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get('/api/credit-class/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setListCurrentCourses(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get('/api/department/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            departmentSelect = response.data;
            console.log(departmentSelect);
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get(`/api/credit-class/get-credit-class?schoolyear=${schoolYear}&semester=${semester}&department_id=${department}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setlistCurrentDifferenceCourse(response.data)
        }).catch(error => console.log(error))
    }, [semester, schoolYear])

    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={6} lg={12} xs={12} direction="column" rowSpacing={2}>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                                    CÁC KHÓA HỌC HIỆN TẠI (? - ?)
                                    <Container style={{ border: '1px solid #000', padding: '20px 30px', marginTop: '20px' }}>
                                        <CourseAvaiable courses={listCurrentCourses} />
                                    </Container>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" component="div" color="red" fontWeight="bold">
                                    <Typography variant="div" display="flex">
                                        <p className={style.titleAnotherClasses}>CÁC KHÓA HỌC KHÁC</p>
                                        <Typography variant="div" display="flex" className={style.selectArea}>
                                            <p className={style.selectTitle}>Năm học</p>
                                            <ComboBox className={style.comboboxSelect} label="Năm học" setValue={setSchoolYear} />
                                            <p className={style.selectTitle}>Học kỳ</p>
                                            <ComboBox className={style.comboboxSelect} label="Học kỳ" setValue={setSemester} />
                                            <p className={style.selectTitle}>Khoa</p>
                                            <ComboBox className={style.comboboxSelect} label="Khoa" setValue={setDepartment} />
                                        </Typography>
                                    </Typography>
                                    <Container style={{ border: '1px solid #000', padding: '20px 30px', marginTop: '20px' }}>
                                        <CourseAvaiable courses={listCurrentDifferenceCourse} />
                                    </Container>

                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>

            </Container>
        </>
    )
}

export default Course