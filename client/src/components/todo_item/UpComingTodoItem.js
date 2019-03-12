import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; // used to format the date from mongodb
import { deleteTodoItem } from '../../actions/itemActions';
import EditTodoItem from './EditTodoItem';

class UpComingTodoItem extends Component {

    onDeleteClick(id) {
        this.props.deleteTodoItem(id);
    }

    render() {
        const upcomingTodos = this.props.upcomingTodos.map(upcomingTodos => ( // TODO: Found profile problems and need to resolve this. till so far not problem
            <div key={upcomingTodos._id} className="list-group">
                <a href="#/" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
                                <label className="custom-control-label" htmlFor="defaultUnchecked">{upcomingTodos.name}</label>
                            </div>
                        </h5>
                        <small>
                            <div className="row">
                                <EditTodoItem _id={upcomingTodos._id} name={upcomingTodos.name} description={upcomingTodos.description} />{' '}
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

        return (
            <div className="mb-4">
                <h4>Upcoming Tasks</h4>
                <p className="mb-1">You have no upcoming tasks to do.</p>
                {upcomingTodos}
            </div>
        );
    }
}

UpComingTodoItem.propTypes = {
    deleteTodoItem: PropTypes.func.isRequired
};

export default connect(null, { deleteTodoItem })(UpComingTodoItem);