import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getTodoItems } from '../../actions/itemActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import TodoItem from './TodoItem';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getTodoItems();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile; // loading is to give spinner to the user that something is loading
        const { item } = this.props.item; // here also we have loading state but we get duplicate state error

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <div className="btn-group mb-4" role="group">
                            <Link to="/add-todo-item" className="btn btn-primary btn-success">
                                <i className="fas fa-plus" />{' '}Add Item
                            </Link>
                        </div>
                        {/* passing item.todoItems array as a parameter/property */}
                        <TodoItem todoItem={item.todoItems} />
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
    getTodoItems: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    item: state.item
});

export default connect(mapStateToProps, { getCurrentProfile, getTodoItems })(Dashboard);