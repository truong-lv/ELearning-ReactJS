


import { Fragment } from 'react'

import { useState, useEffect, useCallback} from 'react'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

  const headCells = [
    {
      id: 'studentCode',
      numeric: false,
      disablePadding: true,
      label: 'Mã',
    },
    {
      id: 'fullnanme',
      numeric: true,
      disablePadding: false,
      label: 'Họ tên',
    }
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick,numSelected, rowCount } =
      props;
   
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
            >
              <TableSortLabel>
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  const EnhancedTableToolbar = (props) => {
    const { numSelected,itemSelected, idCreditclass, handleRefresh } = props;
    const deleteStudents=() => {
      const token=localStorage.getItem('accessToken')
      var config = {
        method: 'put',
        url: axios.defaults.baseURL + '/api/admin/creditclass/remove-student-from-credit-class?credit-class-id='+idCreditclass,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({studentCode: itemSelected})
      };
      axios(config)
        .then(function (response) {
          if(response.status===200){
            console.log("delete student success")
            handleRefresh()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} đã chọn
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            0 đã chọn
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={() =>deleteStudents()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

export default function MemberDetail() {
    const { id } = useParams();
    const [listTeacher,setListTeacher]=useState([]);
    const [listStudent,setListStudent]=useState([]);
    const [listClass,setListClass]=useState([]);
    const [listAllStudent,setListAllStudent]=useState([]);

    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const handleRefresh=useCallback(()=>{loadMembers()},[listStudent]);

    const [classSelected, setClassSelected] = useState(0);
    const [studentSelects, setStudentSelects] = useState([]);

    const token=localStorage.getItem('accessToken')
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
    function getStyles(name, teacherSelects, theme) {
      return {
        fontWeight:
          teacherSelects.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    const theme = useTheme();

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = listStudent.map((n) => n.studentCode);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const loadMembers=() => {
            axios.get('api/credit-class/creditclass-all-members-active?creditclass_id='+id,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                
                setListTeacher(response.data.teacherInfos)
                setListStudent(response.data.students)
    
            }).catch(error => console.log(error))
    }

    useEffect(() => {
      loadMembers();
    },[])

    useEffect(() => {
      axios.get('api/class/all',{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).then((response) => {
          
        setListClass(response.data)
      }).catch(error => console.log(error))
    },[])

    useEffect(() => {
      axios.get('api/student/get-all-by-class?class-id='+classSelected,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).then((response) => {
          
        setListAllStudent(response.data)
      }).catch(error => console.log(error))
    },[classSelected])

    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      
      setSelected(newSelected);
    };
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
    
    const handleClose=()=>{
      setIsOpen(false)
    }

    const handleChangeStudent = (event) => {
      const { target: { value }, } = event;
      setStudentSelects(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleAddStudent=()=>{
      setIsOpen(true)
      
    }

    const handleConfirm=()=>{
      var config = {
        method: 'post',
        url: axios.defaults.baseURL + '/api/admin/creditclass/add-student-to-credit-class?credit-class-id='+id,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({studentCode: studentSelects})
      };
      console.log(JSON.stringify({studentCode: studentSelects}))
      axios(config)
        .then(function (response) {
          if(response.status===200){
            console.log("delete student success")
            loadMembers();
            setIsOpen(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
            <Fragment >
                <Typography variant='h6' component='div' color="#2980B9"> GIẢNG VIÊN </Typography>
                <List dense sx={{ width: '100%', maxWidth: 360,textAlign: 'center', bgcolor: 'background.paper' }}>
                    {listTeacher.map((teacher) => {
                        const labelId = `checkbox-list-secondary-label-${teacher.phone}`;
                        return (
                          <Fragment key={teacher.phone}>
                        <ListItem
                            key={teacher.phone}
                        >
                            <ListItemText id={labelId} primary={`${teacher.fullname} - ${teacher.phone}`} />
                        </ListItem>
                        <Divider />
                        </Fragment>);
                    })}
                </List>
              <div style={{display:'flex',margin:'10px 0', justifyContent:'space-between'}}>
                <Typography variant='h6' component='div' color="#2980B9">SINH VIÊN</Typography>
                <Button color="success" variant="contained"endIcon={<AddIcon />} onClick={()=>{handleAddStudent()}}>
                  Thêm
                </Button>
              </div>
                <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} 
                                          itemSelected={selected} 
                                          idCreditclass={id}
                                          handleRefresh={handleRefresh}/>
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={listStudent.length}
                        />
                        <TableBody>
                        {listStudent.map((row, index) => {
                            const isItemSelected = isSelected(row.studentCode);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.studentCode)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.studentCode}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.studentCode}
                                </TableCell>
                                <TableCell >{row.fullnanme}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
                </Box>

                <Dialog open={isOpen} onClose={handleClose} 
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '50ch' },
                  }}
                  noValidate
                  autoComplete="off">
                    <DialogTitle>Thêm sinh viên vào lớp tín chỉ</DialogTitle>
                    <DialogContent>
                      <FormControl sx={{width: '50%',margin:'16px'}}>
                        <InputLabel id="demo-simple-select-label">Lớp</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={classSelected}
                          label="Khoa"
                          onChange={(event) => {setClassSelected(event.target.value);}}
                          >
                            {listClass.map((item) => (
                            <MenuItem
                              key={item.classId}
                              value={item.classId}
                            >{item.className}
                            </MenuItem>
                          ))}
                          </Select>
                      </FormControl>
                    
                      <FormControl sx={{ m: 1, width: '100%' ,margin:'16px'}}>
                        <InputLabel id="demo-multiple-name-label">Sinh viên</InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={studentSelects}
                          onChange={handleChangeStudent}
                          input={<OutlinedInput label="Giảng viên" />}
                          MenuProps={MenuProps}
                        >
                          {listAllStudent.map((student) => (
                            <MenuItem
                              key={student.studentCode}
                              value={student.studentCode}
                              style={getStyles(student.fullnanme, studentSelects, theme)}
                            >
                              {student.fullnanme}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleConfirm}>Xác nhận</Button>
            </DialogActions>
                  </Dialog>
            </Fragment>
    )
}


// export default function ListSV(listSV) {
//     const list = [listSV.listSV]
//     return (
//         <div>
//             {list.map((value) => {
//                 return <Member key={value} value={value} />
//             })}
//         </div>
//     )

// }
