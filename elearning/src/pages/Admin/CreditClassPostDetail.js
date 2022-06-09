import {React, useState, useEffect, Fragment} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import AppAvatar from '../../myTool/handleAvatar';


const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function CreditClassPostDetail() {
    const { id } = useParams();
    const [listPost,setListPost]=useState([]);

    const loadPosts=() => {
        const token=localStorage.getItem('accessToken')
        axios.get('api/credit-class/creditclass-list-post?creditclass_id='+id,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            
            setListPost(response.data)

        }).catch(error => console.log(error))
    }

    useEffect(() => {
        loadPosts();
    },[])

  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Các bài post</h1>
      
      <Paper style={{ padding: "40px 20px" }}>
      {listPost.map((post) => {
          <Fragment>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <AppAvatar url={post.avartarPublisher} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <p style={{ textAlign: "left" }}>
                    {post.postContent}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    {post.postedTime}
                    </p>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </Fragment>
        })}
      </Paper>

      
    </div>
  );
}