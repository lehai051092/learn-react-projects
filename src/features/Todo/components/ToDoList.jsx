import React, {useMemo, useRef, useState} from 'react';
import {Box, Button, Input, InputAdornment, makeStyles, TextField, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import Todo from "./Todo";
import SearchIcon from '@material-ui/icons/Search';
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            cursor: 'pointer',
        },

        '& > li.completed': {
            textDecoration: 'line-through',
            color: theme.palette.grey[500],
            fontStyle: 'italic'
        }
    },
    add: {
        margin: theme.spacing(1, 0)
    }
}));

ToDoList.propTypes = {
    initTodoList: PropTypes.array,
};

function ToDoList({initTodoList = []}) {
    const classes = useStyles();
    const [todoList, setTodoList] = useState(initTodoList);
    const [searchTerm, setSearchTerm] = useState('');
    const [addNew, setAddNew] = useState('');
    const [filters, setFilters] = useState('all');
    const typingTimeoutRef = useRef(null);
    const {enqueueSnackbar} = useSnackbar();

    const handleUpdateStatus = (todo, index) => {
        const newTodoList = [...todoList];
        newTodoList[index] = {
            ...todo,
            status: (todo.status === 'new') ? 'complete' : 'new'
        }
        setTodoList(newTodoList);
    }

    const handleAddNewTodo = (event) => {
        const newTodoList = [...todoList];
        const value = event.target.value;

        setAddNew(value);

        const newTodo = {
            id: (newTodoList[newTodoList.length - 1]) ? newTodoList[newTodoList.length - 1].id + 1 : 1,
            doing: value,
            status: 'new'
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            newTodoList.push(newTodo);
            setTodoList(newTodoList);
            setAddNew('');
            enqueueSnackbar('Create successfully', {variant: 'success'});
        }, 3000);
    }

    const handleRemove = (index) => {
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
        enqueueSnackbar('Remove todo successfully', {variant: 'error'});
    }

    const handleFilterAll = () => {
        setFilters('all');
    }

    const handleFilterNew = () => {
        setFilters('new');
    }

    const handleFilterCompleted = () => {
        setFilters('complete');
    }

    const filterTodoList = useMemo(() => (
        todoList.filter((todo) => filters === 'all' || filters === todo.status || todo.doing.toLowerCase().includes(filters))
    ), [todoList, filters]);


    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setFilters(term);
            setAddNew('');
        }, 1000);
    }

    return (
        <Box className={classes.root}>
            <TextField
                label="Add New"
                variant="outlined"
                size="small"
                className={classes.add}
                onChange={handleAddNewTodo}
                value={addNew}
            />
            <Box component="ul" className={classes.list}>
                {filterTodoList.map((todo, index) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        index={index}
                        handleUpdateStatus={handleUpdateStatus}
                        handleRemove={handleRemove}
                    />
                ))}
            </Box>
            <Box>
                <Typography component="span">{`${filterTodoList.length} item`}</Typography>
                <Button onClick={handleFilterAll}>All</Button>
                <Button onClick={handleFilterNew}>New</Button>
                <Button onClick={handleFilterCompleted}>Completed</Button>
                <Input onChange={handleSearch} value={searchTerm} startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
                />
            </Box>
        </Box>
    );
}

export default ToDoList;