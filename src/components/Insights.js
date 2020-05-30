import React from 'react'
import { Container, Typography, Divider } from '@material-ui/core'
import { Bar, Polar, HorizontalBar } from 'react-chartjs-2'

const Insights = props => {
    const tasks = props.tasks
    const allTasksTodo = props.tasks.filter(task => task.status !== 2)
    const newTasks = props.tasks.filter(task => task.status === 0)
    const tasksDoing = props.tasks.filter(task => task.status === 1)
    const completedTasks = props.tasks.filter(task => task.status === 2)
    return (
        <>
            <Container>
                <Typography variant="h6">
                    Overall Statistics
                </Typography>
                <HorizontalBar
                    options={{
                        scales: {
                            xAxes: [{
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
                            backgroundColor: 'rgba(0, 168, 255,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(0, 168, 255)'
                        },
                        {
                            data: [allTasksTodo.length],
                            label: 'All Tasks To Do',
                            backgroundColor: 'rgba(232, 65, 24,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(232, 65, 24)'
                        },
                        {
                            data: [newTasks.length],
                            label: 'New Tasks',
                            backgroundColor: 'rgba(156, 136, 255,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(156, 136, 255)'
                        },
                        {
                            data: [tasksDoing.length],
                            label: 'Tasks Doing',
                            backgroundColor: 'rgba(76, 209, 55,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(76, 209, 55)'
                        }, {
                            data: [completedTasks.length],
                            label: 'Completed Tasks',
                            backgroundColor: 'rgba(251, 197, 49,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(251, 197, 49)'
                        }],
                        labels: ['Overall Statistics']
                    }}
                />
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
                            backgroundColor: 'rgba(0, 168, 255,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(0, 168, 255)'
                        },
                        {
                            data: [allTasksTodo.length],
                            label: 'All Tasks To Do',
                            backgroundColor: 'rgba(232, 65, 24,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(232, 65, 24)'
                        },
                        {
                            data: [newTasks.length],
                            label: 'New Tasks',
                            backgroundColor: 'rgba(156, 136, 255,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(156, 136, 255)'
                        },
                        {
                            data: [tasksDoing.length],
                            label: 'Tasks Doing',
                            backgroundColor: 'rgba(76, 209, 55,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(76, 209, 55)'
                        }, {
                            data: [completedTasks.length],
                            label: 'Completed Tasks',
                            backgroundColor: 'rgba(251, 197, 49,0.25)',
                            borderWidth: 1,
                            borderColor: 'rgba(251, 197, 49)'
                        }],
                        labels: ['Overall Statistics']
                    }}
                />
                <Polar
                    data={{
                        datasets: [{
                            data: [tasks.length, allTasksTodo.length, newTasks.length, tasksDoing.length, completedTasks.length],
                            backgroundColor: [
                                'rgba(0, 168, 255,0.5)',
                                'rgba(232, 65, 24,0.5)',
                                'rgba(156, 136, 255,0.5)',
                                'rgba(76, 209, 55,0.5)',
                                'rgba(251, 197, 49,0.5)'
                            ],
                            hoverBorderColor: [
                                'rgba(0, 168, 255)',
                                'rgba(232, 65, 24)',
                                'rgba(156, 136, 255)',
                                'rgba(76, 209, 55)',
                                'rgba(251, 197, 49)']
                        }],
                        labels: [
                            'Total Tasks',
                            'All Tasks To Do',
                            'New Tasks',
                            'Tasks Doing',
                            'Completed Tasks'
                        ]
                    }}
                />
            </Container>
            <Divider />
        </>
    )
}

export default Insights