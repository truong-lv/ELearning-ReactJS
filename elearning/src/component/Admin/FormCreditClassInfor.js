import {useState,useEffect, Fragment} from 'react';
import axios from 'axios'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
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
export default function FormDialog({isOpen, handleClose, creditClass, timeline,timelineId}){
  
  const token=localStorage.getItem('accessToken')

  const [listTeacher, setListTeacher] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const listLesson=[1,2,3,4,5,6,7,8,9,10]
  const [checkJoinedPasswordChange, setCheckJoinedPasswordChange] = useState(false);
  const [checkTimelineChange, setCheckTimelineChange] = useState(false);

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
  const [toastMess, setToastMess] = useState("");
  const [checkValid, setCheckValid] = useState({
    startTime:false,
    endTime:false,
    schoolYear:false,
    joinedPassword:false,
    departmentId:false,
    subjectId:false,
    teacherSelects:false,

    dayOfWeek:false,
    startLesson:false,
    endLesson:false,
    roomId:false
  });
  
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

    useEffect(()=>{
      setStartTime(creditClass.startTime.split(" ")[0])
      setEndTime(creditClass.endTime.split(" ")[0])
      setSchoolYear(creditClass.schoolYear)
      setJoinedPassword("")
      setDepartmentId(creditClass.departmentId)
      setSubjectId(creditClass.subjectId)
      setTeacherSelects(creditClass.teacherId)

      setDayOfWeek(timeline.dayOfWeek)
      setStartLesson(timeline.startLesson)
      setEndLesson(timeline.endLesson)
      setRoomId(timeline.roomId)
    },[creditClass, timeline])

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

    const validateInput = () => {
      //startTime===""?setCheckValid(checkValid.startTime=true):setCheckValid(checkValid.startTime=false)
      //endTime===""?setCheckValid(checkValid.endTime=true):setCheckValid(checkValid.endTime=false)
      //schoolYear===""?setCheckValid(checkValid.schoolYear=true):setCheckValid(checkValid.schoolYear=false)
      //joinedPassword===""?setCheckValid(checkValid.joinedPassword=true):setCheckValid(checkValid.joinedPassword=false)
      //departmentId===""?setCheckValid(checkValid.departmentId=true):setCheckValid(checkValid.departmentId=false)
      //subjectId===""?setCheckValid(checkValid.subjectId=true):setCheckValid(checkValid.subjectId=false)
      //teacherSelects===""?setCheckValid(checkValid.teacherSelects=true):setCheckValid(checkValid.teacherSelects=false)
  
      //dayOfWeek===""?setCheckValid(checkValid.dayOfWeek=true):setCheckValid(checkValid.dayOfWeek=false)
      //startLesson===""?setCheckValid(checkValid.startLesson=true):setCheckValid(checkValid.startLesson=false)
      //endLesson===""?setCheckValid(checkValid.endLesson=true):setCheckValid(checkValid.endLesson=false)
      //roomId===""?setCheckValid(checkValid.roomId=true):setCheckValid(checkValid.roomId=false)
    }

    const setTimeline=(id)=>{
      timeline.creditClassId=id
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
            setToastMess("Thêm lớp tín chỉ thành công")
            setOpenToast(true)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const updateTimeline=()=>{
      var config = {
        method: 'put',
        url: axios.defaults.baseURL + '/api/timeline/update',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({timelineId:timelineId, timelineDTORequest:timeline})
      };
      
      axios(config)
        .then(function (response) {
          if(response.status===200){
            
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const handleConfirm = (event) => {
      validateInput();
      for(let item in checkValid){
        if(checkValid[item]){
          return
        }
      }
      

      if(timeline.creditClassId===0){
        let config = {
          method: 'post',
          url: axios.defaults.baseURL + '/api/admin/creditclass/create-new-class',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : JSON.stringify(creditClass)
        };
        
        axios(config)
          .then(function (response) {
            if(response.status===200){
              setTimeline(response.data.creditClassId)
              handleClose();
              setCheckTimelineChange(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      }else{
        let config = {
          method: 'put',
          url: axios.defaults.baseURL + '/api/admin/creditclass/update-credit-class?credit-class-id='+timeline.creditClassId,
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data : JSON.stringify(creditClass)
        };
        console.log(JSON.stringify(creditClass))
        axios(config)
          .then(function (response) {
            console.log(response.status);
            if(response.status===200){
              setToastMess("Sửa thông tin lớp tín chỉ thành công")
              setOpenToast(true)
              if(checkTimelineChange===true){
                updateTimeline()
                
              }
              handleClose();
              setCheckTimelineChange(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
       
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
              required
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
            error={checkValid.joinedPassword}
            helperText={checkValid.joinedPassword?"Không được để trống.":""}
            value={joinedPassword}
            onChange={(event) => {setJoinedPassword(event.target.value);
                                  setCheckJoinedPasswordChange(true); 
                                  creditClass.joinedPassword=event.target.value }}
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
            value={startTime}
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
            value={endTime}
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
              onChange={(event) => {setDayOfWeek(event.target.value);
                                    setCheckTimelineChange(true); 
                                    timeline.dayOfWeek=event.target.value}}
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
              onChange={(event) => {setStartLesson(event.target.value); 
                                    setCheckTimelineChange(true); 
                                    timeline.startLesson=event.target.value}}
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
              onChange={(event) => {setEndLesson(event.target.value); 
                                    setCheckTimelineChange(true); 
                                    timeline.endLesson=event.target.value}}
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
              onChange={(event) => {setRoomId(event.target.value) ;
                                    setCheckTimelineChange(true);  
                                    timeline.roomId=event.target.value}}
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
          <AppToast content={toastMess} type={0} isOpen={openToast} callback={() => {
            setOpenToast(false);
          }}/>
          </Fragment>
      );
    }