import React, { useEffect, useContext, useState } from 'react'
import { Button, Typography, TextField, Container, LinearProgress, Snackbar, SnackbarContent } from '@material-ui/core'

import UserContext from '../context/UserContext'

const Profile = () => {
    const user = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isSnackOpen, setIsSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const handleSnackOpen = message => {
        setIsSnackOpen(true)
        setSnackMessage(message)
    }
    const handleSnackClose = () => {
        setIsSnackOpen(false)
        setSnackMessage('')
    }
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        createdAt: '',
        updatedAt: ''
    })
    const handleUpdateProfile = e => {
        e.preventDefault()
        const { name, email } = e.currentTarget.elements
        const data = {
            name: name.value,
            email: email.value
        }
        fetch('https://taskify-123.herokuapp.com/api/users/profile', {
            method: 'PATCH',
            headers: {
                authorization: user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    handleSnackOpen(json.message)
                } else {
                    handleSnackOpen(json.message ?? 'Something Went Wrong!')
                }
            })
            .catch(err => console.log(err))
    }
    const handleChangePassword = e => {
        e.preventDefault()
        const { oldPassword, newPassword, confirmPassword } = e.currentTarget.elements
        if (newPassword.value !== confirmPassword.value)
            return handleSnackOpen('New Password and Confirm Password do not match!')
        const data = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        }
        fetch('https://taskify-123.herokuapp.com/api/users/password', {
            method: 'PATCH',
            headers: {
                authorization: user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    handleSnackOpen(json.message)
                    oldPassword.value = ''
                    newPassword.value = ''
                    confirmPassword.value = ''
                } else {
                    handleSnackOpen(json.message ?? 'Something Went Wrong!')
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetch('https://taskify-123.herokuapp.com/api/users/profile', {
            headers: {
                authorization: user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setProfile({
                        name: json.data.profile.name,
                        email: json.data.profile.email,
                        createdAt: new Date(json.data.profile.createdAt),
                        updatedAt: new Date(json.data.profile.updatedAt)
                    })
                } else {
                    alert(json.message ?? 'Something Went Wrong!')
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [user.token])
    return (
        <div>
            {isLoading && <Container maxWidth="sm">
                <LinearProgress className="mt-1" />
            </Container>}
            {!isLoading && <Container maxWidth="sm">
                <form onSubmit={handleUpdateProfile}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="name"
                        name="name"
                        label="Full Name"
                        defaultValue={profile.name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        defaultValue={profile.email}
                    />
                    <Button color="primary" variant="contained" type="submit">Update Profile</Button>
                </form>
                <form onSubmit={handleChangePassword} className="mt-1">
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        label="Old Password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                    />
                    <Button color="secondary" variant="contained" type="submit">Change Password</Button>
                </form>
                <br />
                <Typography variant="caption">{"Account Created At " + profile.createdAt.toString()}</Typography>
                <br />
                <Typography variant="caption">{"Last Updated At " + profile.updatedAt.toString()}</Typography>
                <br />
            </Container>}
            <Snackbar open={isSnackOpen} autoHideDuration={5000} onClose={handleSnackClose}>
                <SnackbarContent message={snackMessage} />
            </Snackbar>
        </div>
    )
}

export default Profile