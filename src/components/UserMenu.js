import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../actions';

function UserMenu(props) {
    const {
        logOut,
        username,
    } = props;

    return (
        <>
            <Button onClick={logOut}>
                Log out
            </Button>
            
            <Link to="/user">
                Go back to user {username} dashboard
            </Link>
        </>
    )
}

const mapStateToProps = store => ({
    username: store.userState.username
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logOut }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (UserMenu);