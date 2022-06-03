import { useState, useEffect } from 'react'
import axios from "axios";
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

export function stringAvatar(name, numwidth=35, numheight=35) {
    let arr=name.split(' ')
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: numwidth, 
        height: numheight
      },
      children:  (arr.length>=2?arr[arr.length - 2][0]:"")+arr[arr.length - 1][0],//arr.reduce((pre,current)=>(pre+current[0]),""),
    };
  }

  export default  function AppAvatar({url,imgSize=35}){
    const [img, setImge] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem('accessToken')
      axios
      .get(
        url,
        {
          headers: {
          'Authorization': `Bearer ${token}`
          },
          responseType: 'arraybuffer' },
      )
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setImge("data:;base64," + base64);
      });
    })
    return (
      <Avatar sx={{ width: imgSize, height: imgSize }} src={img} />
    )
  }