import Navbar from "../../component/Navbar/Nabar"
import { Fragment, useEffect, useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from "./style.module.scss"

function Notification(){
    return (
        <Fragment>
        <Navbar/>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1 }} className={style.boxContainer}>
            <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                THÔNG BÁO
            </Typography>
          </Box>
          </Container>
        </Fragment>
    )
}
export default Notification