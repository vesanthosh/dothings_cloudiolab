import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { getPublicProfileByHandle } from '../../actions/profileActions';

class ProfileDisplay extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getPublicProfileByHandle(this.props.match.params.handle); // TODO: Need to focus on this as this is confusing.
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profiles.publicUserProfile === null && this.props.profiles.loading) {
            this.props.history.push("/not-found");
        }
    }

    render() {
        const { publicUserProfile, loading } = this.props.profiles;
        let profileContent;

        if (publicUserProfile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/public-profiles" className="btn btn-light mb-3 float-left">Back to Profiles</Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader publicUserProfile={publicUserProfile} />
                    <ProfileCreds />
                </div>
            );
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileDisplay.propTypes = {
    getPublicProfileByHandle: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profiles: state.profiles
});

export default connect(mapStateToProps, { getPublicProfileByHandle })(ProfileDisplay);