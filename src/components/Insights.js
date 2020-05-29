import React from 'react'

const Insights = props => {
    const tasks = props.tasks.filter(task => task.status !== 2)
    const newTasks = props.tasks.filter(task => task.status === 0)
    const doingTasks = props.tasks.filter(task => task.status === 1)
    const completedTasks = props.tasks.filter(task => task.status === 2)
    return (
        <>
            All Tasks - {tasks.length}
            <br />
            New Tasks - {newTasks.length}
            <br />
            Doing Tasks - {doingTasks.length}
            <br />
            Completed Tasks - {completedTasks.length}
        </>
    )
}

export default Insights