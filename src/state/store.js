/**
 * Global State Store
 */

import { createStore, combineReducers } from 'redux';

function todoList(state = [], action) {
    if (action.type !== 'saveExpandedTodo')
        return state;

    const { expandedTodo } = action;

    let todoIndex = state.findIndex(todoItem => todoItem.id === expandedTodo.id);
    todoIndex = todoIndex === -1 ? state.length : todoIndex;

    const todoList = [...state.slice(0, todoIndex), expandedTodo, ...state.slice(todoIndex + 1)];
    return todoList;
};

function visibilityFilter(state = 'all', action) {
    if (action.type !== 'setVisibilityFilter')
        return state;

    return action.visibilityFilter || 'all';
};

function taskChange(expandedTodo, { taskId, fieldName, value }) {
    fieldName = fieldName === 'checked' ? 'done' : fieldName;

    const expandedTodoTasks = expandedTodo.tasks || [];

    let taskIndex = expandedTodoTasks.findIndex(taskItem => taskItem.id === taskId);
    taskIndex = taskIndex === -1 ? expandedTodoTasks.length : taskIndex;

    let task = Object.assign({}, (expandedTodoTasks[taskIndex] || {}), { id: taskId, [fieldName]: value });

    const tasks = [...expandedTodoTasks.slice(0, taskIndex), task, ...expandedTodoTasks.slice(taskIndex + 1)];

    const completedTasks = tasks.filter(task => task.done);
    const done = (completedTasks.length === tasks.length);

    return Object.assign({}, expandedTodo, {
        tasks,
        done
    });
};

function todoChange(expandedTodo, { fieldName, value }) {
    fieldName = fieldName === 'checked' ? 'done' : fieldName;

    let tasks = expandedTodo.tasks;

    if (fieldName === 'done') {
        tasks = tasks.map(taskItem => {
            return Object.assign({}, taskItem, { done: value });
        });
    }

    return Object.assign({}, expandedTodo, {
        [fieldName]: value,
        tasks
    });
};

function setExpandedTodo({ todo }) {
    return todo;
};

function addTodo({ id }) {
    return { id };
};

function expandedTodo(state = null, action) {
    if (action.type === 'taskChange')
        return taskChange(state, action);

    if (action.type === 'todoChange')
        return todoChange(state, action);

    if (action.type === 'setExpandedTodo')
        return setExpandedTodo(action);

    if (action.type === 'addTodo')
        return addTodo(action);

    return state;
};

function expandedTodoEditable(state = false, action) {
    if (action.type === 'setExpandedTodo')
        return false;

    if (action.type === 'addTodo')
        return true;

    if (action.type === 'saveExpandedTodo')
        return false;

    if (action.type === 'toggleEditable')
        return !state;

    return state;
};

const reducers = {
    todoList,
    visibilityFilter,
    expandedTodo,
    expandedTodoEditable
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

const actionCreators = {
    addTodo: (id) => ({ type: 'addTodo', id }),

    saveExpandedTodo: (expandedTodo) => ({ type: 'saveExpandedTodo', expandedTodo }),

    setVisibilityFilter: (visibilityFilter) => ({ type: 'setVisibilityFilter', visibilityFilter }),

    toggleEditable: () => ({ type: 'toggleEditable' }),

    setExpandedTodo: (todo) => ({ type: 'setExpandedTodo', todo }),

    todoChange: (fieldName, value) => ({ type: 'todoChange', fieldName, value }),

    taskChange: (taskId, fieldName, value) => ({ type: 'taskChange', taskId, fieldName, value })
};

export { store, actionCreators };
