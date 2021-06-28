import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    makeStyles,
    TextField, ThemeProvider, Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {colorTheme} from '../../components/Theme';
import React, {FormEvent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Login} from '../../api/Auth';
import {useSnackbar} from 'notistack';
import Cookies from "js-cookie";
import shaJS from "sha.js";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (mail === "") {
            enqueueSnackbar("メールアドレスが入力されていません。", {variant: "error"});
            return
        }
        if (password === "") {
            enqueueSnackbar("パスワードが入力されていません。", {variant: "error"});
            return
        }

        Cookies.remove('user_token');
        Cookies.remove('access_token');

        console.log(shaJS('sha256').update(password).digest('hex'))

        Login(mail, password).then(err => {
            if (err === "") {
                console.log("OK");
                enqueueSnackbar("Login Success !", {variant: "info"});
                // Get().then();
                history.push('/dashboard');
            } else {
                console.log(err);
                enqueueSnackbar(err, {variant: "error"});
            }
        });
    }

    return (
        <ThemeProvider theme={colorTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-Mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            defaultValue=""
                            onChange={event => setMail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            defaultValue=""
                            onChange={event => setPassword(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        {/*<Grid container>*/}
                        {/*    <Grid item xs>*/}
                        {/*        <Link href="/forget" variant="body2">*/}
                        {/*            Forgot password?*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="/register" variant="body2">*/}
                        {/*            {"Don't have an account? Sign Up"}*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </form>
                </div>
                {/*<Box mt={8}>*/}
                {/*    <Copyright/>*/}
                {/*</Box>*/}
            </Container>
        </ThemeProvider>
    );
}
