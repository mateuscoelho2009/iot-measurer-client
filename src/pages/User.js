import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import UserMeasurements from '../components/UserMeasurements';

function User({ history, username }) {
    if (!username) {
        history.push('/');
    }

    return (
        <UserMeasurements />
    )
}

const mapStateToProps = store => ({
    username: store.userState.username,
});

export default connect(mapStateToProps) (withRouter(User));