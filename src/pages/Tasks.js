import React, { useContext, useEffect, useState } from 'react'
import { Container, Typography, Card, CardContent, LinearProgress, Snackbar, SnackbarContent } from '@material-ui/core'

import UserContext from '../context/UserContext'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'

const Tasks = () => {
    const user = useContext(UserContext)
    const [tasks, setTasks] = useState([])
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
    useEffect(() => {
        const getTasks = async () => {
            try {
                const result = await fetch('https://taskify-123.herokuapp.com/api/tasks', {
                    headers: {
                        authorization: user.token
                    }
                })
                const json = await result.json()
                if (json.success)
                    await setTasks(json.data.tasks)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        getTasks()
        const updatingTasks = setInterval(getTasks, 1000 * 60 * 5)
        return function cleanup() {
            clearInterval(updatingTasks)
        }
    }, [user.token])
    const addTask = data => {
        fetch('https://taskify-123.herokuapp.com/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: user.token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setTasks(prevTasks => {
                        return [
                            ...prevTasks,
                            json.data.task
                        ]
                    })
                } else {
                    handleSnackOpen(json.message ?? 'Something Went Wrong!')
                }
            })
            .catch(err => console.log(err))
    }
    const changeTaskStatus = id => {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task._id === id && task.status < 2) {
                    task.status++
                    task.updatedAt = new Date().toISOString()
                }
                return task
            })
        })
        fetch('https://taskify-123.herokuapp.com/api/tasks/' + id, {
            method: 'PATCH',
            headers: {
                authorization: user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                } else {
                    handleSnackOpen(json.message ?? 'Something Went Wrong!')
                }
            })
            .catch(err => console.log(err))
    }
    const deleteTask = id => {
        setTasks(prevTasks => {
            return prevTasks.filter(task => task._id !== id)
        })
        fetch('https://taskify-123.herokuapp.com/api/tasks/' + id, {
            method: 'DELETE',
            headers: {
                authorization: user.token
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    handleSnackOpen('Deleted successfully!')
                } else {
                    handleSnackOpen(json.message ?? 'Something Went Wrong!')
                }
            })
            .catch(err => console.log(err))
    }
    const NoTaskCard = (
        <Container maxWidth="xs" className="mt-1">
            <Card variant="outlined">
                <CardContent>
                    <Typography>Add a task to see here</Typography>
                </CardContent>
            </Card>
        </Container>
    )
    return (
        <div>
            {isLoading && <Container maxWidth="sm">
                <LinearProgress className="mt-1" />
            </Container>}
            {!isLoading && tasks.length === 0 && NoTaskCard}
            {!isLoading && tasks.length !== 0 && <TaskList tasks={tasks} changeTaskStatus={changeTaskStatus} deleteTask={deleteTask} />}
            {!isLoading && <AddTask addTask={addTask} />}
            <Snackbar open={isSnackOpen} autoHideDuration={5000} onClose={handleSnackClose}>
                <SnackbarContent message={snackMessage} />
            </Snackbar>
        </div>
    )
}

export default Tasks