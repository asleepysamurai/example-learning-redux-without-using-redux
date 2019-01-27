/**
 * Content Component
 */

import React, { Component } from 'react';

import TodoItem from '../_shared/TodoItem';

class Content extends Component {
    render() {
        const component = (
            <div
                className="content-container">
                <TodoItem
                    onSave={this.props.saveTodo}
                    {...this.props.todo}
                    showTasks={true}
                    editable={this.props.editable}
                    toggleEditable={this.props.toggleEditable} />
            </div>
        );

        return component;
    }
};

export default Content;
