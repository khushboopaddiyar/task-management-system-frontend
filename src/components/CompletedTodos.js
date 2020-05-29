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

const CompletedTodos = props => {
    const classes = useStyles()
    const [isSearch, setIsSearch] = useState(false)
    const [searchedTasks, setSearchedTasks] = useState([])
    const handleSearch = e => {
        if (props.tasks.length === 0)
            return
        if (e.currentTarget.value.trim()) {
            setIsSearch(true)
            setSearchedTasks(props.tasks.filter(task => task.description.toLowerCase().includes(e.currentTarget.value.trim().toLowerCase()) || task.label.toLowerCase().includes(e.currentTarget.value.trim().toLowerCase())))
        } else {
            setIsSearch(false)
            setSearchedTasks([])
        }
    }
    return (
        <>
            <TextField
                className={classes.margin}
                id="search-completed-tasks"
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
            {!isSearch && props.tasks.map(task => <Todo key={task._id} task={task} />)}
            {isSearch && searchedTasks.length === 0 && <Typography>
                Sorry, no result found
            </Typography>}
            {isSearch && searchedTasks.length !== 0 && searchedTasks.map(task => <Todo key={task._id} task={task} />)}
        </>
    )
}

export default CompletedTodos