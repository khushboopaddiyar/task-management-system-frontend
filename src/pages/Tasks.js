import React, { useContext, useEffect, useState } from 'react'
import { Container, Typography, Card, CardContent, LinearProgress } from '@material-ui/core'

import UserContext from '../context/UserContext'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'

const Tasks = () => {
    const user = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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
    }, [user.token])
    const addTask = data => {
        console.log(data)
        setTasks(prevTasks => {
            return [
                ...prevTasks,
                data
            ]
        })
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
            {!isLoading && <TaskList tasks={tasks} />}
            {!isLoading && <AddTask addTask={addTask} />}
        </div>
    )
}

export default Tasks