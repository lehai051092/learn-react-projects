import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, IconButton, Typography} from "@material-ui/core";
import classNames from "classnames";
import RemoveIcon from '@material-ui/icons/Remove';

Todo.propTypes = {
    todo: PropTypes.object,
    index: PropTypes.number,
    handleUpdateStatus: PropTypes.func,
    handleRemove: PropTypes.func,
};

function Todo({todo = {}, index = 0, handleUpdateStatus = null, handleRemove = null}) {
    const handleUpdateStatusTodo = (todo, index) => {
        if (!handleUpdateStatus) return;
        handleUpdateStatus(todo, index);
    }

    const handleRemoveTodo = (index) => {
        if (!handleRemove) return;
        handleRemove(index);
    }

    return (
        <li className={classNames({
            completed: todo.status === 'complete',
        })}
        >
            <Checkbox checked={(todo.status === 'complete')} onClick={() => handleUpdateStatusTodo(todo, index)}/>
            <Typography>{todo.doing}</Typography>
            <IconButton onClick={() => handleRemoveTodo(index)}>
                <RemoveIcon color="secondary" fontSize="small"/>
            </IconButton>
        </li>
    );
}

export default Todo;