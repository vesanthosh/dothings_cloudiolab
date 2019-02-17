import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; // it is used to format the date from mongodb
import { deleteTodoItem } from '../../actions/itemActions';
import EditTodoItem from '../todo_item/EditTodoItem';

class TodoItem extends Component {

    onDeleteClick(id) {
        this.props.deleteTodoItem(id);
    }

    render() {
        const todoItem = this.props.item.todoItems.map(item => (
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.name}</h5>
                        <small>
                            <div className="row">
                                <EditTodoItem _id={item._id} name={item.name} description={item.description} />{' '}
                                <div class="col-md-6">
                                    <button className="btn btn-danger btn-sm custom-button-width" onClick={this.onDeleteClick.bind(this, item._id)}>
                                        <i className="fa fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </small>
                    </div>
                    <p className="mb-1">{item.description}</p>
                    <small>
                        <Moment fromNow>{item.date}</Moment>
                    </small>
                </a>
            </div >
        ));

        return (
            < div >
                <div className="mb-4">
                    <h4 className="mb-3">Upcoming Tasks</h4>
                    {todoItem}
                </div>
                <div className="mb-4">
                    <h4 className="mb-3">Tasks Completed</h4>
                {todoItem}
                </div>
            </div >
        );
    }
}

TodoItem.propTypes = {
    deleteTodoItem: PropTypes.func.isRequired
};

export default connect(null, { deleteTodoItem })(TodoItem);