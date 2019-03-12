import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUpcomingTodoItems, getCompletedTodoItems } from '../../actions/itemActions';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import TodoItem from '../todo_item/TodoItem';
import AddToDoItem from '../todo_item/AddToDoItem';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getUpcomingTodoItems();
        this.props.getCompletedTodoItems();
        this.props.getCurrentProfile();
    }

    render() {
        const { user } = this.props.auth;
        const { currentUserProfile, loading } = this.props.profiles; // loading is to give spinner to the user that something is loading
        const { upcomingTodos } = this.props.todoItems; // here also we have loading state but we get duplicate state error
        const { completedTodos } = this.props.todoItems;

        let dashboardContent;

        if (currentUserProfile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // Check if logged in user has profile data
            if (Object.keys(currentUserProfile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${currentUserProfile.handle}`}>{user.name}</Link></p>
                        <div className="btn-group mb-4" role="group">
                            <AddToDoItem />
                        </div>
                        {/* passing item.todoItems array as a parameter/property */}
                        <TodoItem upcomingTodos={upcomingTodos} completedTodos={completedTodos} />
                    </div>
                );
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet created a profile, please add some info.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                );
            }
        }

        return (
            <div className='dashboard'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h1 className='display-4'>Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getUpcomingTodoItems: PropTypes.func.isRequired,
    getCompletedTodoItems: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    todoItems: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profiles: state.profiles,
    auth: state.auth,
    todoItems: state.todoItems
});

export default connect(mapStateToProps, { getCurrentProfile, getUpcomingTodoItems, getCompletedTodoItems })(Dashboard);