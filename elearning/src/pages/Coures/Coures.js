import Navbar from "../../component/Navbar/Nabar"
import CourseAvaiable from "../../component/CourseAvaiable/CourseAvaiable";

import * as React from 'react';
import { useState, useEffect, Fragment } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from "axios"

import style from "./style.module.scss"

function Course() {

    const [schoolYear, setSchoolYear] = useState('')
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [listCurrentCourses, setListCurrentCourses] = useState([])
    const [listCurrentDifferenceCourse, setlistCurrentDifferenceCourse] = useState([])

    const [isSetYear, setIsSetYear] = useState(false);
    const [isSetDept, setIsSetDept] = useState(false);
    const [isSetSemester, setIsSetSemester] = useState(false);

    const [departmentSelect, setDepartmentSelect] = useState([]);

    function ComboBoxSchoolYear() {

        const handleChange = (event) => {
            setIsSetYear(true);
            setSchoolYear(event.target.value);
        };

        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Năm học</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Năm học"
                        value={schoolYear}
                        onChange={(e) => handleChange(e)}
                    >
                        <MenuItem value={"2020-2021"}>2020-2021</MenuItem>
                        <MenuItem value={"2021-2022"}>2021-2022</MenuItem>
                        <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
                        <MenuItem value={"2023-2024"}>2023-2024</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function ComboBoxSemester() {
        const handleChange = (event) => {
            setIsSetSemester(true);
            setSemester(event.target.value);
        };

        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Học kỳ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Học kỳ"
                        value={semester}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function ComboBoxDepartment({ departmentSelect }) {
        const handleChange = (event) => {
            setIsSetDept(true);
            setDepartment(event.target.value);
        };

        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Khoa"
                        value={department}
                        onChange={(e) => handleChange(e)}
                    >
                        {departmentSelect.map((value) => <MenuItem value={value.departmentId}>{value.departmentName}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        );
    }


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
            setDepartmentSelect(response.data);
        }).catch(error => console.log(error))
    }, [])


    const loadAnotherCourse = () => {
        const token = localStorage.getItem('accessToken');
        axios.get(`/api/credit-class/get-credit-class?schoolyear=${schoolYear}&semester=${semester}&department_id=${department}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setIsSetYear(false);
            setlistCurrentDifferenceCourse(response.data)
        }).catch(error => console.log(error))
    }

    if (isSetYear && isSetSemester && isSetDept) { loadAnotherCourse() }

    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item md={6} lg={12} xs={12} direction="column" rowSpacing={2}>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                                    CÁC KHÓA HỌC HIỆN TẠI
                                    <Container style={{ border: '1px solid #000', padding: '20px 30px', marginTop: '20px' }}>
                                        <CourseAvaiable courses={listCurrentCourses} fullWidth={true} />
                                    </Container>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" component="div" color="red" fontWeight="bold">
                                    <Typography variant="div" display="flex">
                                        <p className={style.titleAnotherClasses}>CÁC KHÓA HỌC KHÁC</p>
                                        <Typography variant="div" display="flex" className={style.selectArea}>
                                            <p className={style.selectTitle}>Năm học</p>
                                            <ComboBoxSchoolYear className={style.comboboxSelect} setValue={setSchoolYear} />
                                            <p className={style.selectTitle}>Học kỳ</p>
                                            <ComboBoxSemester className={style.comboboxSelect} />
                                            <p className={style.selectTitle}>Khoa</p>
                                            <ComboBoxDepartment className={style.comboboxSelect} departmentSelect={departmentSelect} />
                                        </Typography>
                                    </Typography>
                                    <Container style={{ border: '1px solid #000', padding: '20px 30px', marginTop: '20px' }}>
                                        <CourseAvaiable courses={listCurrentDifferenceCourse} fullWidth={true} />
                                    </Container>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>

            </Container>
        </Fragment>
    )
}

export default Course