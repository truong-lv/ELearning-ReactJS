import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../../component/Navbar/Nabar"
import { Scheduler } from "@aldabil/react-scheduler";
import Container from '@mui/material/Container';
import { Button } from "@mui/material";
import CouresAvaiable from "../../component/CourseAvaiable/CourseAvaiable";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import './schedule.css'

function Schedule(){
  const lessonTime=["07:15", "08:00", "09:45", "10:30", "11:15","12:45","13:15", "14:00", "14:45","15:30","16:15","17:00"]
  const [listEvent, setListEvent] = useState([]);
  const [courseRegistered, setCourseRegistered]=useState([])

  function converIntLessonToTime(numLesson, day){
    return new Date(`${day.getFullYear()} ${day.getMonth()+1} ${day.getDate()} ${lessonTime[numLesson-1]}`)
  }

  function handleDateTime(datetime){
    return new Date(datetime.replace("-"," "));
  }

  useEffect(() => {
      const token=localStorage.getItem('accessToken')
      axios.get('/api/user/timetable',{
          headers: {
              'Authorization':`Bearer ${token}`
          }
      }).then((response) => {
          console.log(response.data)
          let list=response.data.reduce((pre,cur)=>{
            let dateOfWeek
            for(let i=handleDateTime(cur.startTime);i.getTime()<handleDateTime(cur.endTime).getTime();i.setDate(i.getDate()+7)){
              dateOfWeek=new Date(i);
              dateOfWeek.setDate(dateOfWeek.getDate()+cur.dayOfWeek-2)
              const event={
                event_id: cur.creditClass,
                title: cur.subjectName+'Phòng: '+cur.room,
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
    const token=localStorage.getItem('accessToken')
    axios.get('/api/user/registration',{
        headers: {
            'Authorization':`Bearer ${token}`
        }
    }).then((response) => {
        // console.log(response.data)
        setCourseRegistered(response.data)
        // setTimeout(()=>{setLoading(false)},1000);
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