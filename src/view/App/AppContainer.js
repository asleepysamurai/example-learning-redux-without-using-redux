/**
 * App Root Container Component
 */

import React, { Component } from 'react';

import './AppContainer.scss';

import Sidebar from '../Sidebar';
import Content from '../Content';
import { generateID } from '../../utils';
import { transitionState, getState } from '../../state/store';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = getState();
    }

    addTodo = () => {
        const newState = transitionState({
            expandedTodo: {
                id: generateID()
            },
            expandedTodoEditable: true
        });

        this.setState(newState);
    }

    saveTodo = () => {
        const state = getState();
        const todo = state.expandedTodo;

        let todoIndex = state.todoList.findIndex(todoItem => todoItem.id === todo.id);
        todoIndex = todoIndex === -1 ? state.todoList.length : todoIndex;

        const todoList = [...state.todoList.slice(0, todoIndex), todo, ...state.todoList.slice(todoIndex + 1)];
        const newState = transitionState({
            todoList,
            expandedTodo: todo,
            expandedTodoEditable: false
        });

        this.setState(newState);
    }

    openTodo = (todo) => {
        const newState = transitionState({ expandedTodo: todo, expandedTodoEditable: false })
        this.setState(newState);
    }

    setVisibilityFilter = (visibilityFilter) => {
        const newState = transitionState({ visibilityFilter });
        this.setState(newState);
    }

    onTodoChange = (todoDiff) => {
        const state = getState();
        const expandedTodo = Object.assign({}, state.expandedTodo, todoDiff);
        const newState = transitionState({ expandedTodo })
        this.setState(newState);
    }

    toggleEditable = () => {
        const state = getState();
        const newState = transitionState({ expandedTodoEditable: !state.expandedTodoEditable });
        this.setState(newState);
    }

    renderExpandedTodo() {
        if (!this.state.expandedTodo)
            return null;

        return (
            <Content
                todo={this.state.expandedTodo}
                editable={this.state.expandedTodoEditable}
                saveTodo={this.saveTodo}
                onTodoChange={this.onTodoChange}
                toggleEditable={this.toggleEditable} />
        );
    }

    render() {
        const expandedTodo = this.renderExpandedTodo();

        const component = (
            <div
                className="app-container">
                <Sidebar
                    todoList={this.state.todoList}
                    openTodo={this.openTodo}
                    addTodo={this.addTodo}
                    setVisibilityFilter={this.setVisibilityFilter}
                    visibilityFilter={this.state.visibilityFilter} />
                {expandedTodo}
            </div>
        );

        return component;
    }
};

export default App;
