import React, { useState } from 'react'
import { Container, Paper, Tabs, Tab } from '@material-ui/core'
import { FormatListBulleted, DoneAll, BarChart } from '@material-ui/icons'

const TaskList = props => {
    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newTab) => {
        setTab(newTab)
    }
    const completedTasks = props.tasks.filter(task => task.status === 2)
    const tasks = props.tasks.filter(task => task.status !== 2)
    return (
        <Container className="mt-1" maxWidth="md">
            <Paper>
                <Tabs
                    variant="fullWidth"
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab icon={<FormatListBulleted />} label="To-Do" />
                    <Tab icon={<DoneAll />} label="Completed" />
                    <Tab icon={<BarChart />} label="Insights" />
                </Tabs>
                <Container>
                    {"To-Do - " + tasks.length}
                    <br />
                    {"Completed - " + completedTasks.length}
                </Container>
            </Paper>
        </Container>
    )
}

export default TaskList