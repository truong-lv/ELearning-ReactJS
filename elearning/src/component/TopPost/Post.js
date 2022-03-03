import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

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

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const MyPost =({post})=> {
  return(
  <Card variant="outlined" item  >
    <CardContent>
    <Grid container spacing={1}>
        <Grid item md={0}>
            <Avatar {...stringAvatar(post.fullname)} />
        </Grid>
        <Grid container item md={11} direction='row'>
            <Grid container item style={{ position: 'relative'}}>
              <Grid item>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Bởi {post.fullname} - lớp {post.subjectName}
                </Typography>
                </Grid>
                <Grid item style={{ position: 'absolute', right:'0'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary"> 
                {post.postedTime}
                </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="body2" >
                    {post.postContent}
                </Typography>
            </Grid>
        </Grid>
    </Grid>
     
    </CardContent>
    <CardActions>
      <Button style={{margin:'auto'}} size="small">Xem chi tiết</Button>
    </CardActions>
  </Card>
)};

export default function Post(prop) {
  return (
    <Box sx={{ minWidth: 275 }} >
      <Grid container rowSpacing={3}>
        {prop.listPost.map((post)=>{return <Grid item><MyPost key={post.creditClassId} post={post}/></Grid>})}
      </Grid>
    </Box>
  );
}
