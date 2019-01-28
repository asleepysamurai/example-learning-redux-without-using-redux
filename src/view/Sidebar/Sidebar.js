/**
 * Sidebar component
 */

import React, { Component } from 'react';

import './Sidebar.scss';
import TodoList from '../_shared/TodoList';
import { getContextItem } from '../../state/store';

const headerPrefixByVisibilityFilter = {
    all: 'All',
    none: 'Not Started',
    partial: 'Partly Completed',
    done: 'Completed'
};

class Sidebar extends Component {
    renderHeader() {
        const component = (
            <div
                className="header">
                <span>{headerPrefixByVisibilityFilter[this.props.visibilityFilter]} Todos </span>
                <button
                    onClick={getContextItem('addTodo')}>
                    Add Todo
                </button>
            </div>
        );

        return component;
    }

    renderFooter() {
        const setVisibilityFilter = getContextItem('setVisibilityFilter');

        const component = (
            <div
                className="footer">
                <span>Show todos: </span>
                <button
                    onClick={setVisibilityFilter.bind(null, 'all')} >
                    All
                </button>
                <button
                    onClick={setVisibilityFilter.bind(null, 'none')} >
                    Not Started
                </button>
                <button
                    onClick={setVisibilityFilter.bind(null, 'partial')} >
                    Partly Done
                </button>
                <button
                    onClick={setVisibilityFilter.bind(null, 'done')} >
                    Completed
                </button>
            </div>
        );

        return component;
    }

    renderTodoList() {
        let todoListItems;
        const visibilityFilter = getContextItem('visibilityFilter');

        if (visibilityFilter === 'all')
            todoListItems = this.props.todoList;
        else if (visibilityFilter === 'none')
            todoListItems = this.props.notStartedTodoList;
        else if (visibilityFilter === 'partial')
            todoListItems = this.props.partlyCompletedTodoList;
        else if (visibilityFilter === 'done')
            todoListItems = this.props.completedTodoList;

        const component = (
            <TodoList
                todoList={todoListItems} />
        );

        return component;
    }

    render() {
        const header = this.renderHeader();
        const footer = this.renderFooter();
        const todoList = this.renderTodoList();

        const component = (
            <div
                className="sidebar">
                {header}
                {todoList}
                {footer}
            </div>
        );

        return component;
    }
};

export default Sidebar;
