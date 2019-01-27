/**
 * Global State Store
 */

let state = {
    todoList: [],
    visibilityFilter: 'all',
    expandedTodo: null,
    expandedTodoEditable: false
};

let transitionCompleteHandler;

function getState() {
    return state;
};

const transforms = {
    taskChange: ({ taskId, fieldName, value }) => {
        fieldName = fieldName === 'checked' ? 'done' : fieldName;

        const expandedTodoTasks = state.expandedTodo.tasks || [];

        let taskIndex = expandedTodoTasks.findIndex(taskItem => taskItem.id === taskId);
        taskIndex = taskIndex === -1 ? expandedTodoTasks.length : taskIndex;

        let task = Object.assign({}, (expandedTodoTasks[taskIndex] || {}), { id: taskId, [fieldName]: value });

        const tasks = [...expandedTodoTasks.slice(0, taskIndex), task, ...expandedTodoTasks.slice(taskIndex + 1)];

        const completedTasks = tasks.filter(task => task.done);
        const done = (completedTasks.length === tasks.length);

        const expandedTodo = Object.assign({}, state.expandedTodo, {
            tasks,
            done
        });

        return { expandedTodo };
    },

    todoChange: ({ fieldName, value }) => {
        fieldName = fieldName === 'checked' ? 'done' : fieldName;

        let tasks = state.expandedTodo.tasks;

        if (fieldName === 'done') {
            tasks = tasks.map(taskItem => {
                return Object.assign({}, taskItem, { done: value });
            });
        }

        const expandedTodo = Object.assign({}, state.expandedTodo, {
            [fieldName]: value,
            tasks
        });

        return { expandedTodo };
    },

    setExpandedTodo: ({ todo }) => {
        return { expandedTodo: todo, expandedTodoEditable: false };
    },

    addTodo: ({ id }) => {
        return {
            expandedTodo: { id },
            expandedTodoEditable: true
        };
    },

    saveExpandedTodo: () => {
        const todo = state.expandedTodo;

        let todoIndex = state.todoList.findIndex(todoItem => todoItem.id === todo.id);
        todoIndex = todoIndex === -1 ? state.todoList.length : todoIndex;

        const todoList = [...state.todoList.slice(0, todoIndex), todo, ...state.todoList.slice(todoIndex + 1)];
        return {
            todoList,
            expandedTodo: todo,
            expandedTodoEditable: false
        };
    },

    setVisibilityFilter: ({ visibilityFilter }) => {
        return { visibilityFilter };
    },

    toggleEditable: () => {
        return { expandedTodoEditable: !state.expandedTodoEditable };
    }
};

function transitionState(name, data) {
    const stateDiff = transforms[name](data);

    state = Object.assign({}, state, stateDiff);

    if (transitionCompleteHandler)
        transitionCompleteHandler(state);

    return state;
};

function onStateTransition(handler) {
    transitionCompleteHandler = handler;
};

export { transitionState, getState, onStateTransition };
