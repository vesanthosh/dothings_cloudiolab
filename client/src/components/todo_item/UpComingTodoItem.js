import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; // used to format the date from mongodb
import { deleteUpcomingTodoItem, setTodoItemAsCompleted } from '../../actions/itemActions';
import EditTodoItem from './EditTodoItem';

class UpComingTodoItem extends Component {

    onDeleteClick(id) {
        this.props.deleteUpcomingTodoItem(id);
    }

    onChange(id, nameValue, descriptionValue, isCompletedValue) {
        const newItemData = {
            name: nameValue,
            description: descriptionValue,
            isCompleted: !isCompletedValue
        };
        this.props.setTodoItemAsCompleted(id, newItemData);
    }

    render() {
        var upcomingTodos;
        if (this.props.upcomingTodos.length > 0) {
            upcomingTodos = this.props.upcomingTodos.map(upcomingTodos => ( // TODO: Found profile problems and need to resolve this. till so far not problem
                <div key={upcomingTodos._id} className="list-group">
                    <a href="#/" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id={upcomingTodos._id} checked={upcomingTodos.isCompleted} onChange={this.onChange.bind(this, upcomingTodos._id, upcomingTodos.name, upcomingTodos.description, upcomingTodos.isCompleted)} />
                                    <label className="custom-control-label" htmlFor={upcomingTodos._id}>{upcomingTodos.name}</label>
                                </div>
                            </h5>
                            <small>
                                <div className="row">
                                    <EditTodoItem _id={upcomingTodos._id} name={upcomingTodos.name} description={upcomingTodos.description} isCompleted={upcomingTodos.isCompleted} />{' '}
                                    <div className="col-md-6">
                                        <button className="btn btn-danger btn-sm custom-button-width" onClick={this.onDeleteClick.bind(this, upcomingTodos._id)}>
                                            <i className="fa fa-trash" />
                                        </button>
                                    </div>
                                </div>
                            </small>
                        </div>
                        <p className="mb-1">{upcomingTodos.description}</p>
                        <small>
                            <Moment fromNow>{upcomingTodos.date}</Moment>
                        </small>
                    </a>
                </div >
            ));
        } else {
            upcomingTodos = (
                <p className="mb-1">You have no upcoming tasks to do. Please create one.</p>
            );
        }

        return (
            <div className="mb-4">
                <h4>Upcoming Tasks</h4>
                {upcomingTodos}
            </div>
        );
    }
}

UpComingTodoItem.propTypes = {
    deleteUpcomingTodoItem: PropTypes.func.isRequired,
    setTodoItemAsCompleted: PropTypes.func.isRequired
};

export default connect(null, { deleteUpcomingTodoItem, setTodoItemAsCompleted })(UpComingTodoItem);