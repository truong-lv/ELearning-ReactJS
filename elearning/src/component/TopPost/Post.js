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
import FomatDateTime from '../../myTool/fomatDateTime';

const MyPost = ({ post }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          <Grid item={true} md={0}>
            <Avatar {...stringAvatar(post.fullname)} />
          </Grid>
          <Grid container item={true} md={11} direction='row'>
            <Grid container item={true} style={{ position: 'relative' }}>
              <Grid item={true}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Bởi {post.fullname} - lớp {post.subjectName}
                </Typography>
              </Grid>
              <Grid item={true} style={{ position: 'absolute', right: '0' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="div">
                  <FomatDateTime datetime={post.postedTime} />
                </Typography>
              </Grid>
            </Grid>
            <Grid item={true}>
              <Typography variant="body2" >
                {post.postContent}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

      </CardContent>
      <CardActions>
        <Button style={{ margin: 'auto' }} size="small">Xem chi tiết</Button>
      </CardActions>
    </Card>
  )
};

export default function Post(prop) {
  return (
    <Grid container rowSpacing={3}>
      {prop.listPost.map((post) => { return <Grid item={true} md={11} key={post.postId}><MyPost post={post} /></Grid> })}
    </Grid>
  );
}
