import React from 'react'

import Todo from './Todo'

const CompletedTodos = props => {
    return (
        <>
            {props.tasks.map(task => <Todo key={task._id} task={task} />)}
        </>
    )
}

export default CompletedTodos