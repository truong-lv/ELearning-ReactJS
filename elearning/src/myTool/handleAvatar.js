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

export default  function stringAvatar(name, numwidth=35, numheight=35) {
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