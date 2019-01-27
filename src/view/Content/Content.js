/**
 * Content Component
 */

import React, { Component } from 'react';

import TodoItem from '../_shared/TodoItem';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: this.props.todo
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ todo: nextProps.todo });
    }

    saveTodo = (todo) => {
        this.props.saveTodo(todo);
    }

    onTodoChange(fieldName) {
        return (ev) => {
            const { value } = ev.currentTarget;

            const todo = Object.assign({}, this.state.todo, {
                [fieldName]: value
            });

            this.setState({ todo });
        };
    }

    render() {
        const component = (
            <div
                className="content-container">
                <TodoItem
                    onSave={this.saveTodo}
                    {...this.state.todo}
                    showTasks={true}
                    editable={this.props.editable} />
            </div>
        );

        return component;
    }
};

export default Content;
