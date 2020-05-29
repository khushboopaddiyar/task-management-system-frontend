import React from 'react'

import Todo from './Todo'

const Todos = props => {
    return (
        <>
            {props.tasks.map(task => <Todo key={task._id} task={task} changeTaskStatus={props.changeTaskStatus} deleteTask={props.deleteTask} />)}
        </>
    )
}

export default Todos