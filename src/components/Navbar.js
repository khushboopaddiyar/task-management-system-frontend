import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'

import UserContext from '../context/UserContext'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
}))

const Navbar = () => {
    const classes = useStyles()
    const user = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [isAlertOpen, setAlertOpen] = useState(false)
    const handleAlertOpen = () => setAlertOpen(true)
    const handleAlertClose = () => setAlertOpen(false)
    const isMenuOpen = Boolean(anchorEl)
    const handleProfileMenuOpen = e => setAnchorEl(e.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const handleSignOut = () => {
        handleMenuClose()
        handleAlertOpen()
    }
    const menuId = 'account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={handleMenuClose}
                component={NavLink}
                to="/profile"
            >
                Profile
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    )
    const renderAlert = (
        <div>
            <Dialog
                open={isAlertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to Sign Out?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={() => {
                        handleAlertClose()
                        user.logout()
                    }} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Taskify
                    </Typography>
                    {user.token && <Button component={NavLink} to="/tasks" color="inherit">
                        Tasks
                    </Button>}
                    {user.token && <IconButton
                        edge="end"
                        aria-label="Account"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>}
                </Toolbar>
            </AppBar>
            {user.token && renderMenu}
            {user.token && renderAlert}
        </div>
    )
}

export default Navbar