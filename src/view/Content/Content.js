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
                    {...this.props.todo}
                    showTasks={true} />
            </div>
        );

        return component;
    }
};

export default Content;
