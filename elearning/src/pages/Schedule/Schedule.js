import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../../component/Navbar/Nabar"
import { Scheduler } from "@aldabil/react-scheduler";
import Container from '@mui/material/Container';
import { Button } from "@mui/material";
import CouresAvaiable from "../../component/CourseAvaiable/CourseAvaiable";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {TEACHER, USER} from '../../config'
import { useSelector } from 'react-redux'

import './schedule.css'

function Schedule(){
  const lessonTime=["07:15", "08:00", "09:45", "10:30", "11:15","12:45","13:15", "14:00", "14:45","15:30","16:15","17:00"]
  const [listEvent, setListEvent] = useState([]);
  const [courseRegistered, setCourseRegistered]=useState([])
  const userRoles = useSelector(state => state.infor.roles || [])
  const fields=[
    {
      name: "user_id",
      type: "select",
      // Should provide options with type:"select"
      options: [
        { id: 1, text: "John", value: 1 },
        { id: 2, text: "Mark", value: 2 }
      ],
      config: { label: "User", required: true, errMsg: "Plz Select User" }
    },
    {
      name: "Description",
      type: "input",
      default: "Default Value...",
      config: { label: "Details", multiline: true, rows: 4 }
    },
    {
      name: "anotherdate",
      type: "date",
      config: {
        label: "Other Date",
        md: 6,
        modalVariant: "dialog",
        type: "datetime"
      }
    }
  ];

                // const fields=[{name:"event_id"},
                // {name:"subject_name"},
                // {name:"room",default:"trống"},
                // {name:"start",default:"trống"},
                // {name:"end",default:"trống"}]
  function converIntLessonToTime(numLesson, day){
    return new Date(`${day.getFullYear()} ${day.getMonth()+1} ${day.getDate()} ${lessonTime[numLesson-1]}`)
  }

  function handleDateTime(datetime){
    return new Date(datetime.replace("-"," "));
  }

  useEffect(() => {
    let url='/api/user/timetable';
    if(userRoles.some(role => role === TEACHER)){
      url='/api/teacher/timetable'
    }

    const token=localStorage.getItem('accessToken')
    axios.get(url,{
        headers: {
            'Authorization':`Bearer ${token}`
        }
    }).then((response) => {
        // console.log(response.data)
        let list=response.data.reduce((pre,cur)=>{
          let dateOfWeek
          for(let i=handleDateTime(cur.startTime);i.getTime()<handleDateTime(cur.endTime).getTime();i.setDate(i.getDate()+7)){
            dateOfWeek=new Date(i);
            dateOfWeek.setDate(dateOfWeek.getDate()+cur.dayOfWeek-2)
            const event={
              event_id: cur.creditClass,
              title: cur.subjectName +' -'+cur.room,
              start: converIntLessonToTime(cur.startLesson,dateOfWeek),
              end: converIntLessonToTime(cur.endLesson,dateOfWeek)
            }
            pre.push(event)
          }
          return pre;
        },[])
        setListEvent(list)
      }).catch(error => console.log(error))
  },[])
  useEffect(() => {
    // setLoading(true)
    let url='/api/user/registration';
    if(userRoles.some(role => role === TEACHER)){
      url='/api/teacher/timetable-semester'
    }

    const token=localStorage.getItem('accessToken')
    axios.get(url,{
        headers: {
            'Authorization':`Bearer ${token}`
        }
    }).then((response) => {
        setCourseRegistered(response.data)
    }).catch(error => console.log(error))
  },[]) 
  
  return (
      <Fragment>
          <Navbar/>
          <Container maxWidth="lg" >
          <Grid container direction='column' rowSpacing={3}>
          <Grid item >
            <div className="schedule-component">
            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                THỜI KHÓA BIỂU
            </Typography>
            <Scheduler
            fields={fields}
            view="week"
            events={listEvent}
            selectedDate={new Date()}
            week={{weekDays: [2, 3, 4, 5,6,7,8], 
                weekStartOn: 6, 
                startHour: 7, 
                endHour: 17,
                step: 60,
                height:300,
                cellRenderer: ({ start, onClick }) => {
                    // Fake some condition up
                    return (
                      <Button
                        onClick={() => {
                            return 
                          onClick();
                        }}
                        // disabled={disabled}
                      ></Button>
                    );
            }}}
            
            />
            </div>
            </Grid>
            <Grid item >
                <div className="schedule-component">
                    <CouresAvaiable courses={courseRegistered}/>
                </div>
            </Grid>
            </Grid>
          </Container>
      </Fragment>
  )
}
export default Schedule