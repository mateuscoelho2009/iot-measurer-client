import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { UserConsumer } from '../contexts/UserContext';

function UserMenu() {
    return (
        <UserConsumer>
            {({ username, updateUser }) => (
                <>
                    <Button onClick={event => {
                        updateUser('');
                    }}>
                        Log out
                    </Button>
                    
                    <Link to="/user">
                        Go back to user {username} dashboard
                    </Link>
                </>
            )}
        </UserConsumer>
    )
}

export default UserMenu;