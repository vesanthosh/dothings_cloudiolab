import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { clearCurrentTodoItem } from '../../actions/itemActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile(); // It should be called before logout to clear current profile state
        this.props.clearCurrentTodoItem(); // to clear current todo items
        this.props.logoutUser(this.props.history);
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link> </li>
                <li className="nav-item dropdown">
                    <a href="\" className="nav-link dropdown-toggle" data-toggle="dropdown">{user.name}{' '}
                        <img className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />
                    </a>
                    <div className="dropdown-menu">
                        <Link to="/edit-profile" className="dropdown-item">Profile Settings</Link>
                        <Link to="\" className="dropdown-item" onClick={this.onDeleteClick.bind(this)}>Delete Account</Link>
                        <Link to="\" className="dropdown-item" onClick={this.onLogoutClick.bind(this)}>Logout</Link>
                    </div>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">Do-Things</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/public-profiles">{' '}People</Link> {/*{' '} - this is for space */}
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser,clearCurrentProfile, clearCurrentTodoItem, deleteAccount })(withRouter(Navbar)); // redirects to login page