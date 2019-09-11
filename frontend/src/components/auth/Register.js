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
            firstname: '',
            lastname: '',
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
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
                    Create a new account
                </h1>
                <div className="register-info">
                    <p className="lead">
                        Get started with your free account and only takes a few seconds.
                    </p>
                    <p>
                        Let's do some things...!
                    </p>
                </div>

                <div className="register-form">
                    <form className="form" noValidate onSubmit={this.onSubmit}>
                        <div className="form-name-area">
                            <TextFieldGroup
                                placeholder="First Name"
                                name="firstname"
                                type="text"
                                value={this.state.firstname}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                            <TextFieldGroup
                                placeholder="Last Name"
                                name="lastname"
                                type="text"
                                value={this.state.lastname}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                        </div>
                        <TextFieldGroup
                            className="form-group"
                            placeholder="E-mail Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email."
                        />
                        <TextFieldGroup
                            className="form-group"
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            info="
                            Use 8 or more characters with a mix of letters, numbers & symbols"
                        />
                        <TextFieldGroup
                            className="form-group"
                            placeholder="Confirm Password"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                        />
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </form>
                    <p className="my-1">
                        Already have an account?
                        <Link to="/login"> Sign In</Link>
                    </p>
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