import React, { useState } from 'react'
import { Fab, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Container, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    form: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}))

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />
})

const AddTask = props => {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    const handleAddTask = e => {
        e.preventDefault()
        handleClose()
        const { description, label, dueDate } = e.currentTarget.elements
        const data = {
            description: description.value,
            label: label.value,
            dueDate: new Date(dueDate.value)
        }
        props.addTask(data)
    }
    return (
        <div>
            <Fab color="secondary" aria-label="Add Task" className={classes.fab} onClick={handleOpen}>
                <Add />
            </Fab>
            <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
                <form onSubmit={handleAddTask}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <Close />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Add Task
                            </Typography>
                            <Button color="inherit" type="submit">
                                Done
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth="sm">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            multiline
                            required
                            id="description"
                            name="description"
                            label="Description"
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="label-label">Label</InputLabel>
                            <Select
                                labelId="label-label"
                                id="label"
                                name="label"
                                label="Label"
                                defaultValue="Unlabelled"
                            >
                                <MenuItem value="Unlabelled" selected>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Shopping">Shopping</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="dueDate"
                            name="dueDate"
                            type="datetime-local"
                            defaultValue="2020-05-09T08:00"
                            label="Due Date"
                        />
                    </Container>
                </form>
            </Dialog>
        </div>
    )
}

export default AddTask