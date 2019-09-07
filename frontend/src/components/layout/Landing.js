import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Welcome to Dothings</h1>
                        <p className="lead"> Create a Dothings profile/portfolio, share your tasks and goals and let others knows your social activities. Get help or help others through social task sharing platform.</p>
                        <div className="buttons">
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);