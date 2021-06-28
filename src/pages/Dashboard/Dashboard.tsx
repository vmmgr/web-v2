import React, {useEffect} from 'react';
import DashboardComponent from "../../components/Dashboard/Dashboard";
import {Grid} from "@material-ui/core";
import useStyles from "../Dashboard/styles"
import {useSnackbar} from "notistack";
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";


export default function Dashboard() {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();


    return (
        <DashboardComponent title="Dashboard">
            <Grid container spacing={3}>
                <Grid item xs={8}>
                </Grid>
            </Grid>
        </DashboardComponent>
    );
}