import React, { useState, useContext } from 'react'
import { Avatar, Button, Container, CssBaseline, TextField, Link, Grid, Typography, Snackbar, SnackbarContent } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

import UserContext from '../context/UserContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Auth = () => {
    const classes = useStyles()
    const user = useContext(UserContext)
    const [isLogin, setIsLogin] = useState(true)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const handleClose = () => {
        setMessage('')
        setOpen(false)
    }
    const switchForm = () => setIsLogin(prev => !prev)
    const handleSubmit = async e => {
        e.preventDefault()
        const { name, email, password, confirmPassword } = e.currentTarget.elements
        if (!isLogin) {
            if (password.value !== confirmPassword.value) {
                setMessage('Passwords do not match!')
                setOpen(true)
                return
            }
        }
        const data = {
            email: email.value,
            password: password.value
        }
        if (!isLogin)
            data.name = name.value
        const result = await fetch(`https://taskify-123.herokuapp.com/api/users/${isLogin ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (!json.success) {
            setMessage(json.message || 'Something Went Wrong!')
            setOpen(true)
            return
        }
        user.login(json.data.user._id, json.data.user.name, json.data.token)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Taskify{isLogin ? ' - Sign in' : ' - Sign Up'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {isLogin ? null :
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoFocus
                        />
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoFocus
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
                    />
                    {isLogin ? null :
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                        />
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isLogin ? 'Sign in' : 'Sign Up'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" onClick={switchForm} variant="body2">
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <SnackbarContent message={message} />
                </Snackbar>
            </div>
        </Container>
    )
}

export default Auth