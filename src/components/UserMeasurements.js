import React from 'react';
import { connect } from 'react-redux';

const UserMeasurements = ({ userId }) => (<h1>Welcome {userId}!</h1>);

const mapStateToProps = store => ({
    userId: store.userState.userId,
});

export default connect(mapStateToProps) (UserMeasurements);