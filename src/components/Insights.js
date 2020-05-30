import React, { useState, useEffect } from 'react'
import { Container, Typography, Divider } from '@material-ui/core'
import { Bar, Pie } from 'react-chartjs-2'
import { isMobileOnly } from 'react-device-detect'

const Insights = props => {
    const [quote, setQuote] = useState('')
    const tasks = props.tasks
    const tasksTodo = props.tasks.filter(task => task.status !== 2)
    const newTasks = props.tasks.filter(task => task.status === 0)
    const tasksDoing = props.tasks.filter(task => task.status === 1)
    const completedTasks = props.tasks.filter(task => task.status === 2)
    const numberOfCompletedTasksOnTime = completedTasks.reduce((total, task) => {
        let d1 = new Date(task.dueDate)
        let d2 = new Date(task.updatedAt)
        if (d1 > d2)
            return total + 1
        return total
    }, 0)
    useEffect(() => {
        fetch('https://quotes.rest/qod?language=en', {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.contents) {
                    if (json.contents.quotes)
                        if (json.contents.quotes[0])
                            if (json.contents.quotes[0].quote)
                                setQuote(json.contents.quotes[0].quote)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            {isMobileOnly && <Typography variant="subtitle2" color="secondary">
                {'The content might not be properly visible due to screen size. You can also turn on the desktop site or use a larger screen device.'}
            </Typography>}
            <Container>
                <Typography variant="h6">
                    Overall Statistics
                </Typography>
                <div>
                    <Bar
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                        data={{
                            datasets: [{
                                data: [tasks.length],
                                label: 'Total Tasks',
                                backgroundColor: 'rgba(156, 136, 255,0.25)',
                                borderWidth: 1,
                                borderColor: 'rgba(156, 136, 255)'
                            },
                            {
                                data: [completedTasks.length],
                                label: 'Completed Tasks',
                                backgroundColor: 'rgba(0, 168, 255,0.25)',
                                borderWidth: 1,
                                borderColor: 'rgba(0, 168, 255)'
                            },
                            {
                                data: [tasksTodo.length],
                                label: 'Tasks To Do',
                                backgroundColor: 'rgba(76, 209, 55,0.25)',
                                borderWidth: 1,
                                borderColor: 'rgba(76, 209, 55)'
                            },
                            {
                                data: [newTasks.length],
                                label: 'New Tasks',
                                backgroundColor: 'rgba(251, 197, 49,0.25)',
                                borderWidth: 1,
                                borderColor: 'rgba(251, 197, 49)'
                            },
                            {
                                data: [tasksDoing.length],
                                label: 'Tasks Doing',
                                backgroundColor: 'rgba(232, 65, 24,0.25)',
                                borderWidth: 1,
                                borderColor: 'rgba(232, 65, 24)'
                            }],
                            labels: ['Overall Statistics']
                        }}
                    />
                </div>
            </Container>
            <Divider />
            <Container>
                <Typography variant="h6">
                    Punctuality
                </Typography>
                <div>
                    <Pie
                        options={{
                            cutoutPercentage: 50
                        }}
                        data={{
                            datasets: [{
                                data: [numberOfCompletedTasksOnTime, completedTasks.length - numberOfCompletedTasksOnTime],
                                backgroundColor: [
                                    'rgba(76, 209, 55,0.5)',
                                    'rgba(232, 65, 24,0.5)'
                                ],
                                hoverBorderColor: [
                                    'rgba(76, 209, 55)',
                                    'rgba(232, 65, 24)'
                                ]
                            }],
                            labels: [
                                'On Time',
                                'Late'
                            ]
                        }}
                    />
                </div>
            </Container>
            {quote && <>
                <Divider />
                <Container>
                    <Typography variant={isMobileOnly ? 'caption' : 'overline'}>
                        {quote}
                    </Typography>
                </Container>
            </>}
        </>
    )
}

export default Insights