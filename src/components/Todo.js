import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Chip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Delete } from '@material-ui/icons'

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    pos: {
        marginBottom: 4
    }
})

const Todo = props => {
    const classes = useStyles()
    let taskLabel = ''
    let taskColor = 'default'
    if (props.task.status === 0) {
        taskLabel = 'New'
        taskColor = 'primary'
    }
    if (props.task.status === 1)
        taskLabel = 'Doing'
    if (props.task.status === 2)
        taskLabel = 'Completed'
    let d1 = new Date()
    let d2 = new Date(props.task.dueDate)
    let isDue = false
    if (props.task.status !== 2 && d2 < d1)
        isDue = true
    return (
        <div className="mt-1">
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Chip label={taskLabel} color={taskColor} className={classes.pos} size="small" />
                    <Typography variant="body1" component="p" className={classes.pos}>
                        {props.task.description}
                    </Typography>
                    <Typography className={classes.pos} color={isDue ? 'secondary' : 'textSecondary'}>
                        {"Due " + d2.toLocaleString()}
                    </Typography>
                    {props.task.status === 2 && <Typography className={classes.pos} color="primary">
                        {"Done on " + new Date(props.task.updatedAt).toLocaleString()}
                    </Typography>}
                    <Chip label={props.task.label} variant="outlined" />
                </CardContent>
                {props.task.status !== 2 && <CardActions>
                    <Button size="small" onClick={props.changeTaskStatus.bind(this, props.task._id)}>{props.task.status === 0 ? 'Mark as Doing' : 'Mark as Completed'}</Button>
                    <IconButton aria-label="delete" onClick={props.deleteTask.bind(this, props.task._id)}>
                        <Delete />
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}

export default Todo