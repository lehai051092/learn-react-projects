import React from 'react';
import {Box, Container, makeStyles, Typography} from "@material-ui/core";
import ToDoList from "../components/ToDoList";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        color: theme.palette.grey[700],
        textTransform: 'uppercase',
        letterSpacing: theme.spacing(1)
    }
}));

const initTodoList = [
    {
        id: 1,
        doing: 'Learn React',
        status: 'complete'
    },
    {
        id: 2,
        doing: 'Learn C#',
        status: 'new'
    },
    {
        id: 3,
        doing: 'Learn PHP',
        status: 'new'
    },
];

TodoPage.propTypes = {};

function TodoPage() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <Box component="div" className={classes.paper}>
                <Typography component="h1" variant="h3" className={classes.title}>Things To Do</Typography>
                <ToDoList initTodoList={initTodoList}/>
            </Box>
        </Container>
    );
}

export default TodoPage;