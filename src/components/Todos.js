import React, { useState } from 'react'
import { InputAdornment, TextField, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import Todo from './Todo'

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    }
}))

const Todos = props => {
    const classes = useStyles()
    const [isSearch, setIsSearch] = useState(false)
    const [searchedTasks, setSearchedTasks] = useState([])
    const handleSearch = e => {
        if (props.tasks.length === 0)
            return
        if (e.currentTarget.value.trim()) {
            setIsSearch(true)
            setSearchedTasks(props.tasks.filter(task => task.description.toLowerCase().includes(e.currentTarget.value.trim().toLowerCase()) || task.label.toLowerCase().includes(e.currentTarget.value.trim().toLowerCase()) || task.status.toString().includes(e.currentTarget.value.trim())))
        } else {
            setIsSearch(false)
            setSearchedTasks([])
        }
    }
    return (
        <>
            <TextField
                className={classes.margin}
                id="search-to-do-tasks"
                placeholder="Search"
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            {!isSearch && props.tasks.map(task => <Todo key={task._id} task={task} changeTaskStatus={props.changeTaskStatus} deleteTask={props.deleteTask} />)}
            {isSearch && searchedTasks.length === 0 && <Typography>
                Sorry, no result found
                <br />
                You can also search for 0 and 1 to find New and Doing task
            </Typography>}
            {isSearch && searchedTasks.length !== 0 && searchedTasks.map(task => <Todo key={task._id} task={task} changeTaskStatus={props.changeTaskStatus} deleteTask={props.deleteTask} />)}
        </>
    )
}

export default Todos