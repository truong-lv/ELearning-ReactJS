import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import stringAvatar from '../../myTool/handleAvatar';
import fomatDateTime from '../../myTool/fomatDateTime';

const MyPost =({post})=> {
  return(
  <Card variant="outlined">
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
                {fomatDateTime(post.postedTime)}
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
      <Grid container rowSpacing={3}>
        {prop.listPost.map((post)=>{return <Grid item md={11} ><MyPost key={post.postId} post={post}/></Grid>})}
      </Grid>
  );
}
