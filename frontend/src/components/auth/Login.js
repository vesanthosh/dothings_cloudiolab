import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        // If you get error about this.setState can not find. You should add this or add seperately. If don't need this then use arrow function for onChange and submit.
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user);
    }

    render() {
        const { errors } = this.state;
        return (
            <section className="container">
                <h1 className="x-large text-primary text-center">
                    Member Login
                </h1>
                <div className="login-info">
                    <p className="lead">Nice to see you're back.</p>
                    <p>Share your tasks and goals and let others knows your social activities.</p>
                </div>
                <div className="login-form">
                    <form className="form" onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="E-mail Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                        />
                        <TextFieldGroup
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                        <div className="form-group">
                            <input type="checkbox" id="remember"></input>
                            <label for="remember">Keep me logged in</label>
                        </div>
                        <div className="form-submit-area">
                            <input type="submit" value="Let's go" className="btn btn-primary" />
                            <p>
                                Forgot
                                <Link to="/forgot"> Password?</Link>
                            </p>
                        </div>
                    </form>
                    <p className="my-1">
                        New to Dothings?
                        <Link to="/register"> become a member</Link>
                    </p>
                </div>
            </section>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);