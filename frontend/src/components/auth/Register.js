import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this); // If you get error about this.setState can not find. You should add this or add seperately.
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) { // check if the errors is included in the response we will store this to the state. so that we don't have to change anything down there.
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history); // to redirect from this component
    }

    render() {
        const { errors } = this.state; // just a shortcut to get only errors from our state.
        return (
            <section className="container">
                <h1 className="x-large text-primary text-center">
                    Register Account
                </h1>
                <div className="register">
                    <div className="register-info">
                        <p className="lead">
                            <i className="fas fa-user"></i>{' '}
                            Create an account
                        </p>
                        <p>Get started with your free account</p>
                        <p className="my-1">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                    <form className="form" noValidate onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="Name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        />
                        <TextFieldGroup
                            placeholder="E-mail"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email."
                        />
                        <TextFieldGroup
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                        <TextFieldGroup
                            placeholder="Confirm Password"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                        />
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </section>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register)); // to redirect from this component to login page