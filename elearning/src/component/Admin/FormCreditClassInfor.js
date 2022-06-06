import {useState,useEffect, Fragment} from 'react';
import axios from 'axios'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import AppToast from '../../myTool/AppToast'

// const today=new Date().getFullYear()+ '-'+((new Date()).getMonth()).padStart(2, '0') + '-' + new Date().getDate().padStart(2, '0')
//===============UPDATE(ADD/UPDATE) CREDIT_CLASS FORM================
//isOpen: open status; type: 0-INSERT, 1-UPDATE
export default function FormDialog({isOpen,type, handleClose, creditClass, timeline}){
  
  const token=localStorage.getItem('accessToken')

  const [listTeacher, setListTeacher] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const listLesson=[1,2,3,4,5,6,7,8,9,10]
// console.log(today)
  const [startTime, setStartTime] = useState(creditClass.startTime);
  const [endTime, setEndTime] = useState(creditClass.endTime);
  const [schoolYear, setSchoolYear] = useState(creditClass.schoolYear);
  const [joinedPassword, setJoinedPassword] = useState(creditClass.joinedPassword);
  const [departmentId, setDepartmentId] = useState(creditClass.departmentId);
  const [subjectId, setSubjectId] = useState(creditClass.subjectId);
  const [teacherSelects, setTeacherSelects] = useState(creditClass.teacherId);

  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startLesson, setStartLesson] = useState(0);
  const [endLesson, setEndLesson] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    useEffect(() => {
          axios.get('api/subject/all',{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then((response) => {
              
            setListSubject(response.data)
          }).catch(error => console.log(error))
    },[])


    useEffect(() => {
          axios.get('api/teacher/all',{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then((response) => {
              
            setListTeacher(response.data)
          }).catch(error => console.log(error))
    },[])

    useEffect(() => {
          axios.get('api/department/all',{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then((response) => {
              
            setListDepartment(response.data)
          }).catch(error => console.log(error))
    },[])

    useEffect(() => {
          axios.get('api/room/get-all',{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }).then((response) => {
              
            setListRoom(response.data)
          }).catch(error => console.log(error))
    },[])

    function getStyles(name, teacherSelects, theme) {
      return {
        fontWeight:
          teacherSelects.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    const listSchoolYear=[];
    (function generateSchoolYear(){
      for(let i=0;i<=2;i++){
        listSchoolYear.push((new Date().getFullYear()+i)+"-"+(new Date().getFullYear()+i+1))
      }
    })()

    const theme = useTheme();
    const handleChangeTeacher = (event) => {
      const { target: { value }, } = event;
      setTeacherSelects(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      creditClass.teacherId=event.target.value 
    };


    const setTimeline=(id)=>{
      timeline.creditClassId=id
      console.log(JSON.stringify(timeline))
      var config = {
        method: 'post',
        url: axios.defaults.baseURL + '/api/timeline/create-new',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(timeline)
      };

      axios(config)
        .then(function (response) {
          if(response.status===200){
            setOpenToast(true)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const handleConfirm = (event) => {
      
      var config = {
        method: 'post',
        url: axios.defaults.baseURL + '/api/admin/creditclass/create-new-class',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(creditClass)
      };

      if(timeline.creditClassId===0){
        console.log(JSON.stringify(creditClass))
        
        axios(config)
          .then(function (response) {
            console.log(response.status);
            if(response.status===200){
              setTimeline(response.data.creditClassId)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      handleClose();
    };


      return (
        <Fragment>
        <Dialog open={isOpen} onClose={handleClose} 
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '50ch' },
        }}
        noValidate
        autoComplete="off">
          <DialogTitle>Thêm lớp tín chỉ</DialogTitle>
          <DialogContent>
          <div style={{display: 'flex',alignItems: 'center'}}>
            {/* ====================================MÔN HỌC======================================= */}
            <FormControl sx={{width: '50%',margin:'16px'}}>
            <InputLabel id="demo-simple-select-label">Môn học</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subjectId}
              label="Môn học"
              onChange={(event) => {setSubjectId(event.target.value); creditClass.subjectId=event.target.value}}
              >
                {listSubject.map((subject) => (
                <MenuItem
                  key={subject.subjectId}
                  value={subject.subjectId}
                >{subject.subjectName}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            {/* ====================================KHOA======================================= */}
        <FormControl sx={{width: '50%',margin:'16px'}}>
        <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={departmentId}
              label="Khoa"
              onChange={(event) => {setDepartmentId(event.target.value); creditClass.departmentId=event.target.value }}
              >
                {listDepartment.map((department) => (
                <MenuItem
                  key={department.departmentId}
                  value={department.departmentId}
                >{department.departmentName}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            
        </div>

        <div style={{display: 'flex'}}>
          {/* ====================================GIẢNG VIÊN======================================= */}
          <FormControl sx={{ m: 1, width: '100%' ,margin:'16px'}}>
            <InputLabel id="demo-multiple-name-label">Giảng viên</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={teacherSelects}
              onChange={handleChangeTeacher}
              input={<OutlinedInput label="Giảng viên" />}
              MenuProps={MenuProps}
            >
              {listTeacher.map((teacher) => (
                <MenuItem
                  key={teacher.teacherId}
                  value={teacher.teacherId}
                  style={getStyles(teacher.fullname, teacherSelects, theme)}
                >
                  {teacher.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

            
         
        </div>
        <div style={{display: 'flex'}}>
                {/* ====================================NĂM HỌC======================================= */}
            <FormControl sx={{ m: 1, width: '50%' ,margin:'16px'}}>
            <InputLabel id="demo-multiple-name-label">Năm học</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={schoolYear}
              onChange={(event) => {setSchoolYear(event.target.value); creditClass.schoolYear=event.target.value }}
              input={<OutlinedInput label="Năm học" />}
              MenuProps={MenuProps}
            >
              {listSchoolYear.map((year) => (
                <MenuItem
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* ====================================MÃ MỜI======================================= */}
          <TextField
            error={false}
            onChange={(event) => {setJoinedPassword(event.target.value); creditClass.joinedPassword=event.target.value }}
            id="outlined-basic"
            label="Mã mời"
            
          />
        </div>
        <div style={{display: 'flex'}}>
          {/* ====================================TGIAN BẮT ĐẦU======================================= */}
          <TextField
            // InputProps={{inputProps: { min: today}}}
            type="date"
            error={false}
            onChange={(event) => {setStartTime(event.target.value); creditClass.startTime=event.target.value+" 00:00:00"}}
            id="outlined-basic"
            label="Thời gian bắt đầu"
            focused={true}
          />
          {/* ====================================TGIAN KẾT THÚC======================================= */}
          <TextField
            InputProps={{inputProps: { min: startTime} }}
            type="date"
            error={false}
            
            onChange={(event) => {setEndTime(event.target.value); creditClass.endTime=event.target.value+" 00:00:00"}}
            id="outlined-basic"
            label="Thời gian kết thúc"
            focused={true}
            
          />
        </div>
        {/* ====================================LỊCH HỌC======================================= */}
        <Typography variant="p" component="p" color="#000000" sx={{margin: "0 0 0 15px"}}>
              Lịch học
          </Typography>
        <div style={{display: 'flex'}}>
          {/* ===============Ngày trong tuần==================== */}

          <FormControl sx={{ m: 1, width: '25%' ,margin:'16px'}}>
            <InputLabel id="demo-multiple-name-label">Ngày trong tuần</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={dayOfWeek}
              onChange={(event) => {setDayOfWeek(event.target.value); timeline.dayOfWeek=event.target.value}}
              input={<OutlinedInput label="Ngày trong tuần" />}
              MenuProps={MenuProps}
            >
                <MenuItem  value={2} > 2 </MenuItem>
                <MenuItem  value={3} > 3 </MenuItem>
                <MenuItem  value={4} > 4 </MenuItem>
                <MenuItem  value={5} > 5 </MenuItem>
                <MenuItem  value={6} > 6 </MenuItem>
                <MenuItem  value={7} > 7 </MenuItem>
            </Select>
          </FormControl>

          {/* ===============Tiết bắt đầu==================== */}
          <FormControl sx={{ m: 1, width: '25%' ,margin:'16px'}}>
            <InputLabel id="demo-multiple-name-label">Tiết bắt đầu</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={startLesson}
              onChange={(event) => {setStartLesson(event.target.value); timeline.startLesson=event.target.value}}
              input={<OutlinedInput label="Tiết bắt đầu" />}
              MenuProps={MenuProps}
            >
              {listLesson.map((lesson) => (
                <MenuItem
                  key={lesson}
                  value={lesson}
                >
                  {lesson}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* ===============Tiết kết thúc==================== */}
          <FormControl sx={{ m: 1, width: '25%' ,margin:'16px'}}>
            <InputLabel id="demo-multiple-name-label">Tiết kết thúc</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={endLesson}
              onChange={(event) => {setEndLesson(event.target.value); timeline.endLesson=event.target.value}}
              input={<OutlinedInput label="Tiết kết thúc" />}
              MenuProps={MenuProps}
            >
              {listLesson.filter(l=>l>startLesson).map((lesson) => (
                <MenuItem
                  key={lesson}
                  value={lesson}
                >
                  {lesson}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* ===============Phòng học==================== */}
          <FormControl sx={{ m: 1, width: '25%' ,margin:'16px'}}>
            <InputLabel id="demo-multiple-name-label">Phòng học</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={roomId}
              onChange={(event) => {setRoomId(event.target.value) ; timeline.roomId=event.target.value}}
              input={<OutlinedInput label="Phòng học" />}
              MenuProps={MenuProps}
            >
              {listRoom.map((room) => (
                <MenuItem
                  key={room.roomId}
                  value={room.roomId}
                >
                  {room.roomName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
          
        </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={handleConfirm}>Xác nhận</Button>
            </DialogActions>
            
          </Dialog>
          <AppToast content={"Thêm lớp thành công"} type={0} isOpen={openToast} callback={() => {
            setOpenToast(false);
          }}/>
          </Fragment>
      );
    }