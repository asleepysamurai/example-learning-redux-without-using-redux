/**
 * App Root Container Component
 */

import React, { Component } from 'react';

import './AppContainer.scss';

import Sidebar from '../Sidebar';
import Content from '../Content';
import { generateID } from '../../utils';
import { transitionState, getState, onStateTransition, setContextItem } from '../../state/store';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = getState();

        onStateTransition((newState) => {
            this.updateStateContextItems(newState);
            this.setState(newState);
        });

        setContextItem('addTodo', this.addTodo);
        setContextItem('saveTodo', this.saveTodo);
        setContextItem('toggleEditable', this.toggleEditable);
        setContextItem('setVisibilityFilter', this.setVisibilityFilter);
        this.updateStateContextItems();
    }

    updateStateContextItems(state = this.state) {
        setContextItem('visibilityFilter', state.visibilityFilter);
        setContextItem('expandedTodoEditable', state.expandedTodoEditable);
    }

    addTodo = () => {
        transitionState('addTodo', { id: generateID() });
    }

    saveTodo = () => {
        transitionState('saveExpandedTodo');
    }

    setVisibilityFilter = (visibilityFilter) => {
        transitionState('setVisibilityFilter', { visibilityFilter });
    }

    toggleEditable = () => {
        transitionState('toggleEditable');
    }

    renderExpandedTodo() {
        if (!this.state.expandedTodo)
            return null;

        return (
            <Content
                todo={this.state.expandedTodo} />
        );
    }

    render() {
        const expandedTodo = this.renderExpandedTodo();

        const component = (
            <div
                className="app-container">
                <Sidebar
                    todoList={this.state.todoList} />
                {expandedTodo}
            </div>
        );

        return component;
    }
};

export default App;
