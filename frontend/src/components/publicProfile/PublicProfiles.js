import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPublicProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class PublicProfiles extends Component {

    componentDidMount() {
        this.props.getPublicProfiles();
    }

    render() {
        const { publicProfiles, loading } = this.props.profiles;
        let profileItems;

        if (publicProfiles === null || loading) {
            profileItems = <Spinner />;
        } else {
            if (publicProfiles.length > 0) {
                profileItems = publicProfiles.map(publicProfiles => (
                    <ProfileItem key={publicProfiles._id} publicProfiles={publicProfiles} />
                ));
            } else {
                profileItems = <h4>No Profile Found...</h4>;
            }
        }

        return (
            <div className="public-profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Public Profiles</h1>
                            <p className="lead text-center">Browse, connect and Do-Things with other peoples</p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PublicProfiles.propTypes = {
    getPublicProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profiles: state.profiles
});

export default connect(mapStateToProps, { getPublicProfiles })(PublicProfiles);